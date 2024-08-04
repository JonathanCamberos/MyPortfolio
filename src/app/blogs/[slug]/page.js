import Image from "next/image"
import { allBlogs } from "../../../../.contentlayer/generated"
import Tag from "../../../components/Elements/Tag"
import BlogDetails from "../../../components/Blog/BlogDetails"
import RenderMdx from "../../../components/Blog/RenderMdx"
import BlogToc from "../../../components/Blog/BlogToc"
import { slug } from "github-slugger"
import siteMetadata, { description } from "../../../utils/siteMetaDataFile"

export async function generateStaticParams(){
    return allBlogs.map((blog) => ({slug: blog._raw.flattenedPath}));
}

export async function generateMetadata({ params }) {
    
    /* Grabs and renders a blog post */
    const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug)
    if(!blog){
        return;
    }
 
    const publishedAt = new Date(blog.publishedAt).toISOString();
    const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();

    let imageList = [siteMetadata.socialBanner]
    if(blog.image){
        imageList = typeof blog.image.filePath === "string" ?
        [siteMetadata.siteUrl + blog.image.filePath.replace("../public","")] : blog.image
    }

    /* second condition almost never gets used */
    const ogImages = imageList.map(img => {
        return {url: img.includes("http") ? img : siteMetadata.siteUrl + img}
    })

    /* if blog has author, then reutrn author, else just used metadata */
    const authors = blog?.author? [blog.author] : siteMetadata.author
 
    return {
      title: blog.title,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        /* url: siteMetadata + "/blogs" + params.slug,  slug here is the created slug for the blog*/
        url: siteMetadata.siteUrl + blog.url,
        siteName: siteMetadata.title,
        locale: 'en_US',
        type: 'article',
        publishedTime: publishedAt,
        modifiedTime: modifiedAt,
        images: ogImages,
        authors: authors.length > 0 ? authors : [siteMetadata.author]
      },
    }
  }

export default function BlogPage({ params }){

    /* Grabs and renders a blog post */
    const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug)
    
    return <article>

        {/* ##### Picutre + Title + Tag ##### */}
        <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
            
            {/* ##### Overlay Div #####  */}
            <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60"/>
            
            {/*  ##### Image Div #####*/}
            <Image src={blog.image.filePath.replace("../public", "")}
            placeholder='blur'
            blurDataURL={blog.image.blurhashDataUrl}
            alt={blog.title}
            width={blog.image.width}
            height={blog.image.height}
            className='aspect-square w-full h-full object-cover object-center group-hover:scale-105 
            transition-all ease duration-300'
            />
            
            {/* ##### Tag and Title Div #####  */}
            <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Tag 
                    name={blog.tags[0]} 
                    link={`/categories/${slug(blog.tags[0])}`}
                    className="px-6 text-sm py-2" 
            />
                <h1 className="inline-block mt-6 font-semibold capitalize text-light text-5xl leading-normal
                                relative w-5/6">
                    {blog.title}
                </h1>
            </div>      
        </div>

        {/* ##### Span Date, Views, Time, and Tag ##### */}
        <BlogDetails blog={blog} slug={params.slug}/>

        <div className="grid grid-cols-12 gap-16 mt-8 px-10">
            
            {/* ##### Table of Contents ##### */}
            <BlogToc blog={blog}/>
            
            {/* ##### Blog MarkDown ##### */}
            <RenderMdx blog={blog}/>
        </div>


    </article>
}
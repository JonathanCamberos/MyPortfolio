import { allBlogs } from "../../../../.contentlayer/generated";
import Categories from "../../../components/Blog/Categories";
import BlogLayoutThree from "../../../components/Blog/BlogLayoutThree";
import GithubSlugger, { slug } from "github-slugger"
import QuestionSection from "../../../components/Blog/QuestionSection";


const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories = [];
  const paths = [{ slug: "all" }];

  allBlogs.map((blog) => {
    if (blog.isPublished) {
      blog.tags.map((tag) => {
        let slugified = slugger.slug(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

export async function generateMetadata({ params }) {
    return {
      title: `${params.slug.replaceAll("-"," ")} Blogs`,
      /* Slug is the category name */
      description: `Learn more about ${params.slug === "all" ? "web development" : params.slug} through out collection of blogs :)` 
    }
  }

const CategoryPage = ({params}) => {

    /* We want to filter all the tags as per params.slug */
    const allCategories = ["all"];

    /* for each tag, sluggify the tag 
       if category is not in allCategories -> add it
       if params.slug === all, then return true for all tags
    */
    const blogs = allBlogs.filter((blog) => {
        return blog.tags.some(tag => {
            const slugifiedTag = slug(tag);
            if(!allCategories.includes(slugifiedTag)){
                allCategories.push(slugifiedTag)
            }
            if(params.slug === "all"){
                return true
            }
            return slugifiedTag === params.slug
        })
    })

  return (
    <article className="mt-20 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          Search Categories
        </h1>
        <span className="mt-2 inline-block">
          Different DSA topics and areas of study
        </span>
      </div>

      <Categories categories={allCategories} currentSlug={params.slug} /> 

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-16 mt-8 sm:mt-12 md:mt-28 sxl:mt-36 px-5 sm:px-10 md:px-24 sxl:px-32">
          {blogs.map((blog, index) => (
            <article key={index} className="col-span-1 row-span-1 relative">
              <BlogLayoutThree blog={blog} />
            </article>
          ))}
        </div>
      ) : (
        // Spacer div only when no blogs to add separation
        <div className="my-5" />
      )}

      <QuestionSection />
    </article>
  );
};

export default CategoryPage
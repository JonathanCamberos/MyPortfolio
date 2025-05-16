import React from 'react'
import Image from 'next/image'
import { sortBlogs } from '../../utils'
import Link from 'next/link';
import Tag from '../Elements/Tag';
import { slug } from 'github-slugger';
import { format } from 'date-fns';

// passing blog objects from page.js (which imports from content folder)
const HomeCoverSection = ( {blogs} ) => {
  
    //sorting to find newest blog       
    const sortedBlogs = sortBlogs(blogs)
    const blog = sortedBlogs[0]

    
  return (

    /*  ##### HomeCoverSection Div ##### */
    <div className='md:w-11/12 w-full inline-block'>
        
        {/* ##### Article Div #####
                      
        */}
        <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
            
            {/* Overlay for image */}
            <div className='absolute top-0 left-0 bottom-0 right-0 h-full
            bg-gradient-to-b from-transparent to-dark/30 rounded-3xl z-10
            ' />
            
            {/*  ##### Image ##### */}
            <Image src={blog.image.filePath.replace("../public", "")}
              placeholder='blur'
              blurDataURL={blog.image.blurhashDataUrl}
              alt={blog.title}
              fill
              className='w-full h-full object-center object-cover rounded-3xl z-0'
              sizes='100vw'
              priority
            />

            {/* ##### Tag and Description Div #####  */}
            <div className='w-full lg:w-3/4 p-6 sm:p-8 md:p-12  lg:p-16 flex flex-col items-start justify-center z-0 text-light'>
                
                {/*  ##### Tag w/ Link ##### */}
                <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} />
                

                {/* #####  Link ##### */}
                <Link href={blog.url} className='mt-6'>


                  {/* ##### h1 styling ##### */}
                  <h1 className='font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl'>
                      
                      {/*  #### Span Hover over Blog Title ##### */}
                      <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                                     dark:to-accentDark/50 bg-[length:0px_6px]
                                       hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                {blog.title}
                </span>
                  </h1>
                </Link>

                {/*  ##### P tag over description ##### */}
                <p className='hidden  sm:inline-block mt-4 md:text-lg lg:text-xl font-in'>
                  {blog.description}
                </p>
                <span className="inline-block w-full capitalize text-light/60 dark:text-light font-semibold  text-xs sm:text-base">
                  {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
                </span>
            </div>
        </article>
    </div>
  )
}

export default HomeCoverSection
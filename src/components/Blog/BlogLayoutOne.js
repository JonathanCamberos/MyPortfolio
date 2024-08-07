import React from 'react'
import Image from 'next/image'
import Tag from '../Elements/Tag';
import Link from 'next/link';
import { slug } from 'github-slugger';
import { format } from 'date-fns';

const BlogLayoutOne = ({blog}) => {
  return (
    <div className="group inline-block overflow-hidden rounded-xl">
            {/* ##### Overlay Div for Image ##### */}
            <div
              className="absolute top-0 left-0 bottom-0 right-0 h-full
              bg-gradient-to-b from-transparent from-0% to-dark/40 rounded-xl z-10
            "/>
            
        {/*  ##### Image #####  */}
        <Image src={blog.image.filePath.replace("../public", "")}
          placeholder='blur'
          blurDataURL={blog.image.blurhashDataUrl}
          alt={blog.title}
          width={blog.image.width}
          height={blog.image.height}
          className='w-full h-full object-center object-cover rounded-xl group-hover:scale-105 
          transition-all ease duration-300'
          sizes='(max-width: 1180px) 100vw, 50vw'
        />

        {/* ##### Tag and Description Div #####  */}
        <div className="w-full absolute bottom-0 p-4 xs:p-6 sm:p-10 z-20">
          
            {/*  ##### Tag w/ Link ##### */}
            <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} 
              className="px-6 text-xs  sm:text-sm py-1 sm:py-2 !border "
            />
            

            {/* #####  Link ##### */}
            <Link href={blog.url} className='mt-6'>


              {/* ##### h1 styling ##### */}
              <h2 className="font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-light mt-2 sm:mt-4">
                  
                  {/*  #### Span Hover over Blog Title ##### */}
                  <span
                    className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50
                      group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 "
                  >
                    {blog.title}
                  </span>
              </h2>
              <span className="inline-block w-full capitalize text-light/50 dark:text-light font-semibold  text-xs sm:text-base">
                {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
              </span>
            </Link>
        </div>
    </div>
  )
}

export default BlogLayoutOne
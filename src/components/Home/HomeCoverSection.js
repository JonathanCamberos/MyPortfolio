import React from 'react'
import Image from 'next/image'
import { sortBlogs } from '../../utils'
import Link from 'next/link';
import Tag from '../Elements/Tag';
import { slug } from 'github-slugger';
import { format } from 'date-fns';
import LeetCodeStats from "./../../components/Home/LeetCodeStats"; 
import GitHubCommits from "./GitHubCommitsGrid"; 

// passing blog objects from page.js (which imports from content folder)
const HomeCoverSection = ( {blogs} ) => {
  
    //sorting to find newest blog       
    const sortedBlogs = sortBlogs(blogs)
    const blog = sortedBlogs[0]

    
    return (
      <div>
       {/* <div className="md:w-11/12 w-full inline-block"> */}

      

        {/* Stats Section (50:50 Split) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 items-center min-h-[60vh]">
  <div className="flex flex-col items-center text-center p-6 sm:p-10">
    <h2 className="text-2xl font-bold dark:text-light">
      Hola!
    </h2>
    <p className="text-lg dark:text-light leading-relaxed max-w-3xl">
      Soy Jonathan Camberos, a passionate software engineer with a love
      for building. I created this portfolio to organize notes regarding
      leetcode and projects.
    </p>
  </div>

  <div className="flex justify-center items-center">
    <div className="w-full max-w-sm">
      <LeetCodeStats />
    </div>
  </div>
</div>


        {/* <article className="group relative flex flex-col items-start justify-end mx-5 sm:mx-10 h-[60vh] sm:h-[85vh] rounded-3xl overflow-hidden"> */}
          
          {/* Shadow Overlay 
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 z-10 rounded-3xl"></div>
          */}
          
          {/* Blog Image */}
          {/* <Image
            src={blog.image.filePath.replace("../public", "")}
            placeholder="blur"
            blurDataURL={blog.image.blurhashDataUrl}
            alt={blog.title}
            fill
            className="object-cover object-center rounded-3xl transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="100vw"
            priority
          /> */}
  
          {/* Blog Details */}
          {/* <div className="absolute bottom-0 left-0 w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 text-light z-20">
            <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} />
            <Link href={blog.url} className="mt-6">
              <h1 className="font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl text-shadow-outline">
                <span className="bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                  {blog.title}
                </span>
              </h1>
            </Link>
            <p className="hidden sm:inline-block mt-4 md:text-lg lg:text-xl font-in">
              {blog.description}
            </p>
            <span className="inline-block w-full capitalize text-light/60 dark:text-light font-semibold text-xs sm:text-base">
              {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
            </span>
          </div> */}
        {/* </article> */}
      </div>
    )
}

export default HomeCoverSection
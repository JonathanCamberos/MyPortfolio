import React from 'react'
import { sortBlogs } from '../../utils';
import Link from 'next/link';
import BlogLayoutThree from '../Blog/BlogLayoutThree';


const RecentPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);

  return (
    /* ##### RecentPosts Section #####
       w-full: | Sizing : Width | -> [width: 100%]
       mt-32:  | Spacing : Margin | -> [margin-top: 8rem] margin is the space around an elements borders
       px-32:  | Spacing : Padding | -> [padding-left: 8rem] padding space between an elements borders and its content

       flex:   | Layout : Display | -> create a block level container
       flex-col:       | Flex-box & Grid : Flex Direction | -> position items vertically ordered top to bottom
       items-center:   | Flex-box & Grid : Align Items | -> align items along center of the cross axis, center of top to bottom
       justify-center: | Flex-box & Grid : Justify Content | -> align items along center of the main axis, center of left to right
    */
    <section className="w-full mt-32 px-32 flex flex-col items-center justify-center">

        {/* ##### RecentPosts & View all Div #####
            flex:            | Layout : Display | -> create a block level container
            w-full:          | Sizing : Width | -> [width: 100%]
            justify-between: | Flexbox & Grid : Justify Content | -> [justify-content: space-between] justify items along the main axis (left to right) 
                                                                such that there is an equal amount of space between each item
        */}
        <div className="flex w-full justify-between">

            {/* ##### Header ##### 
                inline-block:
            */}
            <h2 className="inline-block font-bold capitalize text-4xl">
                RecentPosts
            </h2>

            {/* ##### ViewAll #### 
                inline-block:
            */}
            <Link href="categories/all" className="inline-block font-medium text-accent underline underline-offset-2 text-lg">
                view all
            </Link>
        </div>
        
        {/* ##### Posts Grid ##### 
            grid:
            grid-cols-3:
            gap-16:
            mt-16:
        */}
        <div className="grid grid-cols-3 gap-16 mt-16">

            {/* ##### Generating 6 Articles via map function #####

            */}
            {sortedBlogs.slice(4, 10).map((blog, index) => {
            return (
                <article key={index} className="col-span-1 row-span-1 relative">
                <BlogLayoutThree blog={blog} />
                </article>
            );
            })}
        </div>
    </section>
  )
}

export default RecentPosts
import React from 'react'
import { sortBlogs } from '../../utils';
import BlogLayoutOne from '../Blog/BlogLayoutOne';
import BlogLayoutTwo from '../Blog/BlogLayoutTwo';


const FeaturedPosts = ({ blogs }) => {
  const sortedBlogs = sortBlogs(blogs);

  return (
  
  /* ##### FeaturedPosts Section #####
        w-full: | Sizing : Width | -> [width: 100%] 
        mt-32:  | Spacing : Margin | -> [margin-top: 8rem] margin is space around elements border
        px-32:  | Spacing : Padding | -> [padding-left: 8rem, padding-right:8rem] padding is space between elements border and elements content

        flex:   | Layout : Display | -> create a block level container
        flex-col:       | Flexbox & Grid : Flex Direction | -> position items vertically ordered top to bottom
        items-center:   | Flexbox & Grid : Align Items | -> align items along center of cross axis, center of top to bottom
        justify-center: | Flexbox & Grid : Justify Content | -> align items along center of main axis, center of left to right
    */
    <section className="w-full mt-16 sm:mt-24  md:mt-32 px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
        
        {/* ##### h2 #####
            w-full: | Sizing : Width | -> [width: 100%]
            
            inline-block: | Layout : Display | -> [display: inline-block] wrap the element to prevent the text inside from extendin beyond its parent

            font-bold, capitalize, text-4xl: styling
        */}
        <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">Featured Posts</h2>

        {/* ##### 'Grid' Div #####
            grid:        | Layout : Display | -> [display: grid] utility to create a grid container
            grid-cols-2: | Flexbox & Grid : Grid Template Columns | -> create grids with n equally sized columns
            grid-rows-2: | Flexbox & Grid : Grid Template Rows | -> create grids with n equally sized rows
            gap-6:       | Flexbox & Grid : Gap | -> change the gap between both rows and columns in grid and flexbox layouts
                                                     note***: gap-x and gap-y can change them independently
            
            mt-16:       | Spacing : Margin | -> change margin, space outside of element
        */}
        <div className="grid grid-cols-2 grid-rows-2 gap-6  mt-10 sm:mt-16">
        
            {/* ##### BlogLayoutOne - col 1 / row 2 #####
                col-span-1: | Flexbox & Grid : Grid Column Start/End | -> col-span-* to make element span n columns
                row-span-2: | Flexbox & Grid : Grid Row Start/End | -> row-span-* to make element span n rows
            */}
            <article className=" col-span-1  sxl:col-span-1 row-span-2 relative">
                <BlogLayoutOne blog={sortedBlogs[1]} />
            </article>

             {/* ##### BlogLayoutTwo - col 1 / row 1 ##### 
                col-span-1: | Flexbox & Grid : Grid Column Start/End | -> col-span-* to make element span n columns
                row-span-1: | Flexbox & Grid : Grid Row Start/End | -> row-span-* to make element span n rows
            */}
            <article className=" col-span-2 sm:col-span-1 row-span-1 relative">
                        <BlogLayoutTwo blog={sortedBlogs[2]} />

            </article>

            {/* ##### BlogLayoutTwo - col 1 / row 1 ##### 
                col-span-1: | Flexbox & Grid : Grid Column Start/End | -> col-span-* to make element span n columns
                row-span-1: | Flexbox & Grid : Grid Row Start/End | -> row-span-* to make element span n rows
            */}
            <article className="col-span-2 sm:col-span-1 row-span-1 relative">
                        <BlogLayoutTwo blog={sortedBlogs[3]} />

            </article>
        </div>
    </section>
  )
}

export default FeaturedPosts
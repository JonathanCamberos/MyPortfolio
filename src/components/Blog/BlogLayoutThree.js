import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { format } from 'date-fns'

const BlogLayoutThree = ({blog}) => {
  return (
    <div className="group flex flex-col items-center text-dark">
        <Link href={blog.url} className="h-full rounded-xl overflow-hidden">
            
            {/*  ##### Image #####
            
            */}
            <Image src={blog.image.filePath.replace("../public", "")}
              placeholder='blur'
              blurDataURL={blog.image.blurhashDataUrl}
              alt={blog.title}
              width={blog.image.width}
              height={blog.image.height}
              className='aspect-[4/3] w-full h-full object-cover object-center group-hover:scale-105 
              transition-all ease duration-300'
            />
        </Link>

         {/* ##### Tag and Description Div ##### 
                w-full:   | Sizing : Width |   -> [width: 100%] 
                lg:w-3/4: | Sizing : Width |   -> [width: 75%] 
                p-6:      | Spacing : Padding | -> p-* utilities to control the padding on all sides of an element
                sm:p-8:   | Spacing : Padding |
                md:p-12   | Spacing : Padding | 
                lg:p-16   | Spacing : Padding | 

                flex:     | Layout  : Display | -> create a block-level flex container
                flex-col: | Flexbox & Grid : Flex Direction | -> flex-col to position flex items vertically
                items-start:    | Flexbox & Grid : Align Items | -> items-start align items to start of container’s cross axis (top to bottom)
                justify-center: | Flexbox & Grid : Justify Content | ->  justify items along the center of the container’s main axis (left to right)

                z-0: | Layout : Z-Index | ->  control the stack order of an element.
                
                text-light:
            */}
            <div className='flex flex-col w-full mt-4'>
                
                {/*  ##### Span w/ Link ##### 
                     Links to blog categories
                */}
                <span className="uppercase text-accent font-semibold text-sm">
                  {blog.tags[0]}
                </span>
                

                {/* #####  Link #####
                    Links to blog

                    mt-6:   | Spacing : Margin | -> [margin-top: 1.5rem; 24px]
                */}
                <Link href={blog.url} className='inline-block my-1'>


                  {/* ##### h1 styling ##### 
                      font styling 
                  */}
                  <h2 className='font-semibold capitalize text-lg sm:text-md md:text-lg lg:text-lg'>
                      
                      {/*  #### Span Hover over Blog Title #####
                           
                      */}
                      <span className='bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50 
                                     dark:to-accentDark/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom 
                                       bg-no-repeat transition-[background-size] duration-500 '>
                        {blog.title}
                      </span>
                  </h2>
                </Link>
                <span className="capitalize text-dark/50 font-semibold text-base">
                    {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
                </span>
            </div>

    </div>
  )
}

export default BlogLayoutThree
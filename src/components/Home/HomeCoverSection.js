import React from 'react'
import Image from 'next/image'
import { sortBlogs } from '../../utils'
import Link from 'next/link';

// passing blog objects from page.js (which imports from content folder)
const HomeCoverSection = ( {blogs} ) => {
  
    //sorting to find newest blog       
    const sortedBlogs = sortBlogs(blogs)
    const blog = blogs[0]

  return (

    /*
      w-full:       | Sizing : Width |   -> [width: 100%] 
      inline-block: | Layout : Display | -> [display: inline-block] 
                                            using the property display 'inline-block' will wrap the element to 
                                            prevent the text inside from extending beyond its parent. 
    */
    <div className='w-full inline-block'>
        
        {/* 

        */}
        <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
            
            {/*
              absolute: | Layout : Position | -> [position: absolute] 
                                                  absolute utility to position an element outside of the normal flow 
                                                  of the document, causing neighboring elements to act as if the element doesn’t exist.
            
              top-0 left-0 bottom-0 right-0: -> top-*, right-*, bottom-*, left-*, and inset-* utilities to set the 
                                                horizontal or vertical position of a positioned element
              note! ^ is the same as "inset-0"

              h-full:  | Sizing : Height | ->  [height: 100%] h-full to set an element’s height to 100% of its parent, as long as the parent has a defined height
              
              bg-gradient-to-b: | Backgrounds : Background Image | -> [background-image: linear-gradient(to bottom, var(--tw-gradient-stops))]
                                                                      bg-gradient-* utilities in combination with the gradient color stop 
                                                                      utilities to give an element a linear gradient background.

              from-transparent: | Backgrounds : Gradient Color Stops | -> [--tw-gradient-from: transparent var(--tw-gradient-from-position);
                                                                           --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
                                                                           --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);]
                                                                 from-* utilities to set the starting color of a gradient.          
              
              from-0%: | Backgrounds : Gradient Color Stops | -> [--tw-gradient-from-position: 0%] 
                                                                from-* utilities to set the starting color of a gradient.

              to-dark/90:
              rounded-3xl: | Borders : Border Radius | -> [border-radius: 1.5rem; 24px] apply different border radius sizes to an element.
              z-0:         | Layout : Z-Index | -> [z-index: 0]

            */}
            <div className='absolute top-0 left-0 bottom-0 right-0 h-full 
                            bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0' 
            />
            
            {/*  */}
            <Image src={blog.image.filePath.replace("../public", "")}
              placeholder='blur'
              blurDataURL={blog.image.blurhashDataUrl}
              alt={blog.title}
              fill
              className='w-full h-full object-center object-cover rounded-3xl -z-10'
              sizes='100vw'
              priority
            />

            {/*  
              w-full:   | Sizing : Width |   -> [width: 100%] 
              lg:w-3/4: | Sizing : Width |   -> [width: 75%] 
              p-6:      | Spacing : Padding | -> p-* utilities to control the padding on all sides of an element
              sm:p-8:   | Spacing : Padding |
              md:p-12   | Spacing : Padding | 
              lg:p-16   | Spacing : Padding | 

              flex:      | Layout  : Display | -> create a block-level flex container
              flex-col:  | Flexbox & Grid : Flex Direction | -> flex-col to position flex items vertically

              items-start:    | Flexbox & Grid : Align Items | -> items-start align items to start of container’s cross axis (top to bottom)
              justify-center: | Flexbox & Grid : Justify Content | ->  justify items along the center of the container’s main axis (left to right)

              z-0: | Layout : Z-Index | ->  control the stack order of an element.
              
              text-light:
            */}
            <div className='w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-0 text-light'>
                {/*  */}
                {/* <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} /> */}
                
                {/*  */}
                <Link href={blog.url} className='mt-6'>
                  <h1 className='font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl'>
                      <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                      dark:to-accentDark/50 bg-[length:0px_6px]
                      hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 '>
                        {blog.title}
                      </span>
                  </h1>
                </Link>

                {/*  */}
                <p className='hidden  sm:inline-block mt-4 md:text-lg lg:text-xl font-in'>
                    {blog.description}
                </p>
            </div>
        </article>
    </div>
  )
}

export default HomeCoverSection
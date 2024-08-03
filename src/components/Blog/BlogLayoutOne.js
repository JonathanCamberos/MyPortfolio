import React from 'react'
import Image from 'next/image'
import Tag from '../Elements/Tag';
import Link from 'next/link';
import { slug } from 'github-slugger';

const BlogLayoutOne = ({blog}) => {
  return (
    <div className="group inline-block overflow-hidden rounded-xl">
        {/* ##### Overlay Div for Image #####
                    absolute: | Layout : Position | -> [position: absolute] 
                                                        absolute utility to position an element outside of the normal flow of the document
                                                        Note*****: CAUSING NEIGHBORING ELEMENTS TO ACT AS IF THE ELEMENT DOESN'T EXIST 
                  
                    top-0: -> | Layout : Top/Right/Bottom/Left | -> top-*... inset-* utilities to set the horizontal or vertical position of a positioned element
                    left-0 bottom-0 right-0  note!    ^  is the same as "inset-0"
                                                      
                    h-full:  | Sizing : Height | ->  [height: 100%] h-full to set an element’s height to 100% of its parent, as long as the parent has a defined height
                    
                    bg-gradient-to-b: | Backgrounds : Background Image | -> [background-image: linear-gradient(to bottom, var(--tw-gradient-stops))]
                                                                            bg-gradient-* utilities in combination with the gradient color stop utilities to give an element a linear gradient background.

                    from-transparent: | Backgrounds : Gradient Color Stops | -> [--tw-gradient-from: transparent var(--tw-gradient-from-position); --tw-gradient-to: rgb(0 0 0 / 0) var(--tw-gradient-to-position);
                                                                                --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);]
                                                                          from-* utilities to set the starting color of a gradient.          
                    
                    from-0%: | Backgrounds : Gradient Color Stops | -> [--tw-gradient-from-position: 0%] 
                                                                      from-* utilities to set the starting color of a gradient.

                    to-dark/90:
                    rounded-3xl: | Borders : Border Radius | -> [border-radius: 1.5rem; 24px] apply different border radius sizes to an element.
                    z-0:         | Layout : Z-Index | -> [z-index: 0] layer thing

                */}
                <div className='absolute top-0 left-0 bottom-0 right-0 h-full 
                                bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-xl z-10' 
                />
            
            {/*  ##### Image #####
            
            */}
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
            {/* aspect-square w-full h-full object-cover object-center group-hover:scale-105 */}

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
            <div className='w-full absolute bottom-0 p-10 z-20'>
              
                {/*  ##### Tag w/ Link ##### 
                     Links to blog categories
                */}
                <Tag link={`/categories/${slug(blog.tags[0])}`} name={blog.tags[0]} 
                    className="px-6 text-sm py-2 !border"
                />
                

                {/* #####  Link #####
                    Links to blog

                    mt-6:   | Spacing : Margin | -> [margin-top: 1.5rem; 24px]
                */}
                <Link href={blog.url} className='mt-6'>


                  {/* ##### h1 styling ##### 
                      font styling 
                  */}
                  <h2 className='font-bold capitalize text-lg sm:text-xl md:text-2xl lg:text-2xl text-light mt-4'>
                      
                      {/*  #### Span Hover over Blog Title #####
                           
                      */}
                      <span className='bg-gradient-to-r from-accent to-accent dark:from-accentDark/50 
                                     dark:to-accentDark/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom 
                                       bg-no-repeat transition-[background-size] duration-500 '>
                        {blog.title}
                      </span>
                  </h2>
                </Link>
            </div>
    </div>
  )
}

export default BlogLayoutOne
"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { GithubIcon, LinkedInIcon, SunIcon } from '../Icons'
import Link from 'next/link'

const Footer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

  return (
    <footer className="mt-16 rounded-2xl bg-dark m-10 flex flex-col items-center text-light">
        <h3 className='mt-16 font-medium text-center capitalize text-4xl px-4'>
            Interesting Stories | Updates | Guides
        </h3>
        <p className="mt px-4 text-center w-3/5 font-light text-base">
            Subscribe to learn about new technology and updates. Join over 5000+ members community to stay up to date with latest news.
        </p>

        <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 w-fit sm:min-w-[384px] flex items-stretch bg-light dark:bg-dark p-1 sm:p-2 rounded mx04"
        >
            <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true, maxLength: 80 })}
            className="w-full bg-transparent pl-2 sm:pl-0 text-dark focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
            />

            <input
            type="submit"
            className="bg-dark text-light dark:text-dark dark:bg-light cursor-pointer font-medium rounded px-3 sm:px-5 py-1"
            />
        </form>

        {/* ##### Footer Icons Div ##### */}
        <div className="flex items-center mt-8">
            
            {/* ##### LinkedIn Div #####
                inline-block: | Layout : Display | -> [display: inline-block] 
                                                      inline, inline-block, and block utilities to control the flow of text and elements.
                
                w-6: | Sizing : Width | -> [width: 1.5rem; 24px] w-px, w-1, and w-64 to set an element to a fixed width
                h-6: | Sizing : Height| -> [height: 1.5rem; 24px] h-px, h-1, and h-64 to set an element to a fixed height

                mr-4: | Spacing : Margin | -> [margin-right: 1rem; 16px]  mt-*, mr-*, mb-*, and ml-* utilities to control the margin on ONE SIDE of an element.
                                                                          oppose to padding which is default on all sides
            */}
            <a href="http://" className="inline-block w-6 h-6 mr-4">

              {/* ##### LinkedIn Icon Styling #####
                  hover:scale-125: | Transforms : Scale | ->   only apply the scale-125 utility on hover.
                  transition-all:  | Transitions & Animation : Transition Property | -> transition-property: all;
                                                                                        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
                                                                                        transition-duration: 150ms;
                  ease: | Transitions & Animation : Transition Timing Function | ->
                  duration-200: | Transitions & Animation : Transition Duration | -> [transition-duration: 200ms] 
              */} 
              <LinkedInIcon className="hover:scale-125 transition-all ease duration-200"/>
            </a>

            {/* ##### GitHub Div #####
                same as linkedIn
            */}
            <a href="http://" className="inline-block w-6 h-6 mr-4 fill-light">
              {/* ##### Github Icon Styling ##### 
                same as linkedIn
              */}
              <GithubIcon className="hover:scale-125 transition-all ease duration-200 "/>
            </a>

        </div>

        <div className="w-full  mt-16 md:mt-24 relative font-medium border-t border-solid border-light py-6 px-8 flex  flex-col md:flex-row items-center justify-between">
        <span className="text-center">
          JC
        </span>
        <Link
          href="/sitemap.xml"
          className="text-center underline my-4 md:my-0"
        >
          sitemap.xml
        </Link>
        <div className="text-center">
          :)
        </div>
      </div>
        
    </footer>
  )
}

export default Footer
"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { GithubIcon, LinkedInIcon, SunIcon } from '../Icons'
import Link from 'next/link'
import siteMetadata from '../../utils/siteMetadata.js'

const Footer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

  return (
    /* ##### footer component #####
    
    */
    <footer className="mt-16 rounded-2xl bg-dark m-10 flex flex-col items-center text-light">
        <h3 className='mt-16 font-medium text-center capitalize text-4xl px-4'>
            Interesting Stories | Updates | Guides
        </h3>
        <p className="mt px-4 text-center w-3/5 font-light text-base">
            Subscribe to learn about new technology and updates. Join over 5000+ members community to stay up to date with latest news.
        </p>

        {/* ##### Form #####
        
        */}
        <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 w-fit sm:min-w-[384px] flex items-stretch bg-light dark:bg-dark p-1 sm:p-2 rounded mx04"
        >
            {/* ##### Input #####
            
            */}
            <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true, maxLength: 80 })}
            className="w-full bg-transparent pl-2 sm:pl-0 text-dark focus:border-dark focus:ring-0 border-0 border-b mr-2 pb-1"
            />

            {/* ##### Submit #####
            
            */}
            <input
            type="submit"
            className="bg-dark text-light dark:text-dark dark:bg-light cursor-pointer font-medium rounded px-3 sm:px-5 py-1"
            />
        </form>

        {/* ##### Footer Icons Div ##### */}
        <div className="flex items-center mt-8">
            
            <a href={siteMetadata.linkedin} className="inline-block w-6 h-6 mr-4">
              <LinkedInIcon className="hover:scale-125 transition-all ease duration-200"/>
            </a>

            <a href={siteMetadata.github} className="inline-block w-6 h-6 mr-4 fill-light">
              <GithubIcon className="hover:scale-125 transition-all ease duration-200 "/>
            </a>

        </div>

        {/* ##### The Foots Foot ##### */}
        <div className="w-full  mt-16 md:mt-24 relative font-medium border-t border-solid border-light py-6 px-8 flex  flex-col md:flex-row items-center justify-between">
        
        <span className="text-center">
          JC
        </span>

        <Link href="/sitemap.xml" className="text-center underline my-4 md:my-0">
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
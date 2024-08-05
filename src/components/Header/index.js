"use client"
import React, { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { GithubIcon, LinkedInIcon, MoonIcon, SunIcon } from '../Icons'
import siteMetadata from '../../utils/siteMetaDataFile'
import { useThemeSwitch } from '../Hooks/useThemeSwitch'
import { cx } from '../../utils'


/*
  Working with "flexbox"
  main axis:  defined by 'flex-direction' property
  cross axis: perpendicular to main axis
        
   main axis: four possible values 
        row / row-reverse,        left to right, and right to left
        column / column-reverse,  up to down, and down to up  (?? not sure on which order) 

   cross axis: perpendicular to main axis 
        
    quick-read:
    https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox
*/

const Header = () => {

  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);

  const toggle = () =>{
    setClick(!click)
  }

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    /*  ###### Overall Header Div ###### */ 
    <header className="w-full p-4 px-5 sm:px-10 flex items-center justify-between">
        
        {/* ##### Logo + nameTag Div ##### */}
        <Logo />



        {/* ##### Hamburger Button */}
        <button className="w-5 inline-block sm:hidden mr-5 fixed right-0 bg-light/80 backdrop-blur-sm z-50 rounded-full p-5"
        
          onClick={toggle} aria-label="Hamburger Menu">
          <div className="w-6 cursor-pointer transition-all ease duration-300 fixed right-10">
            <div className="relative">
            <span className="absolute top-0 inline-block w-full h-0.5 bg-dark  rounded transition-all ease duration-200" 
            style={{
             transform: click ? "rotate(-45deg) translateY(0)" : "rotate(0deg) translateY(6px)"
            }}
            
            >&nbsp;</span>
            <span className="absolute top-0 inline-block w-full h-0.5 bg-dark rounded transition-all ease duration-200"
            style={{
              opacity: click ? 0 : 1
             }}
            >&nbsp;</span>
            <span className="absolute top-0 inline-block w-full h-0.5 bg-dark rounded transition-all ease duration-200"
            style={{
              transform: click ? "rotate(45deg) translateY(0)" : "rotate(0deg) translateY(-6px)"
             }}
            >&nbsp;</span>
            </div>

          </div>
        </button>

        {/* ##### Nav controlled by Button ##### */}
        <nav className=" w-max py-3 px-6 sm:px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center flex  sm:hidden
        fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50
        transition-all ease duration-300
        "
        style={{
          top: click ? "1rem" : "-5rem"
         }}
        
        >
            <Link href="/" className="mr-2">Home</Link>
            <Link href="/about" className="mx-2">About</Link>
            <Link href="/contact" className="mx-2">Contact</Link>
            <button onClick={() => setMode(mode === "light" ? "dark" : "light")  }
            className={cx("w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1", mode === "light" ? "bg-dark text-light" :
            "bg-light text-dark" )}
            aria-label="theme-switcher"
            >
                {
                  mode === "light" ? <MoonIcon className={"fill-dark"} />  : <SunIcon className={"fill-dark"} />
                }
            </button>
        </nav>

        {/* ##### Header Button ##### */}
        <nav className=" w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize items-center hidden md:flex
        fixed top-4 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50">
            <Link href="/" className="mr-2">Home</Link>
            <Link href="/about" className="mx-2">About</Link>
            <Link href="/contact" className="mx-2">Contact</Link>
            
            <button onClick={() => setMode(mode === "light" ? "dark" : "light")  }
            className={cx("w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1", mode === "light" ? "bg-dark text-light" :
            "bg-light text-dark" )}
            aria-label="theme-switcher"
            >
                {
                  mode === "light" ? <MoonIcon className={"fill-dark"} />  : <SunIcon className={"fill-dark"} />
                }
            </button>
        </nav>

        {/* ##### Header Icons Div ##### */}<nav className=" w-max py-3 px-6 sm:px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center flex  sm:hidden
        fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50
        transition-all ease duration-300
        "
        style={{
          top: click ? "1rem" : "-5rem"
         }}
        
        >
            <Link href="/" className="mr-2">Home</Link>
            <Link href="/about" className="mx-2">About</Link>
            <Link href="/contact" className="mx-2">Contact</Link>
            <button onClick={() => setMode(mode === "light" ? "dark" : "light")  }
            className={cx("w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1", mode === "light" ? "bg-dark text-light" :
            "bg-light text-dark" )}
            aria-label="theme-switcher"
            >
                {
                  mode === "light" ? <MoonIcon className={"fill-dark"} />  : <SunIcon className={"fill-dark"} />
                }
            </button>
        </nav>
        <div className="hidden sm:flex items-center">
            {/* Links come from siteMetadata in utils */}
            
            <button
              role="link"
              onClick={() => openInNewTab(`${siteMetadata.linkedin}`)}
              className="inline-block w-6 h-6 mr-4"
            >
               <LinkedInIcon className="hover:scale-125 transition-all ease duration-200"/>
            </button>

            <button
              role="link"
              onClick={() => openInNewTab(`${siteMetadata.github}`)}
              className="inline-block w-6 h-6 mr-4"
            >
               <GithubIcon className="hover:scale-125 transition-all ease duration-200 dark:fill-light"/>
            </button>

        </div>
    </header>
  )
}

export default Header
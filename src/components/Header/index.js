import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { GithubIcon, LinkedInIcon, SunIcon } from '../Icons'


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
  return (
    /*  w-full            : setting the width of an element                                    [ex: w-9/12]
        p-4               : control element's padding (times 4: p-4 => p-16)                   [ex: p-0]
        px-5              : overides overall padding (p-4 => px-10) (times 4: px-10 => px-40)  [ex: py-10]
        flex              : creates flex items (ONLY Children)                                 [ex: flex is only for parent class]
        
        items-center      : control flex and grid items position on container's cross axis     [ex: items-start]
                            'items-center' aligns to center of the container’s cross axis
        
        justify-between   : 'control flex and grid items position on container's main axis     [ex: justify-start]
                             justify items along the center of the container’s main axis:                
    */
    <header className="w-full p-4 px-5 flex items-center justify-between">
        <Logo />

        {/* this className creates the rounded center piece at the center of the page*/}
        {/* also added the backdrop effect on scroll so it looks blurrry on scroll */}
        
        {/* 

        */}
        <nav className=" w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize items-center hidden sm:flex
        fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50">
            <Link href="/" className="mr-2">Home</Link>
            <Link href="/about" className="mx-2">About</Link>
            <Link href="/contact" className="mr-2">Contact</Link>
            <button>
              <SunIcon />
            </button>
        </nav>

        <div>
            {/* hover: allows for resize ui feautre*/}
            <a href="http://" className="inline-block w-6 h-6 mr-4">
              <LinkedInIcon className="hover:scale-125 transition-all ease duration-200"/>
            </a>
            <a href="http://" className="inline-block w-6 h-6 mr-4">
              <GithubIcon className="hover:scale-125 transition-all ease duration-200"/>
            </a>

        </div>
    </header>
  )
}

export default Header
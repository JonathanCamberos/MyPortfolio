import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { GithubIcon, LinkedInIcon, SunIcon } from '../Icons'


const Header = () => {
  return (
    <header className="w-full p-4 px-10 flex items-center justify-between">
        <Logo />

        {/* this className creates the rounded center piece at the center of the page*/}
        {/* also added the backdrop effect on scroll so it looks blurrry on scroll */}
        
        {/* py-3          : affects length left to right
            px-8          : affects length up to down
            border        : border create()
            border-solid  : border style
            border-dark   : border color
            rounded-full  : div shape
            font-medium   : size of font
            capitalize    : stype of font
            items-center  : 
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
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { GithubIcon, LinkedInIcon } from '../Icons'


const Header = () => {
  return (
    <header className="w-full p-4 px-10 flex items-center justify-between">
        <Logo />

        {/* this className creates the rounded center piece at the center of the page*/}
        {/* also added the backdrop effect on scroll so it looks blurrry on scroll */}
        <nav className="w-max py-3 px-8 border border-solid border-dark rounded-full 
                        font-medium capitalize flex items-center fixed top-6 right-1/2 translate-x-1/2
                        bg-light/80 backdrop-blur-sm">
            <Link href="/" className="mr-2">Home</Link>
            <Link href="/about" className="mx-2">About</Link>
            <Link href="/contact" className="mr-2">Contact</Link>
            <button>Night Button </button>
        </nav>
        <div>
            {/* resizing the icons */}
            <a href="http://" className="inline-block w-6 h-6 mr-4">
              <LinkedInIcon className="hover:scale-105 transition-all ease duration-200"/>
            </a>
            <a href="http://" className="inline-block w-6 h-6 mr-4">
              <GithubIcon className="hover:scale-105 transition-all ease duration-200"/>
            </a>

        </div>
    </header>
  )
}

export default Header
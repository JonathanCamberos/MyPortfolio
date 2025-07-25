"use client"
import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { GithubIcon, LinkedInIcon, MoonIcon, SunIcon, LeetCodeIcon } from '../Icons'
import siteMetadata from '../../utils/siteMetaDataFile'
import { useThemeSwitch } from '../Hooks/useThemeSwitch'
import { cx } from '../../utils'


const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);

  const toggle = () => {
    setClick(!click);
  };

  // Close hamburger menu if window resizes wider than breakpoint (e.g. 768px for md)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && click) {
        setClick(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [click]);

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  return (
    <>
      <header
        className="w-full sm:p-4 px-5 flex items-center justify-between fixed top-0 z-50 bg-light dark:bg-dark shadow-md transition-all duration-300"
      >
        {/* Logo Section */}
        <Logo />

        {/* Hamburger Menu */}
        <button
          className="w-10 h-10 flex items-center justify-center sm:hidden mr-5 cursor-pointer rounded transition-all ease duration-300"
          onClick={toggle}
          aria-label="Hamburger Menu"
        >
          <div className="relative w-6 h-6">
            {/* Original Top Line */}
            <span
              className="absolute top-1/2 left-1/2 h-0.5 bg-dark dark:bg-light rounded transition-transform duration-300 ease-in-out"
              style={{
                width: click ? "60%" : "100%",
                transform: click
                  ? "rotate(45deg) translate(-50%, -50%)"
                  : "translateY(-6px) translateX(-50%)",
              }}
            />
            {/* Original Middle Line */}
            <span
              className="absolute top-1/2 left-0 w-full h-0.5 bg-dark dark:bg-light rounded transition-opacity duration-300 ease-in-out"
              style={{
                opacity: click ? 0 : 1,
              }}
            />
            {/* Original Bottom Line */}
            <span
              className="absolute top-1/2 left-1/2 h-0.5 bg-dark dark:bg-light rounded transition-transform duration-300 ease-in-out"
              style={{
                width: click ? "60%" : "100%",
                transform: click
                  ? "rotate(-45deg) translate(-50%, -50%)"
                  : "translateY(6px) translateX(-50%)",
              }}
            />
            {/* New Additional Line 1 (Up Right) */}
            <span
              className="absolute top-1/2 left-1/2 h-0.5 bg-dark dark:bg-light rounded transition-transform duration-300 ease-in-out"
              style={{
                width: click ? "60%" : "100%",
                transform: click
                  ? "rotate(-45deg) translate(50%, -50%)"
                  : "translateY(-6px) translateX(-50%)",
                opacity: click ? 1 : 0,
              }}
            />
            {/* New Additional Line 2 (Down Right) */}
            <span
              className="absolute top-1/2 left-1/2 h-0.5 bg-dark dark:bg-light rounded transition-transform duration-300 ease-in-out"
              style={{
                width: click ? "60%" : "100%",
                transform: click
                  ? "rotate(45deg) translate(50%, -50%)"
                  : "translateY(6px) translateX(-50%)",
                opacity: click ? 1 : 0,
              }}
            />
          </div>
        </button>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center dark:text-light transform -translate-x-8">
          <Link href="/" className="mr-2 hover:text-accent dark:hover:text-accentDark">
            Home
          </Link>
          <Link href="/SearchNotes/all-categories" className="mx-2 hover:text-accent dark:hover:text-accentDark">
            Notes
          </Link>
          <Link href="/LeetCode" className="mx-2 hover:text-accent dark:hover:text-accentDark">
            LeetCode
          </Link>
          <Link href="/About" className="mx-2 hover:text-accent dark:hover:text-accentDark">
            About
          </Link>
          <button
            onClick={() => {
              setMode(mode === "light" ? "dark" : "light");
              document.dispatchEvent(new Event("darkModeToggled"));
            }}
            className={cx(
              "w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1 hover:scale-125 transition-all ease duration-200",
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            )}
            aria-label="theme-switcher"
          >
            {mode === "light" ? (
              <MoonIcon className={"fill-dark"} />
            ) : (
              <SunIcon className={"fill-dark"} />
            )}
          </button>
        </nav>

        {/* Social Media Icons */}
        <div className="hidden sm:flex items-center">
          <button
            role="link"
            onClick={() => openInNewTab(`${siteMetadata.linkedin}`)}
            className="inline-block w-6 h-6 mr-4"
          >
            <LinkedInIcon className="hover:scale-125 transition-all ease duration-200" />
          </button>
          <button
            role="link"
            onClick={() => openInNewTab(`${siteMetadata.github}`)}
            className="inline-block w-6 h-6 mr-4"
          >
            <GithubIcon className="hover:scale-125 transition-all ease duration-200 dark:fill-light" />
          </button>
          <button
            role="link"
            onClick={() => openInNewTab(`${siteMetadata.leetcode}`)}
            className="inline-block w-6 h-6 mr-4"
          >
            <LeetCodeIcon className="hover:scale-125 transition-all ease duration-200 dark:fill-light" />
          </button>
        </div>
      </header>

      {/* Hamburger Popup */}
      <div
        className={`fixed top-0 left-0 w-full bg-light dark:bg-dark p-6 shadow-lg z-40 
    transform transition-all duration-300 ease-in-out ${
      click ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}
      >
        {/* Dummy Item */}
    <div className="mb-1 invisible">
      ur not supposed to see this :)
    </div>
        <nav className="flex flex-col items-start text-dark dark:text-light">
          <Link
            href="/"
            className="mb-2 hover:text-accent dark:hover:text-accentDark"
            onClick={toggle}
          >
            Home
          </Link>
          <Link
            href="/SearchNotes/all-categories"
            className="mb-2 hover:text-accent dark:hover:text-accentDark"
            onClick={toggle}
          >
            Notes
          </Link>
          <Link
            href="/LeetCode"
            className="mb-2 hover:text-accent dark:hover:text-accentDark"
            onClick={toggle}
          >
            LeetCode
          </Link>
          <Link
            href="/About"
            className="mb-2 hover:text-accent dark:hover:text-accentDark"
            onClick={toggle}
          >
            About
          </Link>
          <button
            onClick={() => {
              setMode(mode === "light" ? "dark" : "light");
              toggle();
              document.dispatchEvent(new Event("darkModeToggled"));
            }}
            className={`w-6 h-6 ease mb-4 flex items-center justify-center rounded-full p-1 hover:scale-125 transition-all ease duration-200 ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            aria-label="theme-switcher"
          >
            {mode === "light" ? (
              <MoonIcon className={"fill-dark"} />
            ) : (
              <SunIcon className={"fill-dark"} />
            )}
          </button>
          <button
            role="link"
            onClick={() => {
              openInNewTab(`${siteMetadata.linkedin}`);
              toggle();
            }}
            className="inline-block w-6 h-6 mb-4"
          >
            <LinkedInIcon className="hover:scale-125 transition-all ease duration-200" />
          </button>
          <button
            role="link"
            onClick={() => {
              openInNewTab(`${siteMetadata.github}`);
              toggle();
            }}
            className="inline-block w-6 h-6 mb-4"
          >
            <GithubIcon className="hover:scale-125 transition-all ease duration-200 dark:fill-light" />
          </button>
          <button
            role="link"
            onClick={() => {
              openInNewTab(`${siteMetadata.leetcode}`);
              toggle();
            }}
            className="inline-block w-6 h-6"
          >
            <LeetCodeIcon className="hover:scale-125 transition-all ease duration-200 dark:fill-light" />
          </button>
        </nav>
      </div>

    </>
  );
};

export default Header;
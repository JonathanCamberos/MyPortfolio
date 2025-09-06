import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import cat30 from "../../../public/logo/cat30.png"

// icon from https://icons8.com/icon/set/react-logo/group-outlined :)

const Logo = () => {
  return (

    /* ##### Link is for both ##### */
    <Link href="/" className="flex items-center text-dark dark:text-light">

        {/*  ##### Icon Div #####*/}
        <div className="w-8 md:w-8 rounded-full overflow-hidden mr-1">
            
            {/*  ##### Image #####*/}
            <Image src={cat30} alt="Jc-alt logo" className="w-10/12 h-auto" sizes="20vw" priority />
        </div>

        {/*  ##### Span Div for name #####*/}
        <span className="font-bold dark:font-semibold text-md sm:text-sm md:text-lg">
          jc
        </span>
    </Link>
  )
}

export default Logo
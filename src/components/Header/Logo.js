import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import profileImg from "../../../public/pear.png"
// icon from https://icons8.com/icon/set/react-logo/group-outlined :)

const Logo = () => {
  return (

    /* ##### Link is for both ##### */
    <Link href="/" className="flex items-center text-dark dark:text-light">

        {/*  ##### Icon Div #####*/}
        <div className=" w-12 md:w-16 rounded-full overflow-hidden border border-solid border-dark dark:border-gray  mr-2 md:mr-4">
            
            {/*  ##### Image #####*/}
            <Image src={profileImg} alt="Jc-alt logo" className="w-full h-auto rounded-full" sizes="20vw" priority />
        </div>

        {/*  ##### Span Div for name #####*/}
        <span className="font-bold dark:font-semibold text-lg md:text-xl">
          jonathancamberos :')
        </span>
    </Link>
  )
}

export default Logo
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import profileImg from "../../../public/icons8-logo-100.png"
// icon from https://icons8.com/icon/set/react-logo/group-outlined :)

const Logo = () => {
  return (

    /* flex:              :
       items-center       :
       text-dark          :
       dark:text-light    :
    
    */
    <Link href="/" className="flex items-center text-dark dark:text-light">
        {/* <div className=" w-12 md:w-16 rounded-full overflow-hidden border border-solid border-dark dark:border-gray  mr-2 md:mr-4"> */}
        <div className=" w-12 md:w-16 overflow-hidden">
            <Image src={profileImg} alt="CodeBucks logo" className="w-full h-auto rounded-full" sizes="20vw" priority />
        </div>
        <span className="font-bold dark:font-semibold text-lg md:text-xl">
          jonathancamberos :')
        </span>
    </Link>
  )
}

export default Logo
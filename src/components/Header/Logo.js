import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import profileImg from "@/public/profile-img.png"

const Logo = () => {
  return (
    <Link href="/" className="flex items-center text-dark">
        <div className="w-16 rounded-full overflow border border-solid border-dark">
             <Image src={profileImg} alt="JC-Alt" className="w-full h-auto rounded-full" />
        </div>
        <span className="font-bold text-xl">JC</span>
    </Link>
  )
}

export default Logo
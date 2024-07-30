import React from 'react'
import Image from 'next/image'

const HomeCoverSection = ( {blogs} ) => {
  
    const blog = blogs[0]

  return (
    <article className='flex flex-col items-start justify-end mx-10 relative h-[85]'>
        <Image src={blog.image.filePath.replace("../public", "")}
            placeholder='blur'
            blurDataURL={blog.image.blurhashDataUrl}
            alt={blog.title}
            fill
            className='w-full h-full object-center object-cover'
        />
    </article>
  )
}

export default HomeCoverSection
import { format, parseISO } from 'date-fns'
import { slug } from 'github-slugger'
import Link from 'next/link'
import React from 'react'

// working

const NoteDetails = ({blog, slug: blogSlug}) => {
  return (
    <div className="px-2  md:px-10 bg-accent dark:bg-accentDark text-light dark:text-dark py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium mx-5  md:mx-10 rounded-lg">

        
        {/* ##### Published  ##### */}
        <time className="m-3">
          Published: {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
        </time>

        {/* ##### Updated  ##### */}
        <time className="m-3">
          Updated: {format(parseISO(blog.updatedAt), "LLLL d, yyyy")}
        </time>

        {/* ##### Reading Time ##### */}
        <div className="m-3">
            {blog.readingTime.text}
        </div>
        
        {/* ##### Main Tag ##### */}
        <Link href={`/SearchNotes/${slug(blog.tags[0])}`} className="m-3">
          #{blog.tags[0]}
        </Link>
    </div>
  )
}

export default NoteDetails
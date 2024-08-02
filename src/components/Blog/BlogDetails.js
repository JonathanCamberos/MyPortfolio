import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import React from 'react'

const BlogDetails = ({blog}) => {
  return (
    <div className="px-10 bg-accent text-light py-2 flex items-center justify-around flex-wrap
            text-xl font-medium mx-10 rounded-lg">
        
        {/* ##### Published  ##### */}
        <time className="m-3">
            {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
        </time>

        {/* ##### ##### */}
        <span className="m-3">
            10 views
        </span>
        
        {/* ##### Reading Time ##### */}
        <div className="m-3">
            {blog.readingTime.text}
        </div>
        
        {/* ##### Main Tag ##### */}
        <Link href={`/categories/${blog.tags[0]}`} className="m-3">
          #{blog.tags[0]}
        </Link>
    </div>
  )
}

export default BlogDetails
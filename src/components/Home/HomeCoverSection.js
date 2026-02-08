import React from 'react'
import { sortBlogs } from '../../utils'
import LeetCodeStats from "./../../components/Home/LeetCodeStats"; 

// passing blog objects from page.js (which imports from content folder)
const HomeCoverSection = ( {blogs} ) => {
  
    //sorting to find newest blog       
    const sortedBlogs = sortBlogs(blogs)
    const blog = sortedBlogs[0]

    return (
      <div>
       {/* <div className="md:w-11/12 w-full inline-block"> */}
        {/* Stats Section (50:50 Split) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 items-center min-h-[60vh]">
  <div className="flex flex-col items-center text-center p-6 sm:p-10">
    <h2 className="text-3xl font-bold dark:text-light">
      Hola!
    </h2>
    <p className="text-lg dark:text-light leading-relaxed max-w-3xl">
      I'm Jonathan, a passionate software engineer with a love
      for building. I created this portfolio to organize notes on
      leetcode, projects, and books I'm reading. Feel free to take a look around!
    </p>
  </div>

  <div className="flex justify-center items-center">
    <div className="w-full max-w-sm">
      <LeetCodeStats />
    </div>
  </div>
</div>

      </div>
    )
}

export default HomeCoverSection
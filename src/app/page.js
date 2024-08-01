import { allBlogs } from "../../.contentlayer/generated"
import FeaturedPosts from "../components/Home/FeaturedPosts";

import HomeCoverSection from "../components/Home/HomeCoverSection";
import RecentPosts from "../components/Home/RecentPosts";
// success!

// the page.js is a ui that is unique to every route
// page.js is directly under the app directory and represents https://localhost:3000

export default function Home() {
    return (

    /* ##### Main Tag for loading #####
       flex:            | Layout : Display | -> [display: flex] flex utility to create a block-level flex container 
       flex-col:        | Flexbox & Grid : Flex Direction | -> [flex-direction: column] flex-col to position flex items vertically
       items-center:    | Flexbox & Grid : Align Items | -> items-center to align items along the center of the container’s cross axis (top to bottom)
       justify-center:  | Flexbox & Grid : Justify Content | -> justify-center to justify items along the center of the container’s main axis (left to right)
    */
    <main className="flex flex-col items-center justify-center">

      {/* ##### HomeCoverSection component #####
          import allBlog from auto generated mdx and pass to cover section 
      */}
      <HomeCoverSection blogs={allBlogs} />

      {/* ##### FeaturedPosts component #####
          same import as HomeCoverSection 
      */}
      <FeaturedPosts blogs={allBlogs} />

      {/* ##### FeaturedPosts component #####
          same import as HomeCoverSection 
      */}
      <RecentPosts blogs={allBlogs}/>
    </main>
  )
}

import { allBlogs } from "../../.contentlayer/generated"

import HomeCoverSection from "../components/Home/HomeCoverSection";
// success!

// the page.js is a ui that is unique to every route
// page.js is directly under the app directory and represents https://localhost:3000

export default function Home() {
    return (

    // 
    <main className="flex flex-col items-center justify-center">

      {/* import allBlog from auto generated mdx and pass to cover section */}
      <HomeCoverSection blogs={allBlogs} />
    </main>
  )
}

import { allBlogs } from "../../.contentlayer/generated"

import HomeCoverSection from "../components/Home/HomeCoverSection";
// attempting

// the page.js is a ui that is unique to every route
// page.js is directly under the app directory
// represents https://localhost:3000

export default function Home() {
  
  console.log("Log")
  let blog = allBlogs[0];
  console.log(blog);

  return (
    <main className="flex flex-col items-center justify-center">
      {/* <HomeCoverSection blogs={allBlogs} /> */}
      <h1>helloo</h1>
    </main>
  )
}

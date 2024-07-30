
import {allBlogs} from "../../.contentlayer/generated"
// attempting

// the page.js is a ui that is unique to every route
// page.js is directly under the app directory
// represents https://localhost:3000

export default function Home() {
  console.log(allBlogs);  
  return (
    <main className="flex flex-col items-center justify-center">
      hello world!
    </main>
  )
}

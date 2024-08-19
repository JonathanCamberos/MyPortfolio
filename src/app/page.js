import { allBlogs } from "../../.contentlayer/generated"
import FeaturedPosts from "../components/Home/FeaturedPosts";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import RecentPosts from "../components/Home/RecentPosts";

// the page.js is a ui that is unique to every route
// page.js is directly under the app directory and represents https://localhost:3000

export default function Home() {
    return (

    /* ##### Main Tag for SEO loading #####*/
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={allBlogs} />
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs}/>
    </main>
  )
}

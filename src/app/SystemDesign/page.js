import { allBlogs } from "../../../.contentlayer/generated";
import GithubSlugger from "github-slugger";
import QuestionSection from "../../components/LeetCode/QuestionSection";
import DifficultySection from "../../components/LeetCode/Difficulty/DifficultySection";
import ApplicationSection from "../../components/LeetCode/Application/ApplicationSection";
import SolutionSection from "../../components/LeetCode/Solutions/SolutionSection";

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories = [];
  const paths = [{ slug: "all" }];

  allBlogs.map((blog) => {
    if (blog.isPublished) {
      blog.tags.map((tag) => {
        let slugified = slugger.slug(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

const LeetCodePage = ({ params }) => {
  return (
    <article className="mt-20 flex flex-col text-dark dark:text-light">
      {/* <SolutionSection />
      <ApplicationSection />
      <QuestionSection />
      <DifficultySection /> */}

      System design! (to-do create search page -jonathan 09/07/25)
    </article>
  );
};

export default LeetCodePage;
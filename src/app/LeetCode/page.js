import { allBlogs } from "../../../.contentlayer/generated";
import GithubSlugger, { slug } from "github-slugger"
import QuestionSection from "../../components/LeetCode/QuestionSection";
import DifficultySection from "../../components/LeetCode/DifficultySection";
import UseCasesSection from "../../components/LeetCode/UseCasesSection";

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

const LeetCodePage = ({params}) => {


  return (
    <article className="mt-20 flex flex-col text-dark dark:text-light">
      <QuestionSection />
      <UseCasesSection />
      <DifficultySection />

    </article>
  );
};

export default LeetCodePage
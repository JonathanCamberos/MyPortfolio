import { allBlogs } from "../../../.contentlayer/generated";
import GithubSlugger from "github-slugger";
import DefinitionSearch from "../../components/SystemDesign/DefinitionTextSearch";

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  const categories = [];
  const paths = [{ slug: "all" }];

  allBlogs.forEach((blog) => {
    if (blog.isPublished) {
      blog.tags.forEach((tag) => {
        const slugified = slugger.slug(tag);
        if (!categories.includes(slugified)) {
          categories.push(slugified);
          paths.push({ slug: slugified });
        }
      });
    }
  });

  return paths;
}

const SystemDesignPage = ({ params }) => {
  return (
    <article className="mt-20 flex flex-col text-dark dark:text-light">
      <DefinitionSearch />
    </article>
  );
};

export default SystemDesignPage;

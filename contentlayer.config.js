import { makeSource, defineDocumentType } from '@contentlayer/source-files'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import GithubSlugger from 'github-slugger'


/* All Blogs come w/ these parameters
   used for ease of manipulation for React display
*/
 const Blog = defineDocumentType(() => ({
    name: "Blog",
    filePathPattern: "**/**/*.mdx",
    contentType: "mdx",
    fields: {
      title: {
        type: "string",
        required: true,
      },
      publishedAt: {
        type: "date",
        required: true,
      },
      updatedAt: {
        type: "date",
        required: true,
      },
      description: {
        type: "string",
        required: true,
      },
      image: { type: "image" },
      isPublished: {
        type: "boolean",
        default: true,
      },
      author: {
        type: "string",
        required: true,
      },
      tags: {
        type: "list",
        of: { type: "string" },
      },
    },
    computedFields: {
       /* Simply creates url from doc._raw */
        url: {
          type: "string",
          resolve: (doc) => `/blogs/${doc._raw.flattenedPath}`,
        },

        /* Calculates readingTime via extension that reads raw MDX file (word count, etc)*/
        readingTime: {
          type: "json",
          resolve: (doc) => readingTime(doc.body.raw)
        },

        /* Creates TOC via slugging */
        toc: {
          type: "json",
          resolve: async (doc) => {
            const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
            const slugger = new GithubSlugger();
            const toc = {};
            const stack = []; // To handle multiple heading levels
      
            Array.from(doc.body.raw.matchAll(regulrExp)).forEach(({ groups }) => {
              const level = groups.flag.length;
              const content = groups.content;
              const slug = slugger.slug(content);
      
              const current = { text: content, slug, subheadings: [] };
      
              while (stack.length && stack[stack.length - 1].level >= level) {
                stack.pop();
              }
      
              if (stack.length) {
                stack[stack.length - 1].subheadings.push(current);
              } else {
                toc[content] = current;
              }
      
              stack.push({ ...current, level });
            });
      
            return toc;
          },
        }
  },
}))

/* options for code style in blogs */
const codeOptions = {
  theme: 'github-dark',
  grid: false,         
}

/* different plugins to make the blogs pretty :) */ 
export default makeSource({
  /* options */
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {behavior: "wrap"}], [rehypePrettyCode, codeOptions] ] }
});

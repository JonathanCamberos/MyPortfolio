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
        toc:{
            type: "json",
            resolve: async (doc) => {
      
              // RegExp to match headings
              const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
              const slugger = new GithubSlugger();

              // create headings objects from headers matched from RegExp
              const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(({groups}) => {
                const flag = groups?.flag;
                const content = groups?.content;
                  
                // shoves json into 'headings'  
                return {
                    level: flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : "three",
                    text: content,
                    slug: content ? slugger.slug(content) : undefined
                  } 
                })
    
              return headings; //returns heading, becomes 'resolve'
            }
        }
  },
}))

/* options for code style in blogs */
const codeOptions = {
  theme: 'github-dark',
  grid: false,
}

/* // different plugins to make the blogs pretty :) */ 
export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Blog],
    mdx: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {behavior: "append"}],
    rehypePrettyCode, codeOptions]}
})
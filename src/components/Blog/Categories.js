import React from 'react'
import Category from './Category'
import { allBlogs } from '../../../.contentlayer/generated';
import GithubSlugger, { slug } from "github-slugger";

/* creating slug like this so that all created links are unique */ 
const slugger = new GithubSlugger()

/* this will eventually generate routes for each slugs 
   such as 'all', 'web-development', etc.
   now if you have static data in your website, it is better to use 
   generateStaticParams() function at build time as it will generate all the routes
   at build time and load the website much faster
*/
export async function generateStaticParams() {

    const categories = [];
    const path = [{slug: "all"}]

    allBlogs.map(blog => {
        if(blog.isPublished){
            blog.tags.map(tag =>{
                let slugifiedTag = slugger.slug(tag);
                if(!categories.includes(slugifiedTag)){
                    categories.push(slugifiedTag)
                    paths.push({slug: slugifiedTag})
                }
            })
        }
    })

    return posts.map((post) => ({
      slug: post.slug,
    }))
  }
  
const Categories = ({ categories, currentSlug }) => {
  return (
    <div className="px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10">
      {categories.map((cat) => {
        const catSlug = slug(cat);
        const isActive = currentSlug === catSlug;
        const link = isActive ? "/notes/all-categories" : `/notes/${catSlug}`;

        return (
          <Category
            key={cat}
            name={cat}
            active={isActive}
            link={link}
          />
        );
      })}
    </div>
  );
};

export default Categories;
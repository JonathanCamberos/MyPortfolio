import React from 'react'
import { sortBlogs } from '../../utils';
import NotesDisplayOne from '../Notes/NotesDisplayOne';


const FeaturedPosts = ({ blogs }) => {
    const sortedBlogs = sortBlogs(blogs);
    return <section className="w-full px-5 sm:px-10 md:px-24  sxl:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">Currently Working On:</h2>
  
      <div className="grid grid-cols-3 grid-rows-2 gap-6 mt-10 sm:mt-16">
        <article className="relative">
          <NotesDisplayOne blog={sortedBlogs[0]} />
        </article>
        <article className="relative">
          <NotesDisplayOne blog={sortedBlogs[1]} />
        </article>
        <article className="relative">
          <NotesDisplayOne blog={sortedBlogs[2]} />
        </article>
        <article className="relative">
          <NotesDisplayOne blog={sortedBlogs[3]} />
        </article>
        <article className="relative">
          <NotesDisplayOne blog={sortedBlogs[4]} />
        </article>
        <article className="relative">
          <NotesDisplayOne blog={sortedBlogs[5]} />
        </article>
        <article className="relative">
          <NotesDisplayOne blog={sortedBlogs[6]} />
        </article>
        <article className="relative">
          <NotesDisplayOne blog={sortedBlogs[7]} />
        </article>
        <article className="relative">
          <NotesDisplayOne blog={sortedBlogs[8]} />
        </article>
      </div>
    </section>;
  };
  
  export default FeaturedPosts;
  
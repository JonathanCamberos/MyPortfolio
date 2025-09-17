"use client";

import React, { useState } from "react";
import NotesToc from "../../../components/Notes/NotesToc";
import RenderMdx from "../../../components/Notes/RenderMdx";

export default function ClientBlog({ blog }) {
  const [tocOpen, setTocOpen] = useState(true);

  // Column classes for responsive layout
  const tocColClass = tocOpen ? "col-span-12 lg:col-span-3" : "col-span-12 lg:col-span-1";
  const contentColClass = tocOpen ? "col-span-12 lg:col-span-9" : "col-span-12 lg:col-span-11";

  return (
    <div className="grid grid-cols-12 gap-y-8 lg:gap-8 sxl:gap-16 mt-8 px-5 md:px-10">
      
      {/* TOC Column */}
      <div className={`${tocColClass} transition-all duration-300 ease-in-out flex flex-col`}>
        
        {/* Sticky wrapper for TOC + button */}
        <div className="sticky top-6 flex flex-col max-h-[80vh]">
          
          {/* Scrollable TOC only */}
            <NotesToc blog={blog} />

          {/* Button below TOC, outside scroll */}
          <div className="mt-2 flex-shrink-0">
            <button
            className="w-full px-4 py-2 rounded text-dark dark:text-light dark:hover:text-accentDark hover:text-accent transition-colors duration-200 hidden lg:block"
            onClick={() => setTocOpen(!tocOpen)}
            >
            {tocOpen ? "<<<" : ">"}
            </button>
          </div>
        </div>

      </div>

      {/* MDX Content Column */}
      <div className={`${contentColClass} transition-all duration-300 ease-in-out`}>
        <RenderMdx blog={blog} />
      </div>

    </div>
  );
}

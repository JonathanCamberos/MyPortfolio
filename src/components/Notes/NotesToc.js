"use client";

import React from "react";

const ChildItem = ({ item }) => {
  const hasChildren = item.subheadings && item.subheadings.length > 0;

  return (
    <li className="mb-1">
      {hasChildren ? (
        <details className="group ml-4">
          <summary className="cursor-pointer hover:underline pl-2">
            <a href={`#${item.slug}`}>{item.text}</a>
          </summary>

          <ul className="mt-2">
            {item.subheadings.map((sub) => (
              <ChildItem key={sub.slug} item={sub} />
            ))}
          </ul>
        </details>
      ) : (
        <a
          href={`#${item.slug}`}
          className="hover:underline block ml-6 flex items-center"
        >
          <span className="flex w-1 h-1 rounded-full bg-dark dark:bg-light mr-2">&nbsp;</span>
          {item.text}
        </a>
      )}
    </li>
  );
};

const NotesToc = ({ blog }) => {
  const level2Items = React.useMemo(
    () =>
      Object.entries(blog?.toc || {}).map(([text, value]) => ({
        text,
        slug: value.slug,
        subheadings: value.subheadings || [],
      })),
    [blog]
  );

  if (!level2Items.length) return null;

  return (
    <div className="col-span-12 lg:col-span-3">
      <details
        className="border border-solid border-dark dark:border-light text-dark
                   dark:text-light rounded-lg p-4 sticky top-6 max-h-[80vh]
                   overflow-hidden overflow-y-auto"
        open
      >
        <summary className="text-lg font-semibold capitalize cursor-pointer">
          Table Of Contents
        </summary>

        <hr className="border-t border-dark/20 dark:border-light/20 my-4" />

        <ul className="mt-4 font-in text-base">
          {level2Items.map((item, idx) => (
            <li key={item.slug} className="mb-2">
              {/* Level 2: always toggleable */}
              <details className="group">
                <summary className="cursor-pointer hover:underline pl-2">
                  <a href={`#${item.slug}`}>{item.text}</a>
                </summary>

                {item.subheadings.length > 0 && (
                  <ul className="mt-2">
                    {item.subheadings.map((child) => (
                      <ChildItem key={child.slug} item={child} />
                    ))}
                  </ul>
                )}
              </details>

              {/* Divider after each level 2, except last */}
              {idx < level2Items.length - 1 && (
                <hr className="border-t border-solid border-dark/20 dark:border-light/20 my-4" />
              )}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default NotesToc;
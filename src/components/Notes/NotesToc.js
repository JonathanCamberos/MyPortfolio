import React from 'react';


const NotesToc = ({ blog }) => {
  return (
    <div className="col-span-12 lg:col-span-3">
      <details
        className="border-[1px] border-solid border-dark dark:border-light text-dark
        dark:text-light rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
        open
      >
        <summary className="text-lg font-semibold capitalize cursor-pointer">
          Table Of Content
        </summary>

        {/* Add horizontal divider after the "Table Of Content" summary */}
        <hr className="border-t border-solid border-dark/20 dark:border-light/20 my-4" />

        <ul className="mt-4 font-in text-base">
          {/* Iterate over each level 2 heading */}
          {Object.entries(blog.toc).map(([headingText, { slug, subheadings }], index) => (
            <li key={`#${slug}`} className="mb-2">
              <details>
                <summary
                  className="cursor-pointer hover:underline"
                >
                  <a href={`#${slug}`}>
                    {headingText}
                  </a>
                </summary>

                <ul className="ml-4 mt-2">
                  {/* Iterate over each level 3 subheading under the current level 2 heading */}
                  {subheadings.map(({ text, slug }) => (
                    <li key={`#${slug}`} className="py-1">
                      <a
                        href={`#${slug}`}
                        data-level="three"
                        className="pl-4 sm:pl-6 flex items-center justify-start"
                      >
                        <span className="flex w-1 h-1 rounded-full bg-dark dark:bg-light mr-2">
                          &nbsp;
                        </span>
                        <span className="hover:underline">{text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </details>

              {/* Add horizontal divider after each level 2 heading, except the last one */}
              {index < Object.entries(blog.toc).length - 1 && (
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
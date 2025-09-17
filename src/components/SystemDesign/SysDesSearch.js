"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SystemDesignSearchSection = () => {
  const [definitions, setDefinitions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredKeys, setFilteredKeys] = useState([]);

  useEffect(() => {
    fetch("/generatedDB/systemDesignDefinitions.json")
      .then((res) => res.json())
      .then((data) => setDefinitions(data))
      .catch((err) =>
        console.error("Failed to fetch systemDesignDefinitions:", err)
      );
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredKeys([]);
      return;
    }

    if (searchQuery.trim().toLowerCase() === "all") {
      setFilteredKeys(Object.keys(definitions));
    } else {
      const q = searchQuery.toLowerCase();
      const matches = Object.keys(definitions).filter((key) => {
        const def = definitions[key];
        return (
          key.toLowerCase().includes(q) ||
          def.body.toLowerCase().includes(q) ||
          def.blog.toLowerCase().includes(q)
        );
      });
      setFilteredKeys(matches);
    }
  }, [searchQuery, definitions]);

  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-3xl">
          Search System Design Definitions
        </h1>
        <span className="mt-2 inline-block">
          Find definitions by name or content.
        </span>
      </div>

      <div className="mt-5 px-5 sm:px-10 md:px-24 sxl:px-32">
        <input
          type="text"
          placeholder="'All' or search by name…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md shadow-sm bg-light dark:bg-dark text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-500"
        />
      </div>

      <div className="px-0 md:px-10 sxl:px-20 mt-10 border-t-2 border-b-2 border-solid border-dark dark:border-light py-4 flex flex-wrap font-medium mx-5 md:mx-10 min-h-[60px]">
        {searchQuery !== "" ? (
          filteredKeys.length > 0 ? (
            filteredKeys.map((key) => {
              const def = definitions[key];
              return (
                <Link
                  key={key}
                  href={def.definitionLink}
                  className="py-1.5 px-6 rounded-full border-2 border-dark dark:border-light bg-white dark:bg-dark text-dark dark:text-light hover:bg-orange-100 dark:hover:bg-yellow-900 transition-all m-2"
                >
                  {def.name}
                </Link>
              );
            })
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 w-full m-2">
              No results found.
            </p>
          )
        ) : (
          <div className="w-full h-10" />
        )}
      </div>

      {filteredKeys.length > 0 && (
        <div className="mt-10 px-5 sm:px-10 md:px-24 sxl:px-32 space-y-8">
          {filteredKeys.map((key) => {
            const def = definitions[key];
            return (
              <div
                key={key}
                className="border rounded-xl p-4 shadow-sm bg-light dark:bg-dark"
              >
                <h2 className="text-xl font-semibold mb-2">{def.name}</h2>
                <p className="text-base leading-relaxed mb-3">{def.body}</p>
                <Link
                  href={def.definitionLink}
                  className="text-orange-600 dark:text-yellow-400 underline"
                >
                  Go to section →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
};

export default SystemDesignSearchSection;
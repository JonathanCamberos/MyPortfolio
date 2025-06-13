"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Solution from "./Solution";

const SolutionSection = () => {
  const [solutionsData, setSolutionsData] = useState({});
  const [solutionsList, setSolutionsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    fetch("/organizedSolutions.json")
      .then((res) => res.json())
      .then((data) => {
        setSolutionsData(data);
        // Flatten all solutions into a single list
        const allSolutions = Object.values(data).flat();
        setSolutionsList(allSolutions);
      })
      .catch((err) => console.error("Failed to fetch solutions data:", err));
  }, []);

  // Filter solutions based on the search query
  const filteredSolutions = solutionsList.filter((solution) => {
    const query = searchQuery.toLowerCase();
    return (
      solution.name.toLowerCase().includes(query) ||
      solution.number.toString().includes(query) ||
      solution.application.toLowerCase().includes(query)
    );
  });

  return (
    <article className="mt-10 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          LeetCode Solutions
        </h1>
        <span className="mt-2 inline-block">
          Explore various solutions to LeetCode problems with detailed explanations.
        </span>
      </div>

      {/* Search input */}
      <div className="mt-5 px-5 sm:px-10 md:px-24 sxl:px-32">
        <input
          type="text"
          placeholder="Search by name, number, or application..."
          className="w-full p-2 border rounded-md shadow-sm dark:bg-gray-800 dark:text-light"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display solutions or empty screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:px-32 px-5 sm:px-10 md:px-24">
        {searchQuery === "" ? (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-1 lg:col-span-2">
            Start typing to search for solutions.
          </p>
        ) : filteredSolutions.length > 0 ? (
          filteredSolutions.map((solution, index) => (
            <Link href={solution.solutionLink} key={index} className="col-span-1 row-span-1">
              <Solution solution={solution} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-1 lg:col-span-2">
            No solutions match your search query.
          </p>
        )}
      </div>
    </article>
  );
};

export default SolutionSection;
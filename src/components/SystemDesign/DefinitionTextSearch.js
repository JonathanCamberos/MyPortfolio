"use client";

import { useState, useEffect } from "react";
import DefinitionCard from "./DefinitionDisplay";

const DefinitionSearch = () => {
  const [definitionMapping, setDefinitionMapping] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDefinition, setSelectedDefinition] = useState(null);

  // Fetch definitions JSON
  useEffect(() => {
    fetch("/generatedDB/systemDesignDefinitions.json")
      .then((res) => res.json())
      .then((data) => setDefinitionMapping(data))
      .catch((err) =>
        console.error("Failed to fetch system design definitions:", err)
      );
  }, []);

  // Filter keys based on search query or show all if query is "all"
  const filteredKeys = searchQuery
    ? searchQuery.toLowerCase() === "all"
      ? Object.keys(definitionMapping) // show all
      : Object.keys(definitionMapping).filter((key) =>
          key.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : []; // show nothing if empty


  const handleButtonClick = (key) => {
    setSelectedDefinition(definitionMapping[key]);
  };

  return (
    <article className="mt-10 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-3xl lg:text-3xl">
          Search System Design Definitions
        </h1>
        <span className="mt-2 inline-block">
          Find system design topics and view definitions.
        </span>
      </div>

      <div className="mt-5 px-5 sm:px-10 md:px-24 sxl:px-32">
        <input
          type="text"
          placeholder="'All' or search definitions..."
          className="w-full p-2 border rounded-md shadow-sm bg-light dark:bg-dark text-dark dark:text-light dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10 min-h-[60px]">
        {filteredKeys.length > 0 ? (
          filteredKeys.map((key, index) => {
            const isSelected = selectedDefinition?.name === key;

            const baseClass = isSelected
              ? "bg-dark text-light dark:bg-light dark:text-dark"
              : "bg-white dark:bg-dark text-gray-800 dark:text-light";

            return (
              <button
                key={index}
                className={`${baseClass} py-1.5 md:py-2 px-6 md:px-10 rounded-full border-2 border-solid border-dark dark:border-light transition-all ease duration-200 m-2`}
                onClick={() => handleButtonClick(key)}
              >
                {key}
              </button>
            );
          })
        ) : searchQuery ? (
          <p className="text-center text-gray-500 dark:text-gray-400 w-full m-2">
            No results found.
          </p>
        ) : (
          <div className="w-full h-10"></div>
        )}
      </div>

      {/* Display only selected definition */}
      {selectedDefinition && <DefinitionCard definition={selectedDefinition} />}
    </article>
  );
};

export default DefinitionSearch;

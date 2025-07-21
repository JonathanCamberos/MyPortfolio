"use client";

import { useState, useEffect } from "react";
import ApplicationButton from "./ApplicationButton";  // Buttons
import Application from "./Application";    // Card display
import Link from "next/link";

const ApplicationSection = () => {
  // useCase categories
  const useCaseCategories = ["all", "array", "hashmap", "stack", "two-pointers", "binary-search", "sliding-window"];

  const [useCasesData, setUseCasesData] = useState({});
  const [filteredUseCases, setFilteredUseCases] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetch("/generatedDB/topicApplications.json")
      .then((res) => res.json())
      .then((data) => {
        setUseCasesData(data);
        setFilteredUseCases([]); // empty until user selects a category
      })
      .catch((err) => console.error("Failed to fetch topicApplications data:", err));
  }, []);

  const handleCategoryChange = (category) => {
    if (currentCategory === category) {
      setCurrentCategory(null);
      setFilteredUseCases([]);
      return;
    }

    setCurrentCategory(category);

    if (category === "all") {
      // flatten all useCases into one list, sort by title
      const allUseCases = Object.values(useCasesData).flat();
      const sorted = allUseCases.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setFilteredUseCases(sorted);
    } else if (useCasesData[category]) {
      setFilteredUseCases(useCasesData[category]);
    } else {
      setFilteredUseCases([]);
    }
  };

  return (
    <article className="mt-10 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-3xl lg:text-3xl">
          DSA Application
        </h1>
        <span className="mt-2 inline-block">
          Possible applications for a data structure.
        </span>
      </div>

      {/* Category buttons */}
      <ApplicationButton
        useCases={useCaseCategories}
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Display filtered use cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:px-32 px-5 sm:px-10 md:px-24">
        {filteredUseCases.length > 0 ? (
          filteredUseCases.map((useCase, index) => (
            <Link href={useCase.useCaseLink} key={index} className="col-span-1 row-span-1">
              <Application useCase={useCase} />
            </Link>
          ))
        ) : (
          <p className="mt-0">
          </p>
        )}
      </div>
    </article>
  );
};

export default ApplicationSection;

"use client";

import { useState, useEffect } from "react";
import UseCases from "./UseCases";  // Buttons
import UseCase from "./UseCase";    // Card display
import Link from "next/link";

const UseCaseSection = () => {
  // useCase categories
  const useCaseCategories = ["all", "hashmap", "stack", "twopointers"];

  const [useCasesData, setUseCasesData] = useState({});
  const [filteredUseCases, setFilteredUseCases] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    fetch("/useCases.json")
      .then((res) => res.json())
      .then((data) => {
        setUseCasesData(data);
        setFilteredUseCases([]); // empty until user selects a category
      })
      .catch((err) => console.error("Failed to fetch useCases data:", err));
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
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          Search by Use Case
        </h1>
        <span className="mt-2 inline-block">
          Filter use cases by category.
        </span>
      </div>

      {/* Category buttons */}
      <UseCases
        useCases={useCaseCategories}
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Display filtered use cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:px-32 px-5 sm:px-10 md:px-24">
        {filteredUseCases.length > 0 ? (
          filteredUseCases.map((useCase, index) => (
            <Link
              href={`/blogs/${useCase.title
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .replace(/\s+/g, "-")}`}
              key={index}
              className="col-span-1 row-span-1"
            >
              <UseCase useCase={useCase} />
            </Link>
          ))
        ) : (
          <p className="mt-8 text-center w-full col-span-full text-gray-600 dark:text-gray-400">
            {currentCategory
              ? `No use cases found for ${currentCategory} category.`
              : ""}
          </p>
        )}
      </div>
    </article>
  );
};

export default UseCaseSection;

"use client";

import { useState, useEffect } from "react";
import Solution from "./SolutionDisplay";
import HorizontalQuestion from "./SolutionIntroBox";


const SolutionTextSearch = () => {
  const [questionMapping, setQuestionMapping] = useState({});
  const [allSolutions, setAllSolutions] = useState({});
  const [warmnessData, setWarmnessData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSolutions, setSelectedSolutions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Dummy state to force re-render on dark mode toggle
  const [dummy, setDummy] = useState(false);

  useEffect(() => {
    const handler = () => setDummy((prev) => !prev);
    document.addEventListener("darkModeToggled", handler);
    return () => document.removeEventListener("darkModeToggled", handler);
  }, []);

  // Fetch question mappings, solutions, and warmness data
  useEffect(() => {
    fetch("/generatedDB/queryQuestionNumString.json")
      .then((res) => res.json())
      .then((data) => setQuestionMapping(data))
      .catch((err) =>
        console.error("Failed to fetch queryQuestionNumString data:", err)
      );

    fetch("/generatedDB/questionNumAllSolutions.json")
      .then((res) => res.json())
      .then((data) => setAllSolutions(data))
      .catch((err) =>
        console.error("Failed to fetch questionNumAllSolutions data:", err)
      );

    fetch("/generatedDB/allQuestionWarmness.json")
      .then((res) => res.json())
      .then((data) => setWarmnessData(data))
      .catch((err) =>
        console.error("Failed to fetch allQuestionWarmness data:", err)
      );
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSelectedSolutions([]);
      setSelectedQuestion(null);
    }
  }, [searchQuery]);

  // Update isDarkMode state on dummy toggle (dark mode change)
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    setIsDarkMode(
      typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    );
  }, [dummy]);

  const filteredQuestions =
    searchQuery.toLowerCase() === "all"
      ? Object.keys(questionMapping) // return all questions if "all"
      : Object.keys(questionMapping).filter((key) =>
          key.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const fetchQuestionDetails = (questionNumber) => {
    fetch(`/generatedDB/allQuestionNum.json`)
      .then((res) => res.json())
      .then((data) => {
        const questionDetails = data[questionNumber];
        if (questionDetails) {
          setSelectedQuestion(questionDetails);
        }
      })
      .catch((err) =>
        console.error(`Failed to fetch details for question ${questionNumber}:`, err)
      );
  };

  const handleButtonClick = (questionTitle) => {
    const questionNumber = questionMapping[questionTitle];
    if (!questionNumber) return;

    if (
      selectedSolutions.length > 0 &&
      selectedSolutions[0].questionNumber === questionNumber
    ) {
      setSelectedSolutions([]);
      setSelectedQuestion(null);
    } else {
      const solutions = allSolutions[questionNumber] || [];

      const sortedSolutions = solutions.sort((a, b) => a.number - b.number);
      setSelectedSolutions(sortedSolutions);
      fetchQuestionDetails(questionNumber);
    }
  };

  // Map coldnessCount to Tailwind background/text classes
const getColdnessClass = (coldnessCount, isSelected) => {
  // White background for null, undefined, -1 (no submissions), or >30 (too cold)
  if (!coldnessCount || coldnessCount === -1 || coldnessCount > 30) {
      return "bg-white dark:bg-dark text-gray-800 dark:text-white";
  }

  // Map coldnessCount 1-30 to 5 ranges (~6 units each, dark to light)
  if (coldnessCount <= 6) {
    return "bg-orange-600 dark:bg-yellow-500 text-white dark:text-black";
  } else if (coldnessCount <= 12) {
    return "bg-orange-500 dark:bg-yellow-400 text-white dark:text-black";
  } else if (coldnessCount <= 18) {
    return "bg-orange-400 dark:bg-yellow-300 text-white dark:text-black";
  } else if (coldnessCount <= 24) {
    return "bg-orange-300 dark:bg-yellow-200 text-gray-900 dark:text-black";
  } else {
    return "bg-orange-200 dark:bg-yellow-100 text-gray-900 dark:text-black";
  }
};


  return (
    <article className="mt-10 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-3xl lg:text-3xl">
          Search LeetCode Questions
        </h1>
        <span className="mt-2 inline-block">
          Find questions by title or number and compare solutions.
        </span>
      </div>

      <div className="mt-5 px-5 sm:px-10 md:px-24 sxl:px-32">
        <input
          type="text"
          placeholder="'All' or Search by title or number..."
          className="w-full p-2 border rounded-md shadow-sm bg-light dark:bg-dark text-dark dark:bg-gray-800 dark:text-light dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10 min-h-[60px]">
        {searchQuery !== "" ? (
          filteredQuestions.length > 0 ? (
            filteredQuestions.map((key, index) => {
              const questionNumber = questionMapping[key];
              const coldnessCount = warmnessData[questionNumber]?.coldnessCount || 0;
              const isSelected =
                selectedSolutions.length > 0 &&
                questionMapping[key] === selectedSolutions[0].questionNumber;

              const baseClass = isSelected
                ? "bg-dark text-light dark:bg-light dark:text-dark"
                : getColdnessClass(coldnessCount, isSelected);

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
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 w-full m-2">
              No results found. Try a different search term.
            </p>
          )
        ) : (
          <div className="w-full h-10"></div>
        )}
      </div>

      {selectedQuestion && (
        <div className="mt-10 px-5 sm:px-10 md:px-24 sxl:px-32">
          <HorizontalQuestion question={selectedQuestion} />
        </div>
      )}
      {selectedSolutions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 px-5 sm:px-10 md:px-24 sxl:px-32">
          {selectedSolutions.map((solution, idx) => (
            <Solution key={idx} solution={solution} />
          ))}
        </div>
      )}
    </article>
  );
};

export default SolutionTextSearch;
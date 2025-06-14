"use client";

import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const SolutionCard = ({ solution }) => (
  <div className="group border p-4 rounded-md shadow-md hover:scale-105 transition-all ease duration-200 bg-light dark:bg-dark border-dark dark:border-light">
    <h2 className="font-bold text-lg sm:text-xl">
      <span
        className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50
            dark:to-accentDark/50
            bg-[length:0px_6px]
            group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
      >
        {solution.type}: {solution.name}
      </span>
    </h2>
    <p className="text-sm text-gray-500 mt-2">
      <span className="text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
        Application:
      </span>{" "}
      {solution.application}
    </p>
    <p className="mt-2">
      <span className="text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
        Blog:
      </span>{" "}
      <a
        href={solution.blog}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600 hover:text-blue-800"
      >
        {solution.blog}
      </a>
    </p>
    <div
      className="mt-2 p-2 rounded overflow-x-auto"
      style={{ backgroundColor: "#2D2D2D" }}
    >
      <SyntaxHighlighter
        language="python"
        style={dracula}
        customStyle={{
          background: "transparent",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          color: "#FFFFFF",
        }}
      >
        {solution.code}
      </SyntaxHighlighter>
    </div>
  </div>
);

const SolutionSection = () => {
  const [questionMapping, setQuestionMapping] = useState({});
  const [allSolutions, setAllSolutions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSolutions, setSelectedSolutions] = useState([]);

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
  }, []);

  // Clear selected solutions if search is empty
  useEffect(() => {
    if (searchQuery === "") {
      setSelectedSolutions([]);
    }
  }, [searchQuery]);

  // Filter question titles by search
  const filteredQuestions = Object.keys(questionMapping).filter((key) =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleButtonClick = (questionTitle) => {
    const questionNumber = questionMapping[questionTitle];
    if (!questionNumber) return;

    // Toggle behavior: if already selected, deselect
    if (
      selectedSolutions.length > 0 &&
      selectedSolutions[0].questionNumber === questionNumber
    ) {
      setSelectedSolutions([]);
    } else {
      // Show all solutions for this question number
      const solutions = allSolutions[questionNumber] || [];
      setSelectedSolutions(solutions);
    }
  };

  return (
    <article className="mt-10 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          Search LeetCode Questions
        </h1>
        <span className="mt-2 inline-block">Find questions by title or number. Compare Solutions.</span>
      </div>

      {/* Search input */}
      <div className="mt-5 px-5 sm:px-10 md:px-24 sxl:px-32">
        <input
          type="text"
          placeholder="Search by title or number..."
          className="w-full p-2 border rounded-md shadow-sm dark:bg-gray-800 dark:text-light"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Buttons container with border lines - always visible */}
      <div className="px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10 min-h-[60px]">
        {searchQuery !== "" ? (
          filteredQuestions.length > 0 ? (
            filteredQuestions.map((key, index) => (
              <button
                key={index}
                className={`py-1.5 md:py-2 px-6 md:px-10 rounded-full border-2 border-solid border-dark dark:border-light transition-all ease duration-200 m-2 ${
                  selectedSolutions.length > 0 &&
                  questionMapping[key] === selectedSolutions[0].questionNumber
                    ? "bg-dark text-light dark:bg-light dark:text-dark"
                    : "bg-light text-dark dark:bg-dark dark:text-light"
                }`}
                onClick={() => handleButtonClick(key)}
              >
                {key}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 w-full m-2">
              No results found. Try a different search term.
            </p>
          )
        ) : (
          // Empty placeholder to maintain height so borders don't collapse
          <div className="w-full h-10"></div>
        )}
      </div>


      {/* Display all selected solutions */}
      {selectedSolutions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 px-5 sm:px-10 md:px-24 sxl:px-32">
          {selectedSolutions.map((solution, idx) => (
            <SolutionCard key={idx} solution={solution} />
          ))}
        </div>
      )}
    </article>
  );
};

export default SolutionSection;
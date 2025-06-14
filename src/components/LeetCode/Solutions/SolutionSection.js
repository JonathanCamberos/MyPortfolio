"use client";

import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Solution from "./Solution";
import HorizontalQuestion from "./HorizontalQuestion";


const SolutionSection = () => {
  const [questionMapping, setQuestionMapping] = useState({});
  const [allSolutions, setAllSolutions] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSolutions, setSelectedSolutions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Fetch question mappings and solutions
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

  useEffect(() => {
    if (searchQuery === "") {
      setSelectedSolutions([]);
      setSelectedQuestion(null);
    }
  }, [searchQuery]);

  const filteredQuestions = Object.keys(questionMapping).filter((key) =>
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

      const sortedSolutions = solutions.sort(
        (a, b) => a.number - b.number);
      setSelectedSolutions(sortedSolutions);
      fetchQuestionDetails(questionNumber);
    }
  };

  return (
    <article className="mt-10 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-3xl lg:text-3xl">
          Search LeetCode Questions
        </h1>
        <span className="mt-2 inline-block">Find questions by title or number and compare solutions.</span>
      </div>

      <div className="mt-5 px-5 sm:px-10 md:px-24 sxl:px-32">
        <input
          type="text"
          placeholder="Search by title or number..."
          className="w-full p-2 border rounded-md shadow-sm bg-light dark:bg-dark text-dark dark:bg-gray-800 dark:text-light dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

      </div>

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
            // <SolutionCard key={idx} solution={solution} />

          ))}
        </div>
      )}
    </article>
  );
};

export default SolutionSection;
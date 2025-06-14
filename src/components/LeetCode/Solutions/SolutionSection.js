"use client";
import { useState, useEffect } from "react";

const SolutionSection = () => {
  const [questionMapping, setQuestionMapping] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    fetch("/generatedDB/queryQuestionNumString.json")
      .then((res) => res.json())
      .then((data) => setQuestionMapping(data))
      .catch((err) =>
        console.error("Failed to fetch queryQuestionNumString data:", err)
      );
  }, []);

  // Clear selected question if searchQuery is emptied
  useEffect(() => {
    if (searchQuery === "") {
      setSelectedQuestion(null);
    }
  }, [searchQuery]);

  const filteredQuestions = Object.keys(questionMapping).filter((key) =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleButtonClick = (question) => {
    setSelectedQuestion(selectedQuestion === question ? null : question);
  };

  return (
    <article className="mt-10 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          Search LeetCode Questions
        </h1>
        <span className="mt-2 inline-block">
          Find questions by title or number.
        </span>
      </div>

      <div className="mt-5 px-5 sm:px-10 md:px-24 sxl:px-32">
        <input
          type="text"
          placeholder="Search by title or number..."
          className="w-full p-2 border rounded-md shadow-sm dark:bg-gray-800 dark:text-light"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery !== "" && (
        <div className="px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((key, index) => (
              <button
                key={index}
                className={`py-1.5 md:py-2 px-6 md:px-10 rounded-full border-2 border-solid border-dark dark:border-light transition-all ease duration-200 m-2 ${
                  selectedQuestion === key
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
          )}
        </div>
      )}

      {selectedQuestion && (
        <div className="px-5 sm:px-10 md:px-24 sxl:px-32 mt-10">
          <div className="p-4 border rounded-lg bg-light dark:bg-dark border-dark dark:border-light">
            <p className="font-semibold">{selectedQuestion}</p>
            <p>Question Number: {questionMapping[selectedQuestion]}</p>
          </div>
        </div>
      )}
    </article>
  );
};

export default SolutionSection;
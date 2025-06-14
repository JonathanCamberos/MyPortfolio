"use client";

import { useState, useEffect } from "react";
import Difficulties from "./DifficultyButton";
import Question from "../Question";
import Link from "next/link";

const DifficultySection = () => {
  const difficulties = ["all", "easy", "medium", "hard"];
  const [questions, setQuestions] = useState({});
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentDifficulty, setCurrentDifficulty] = useState(null); // Active difficulty

  useEffect(() => {
    // Fetch questions data from your source
    fetch("/generatedDB/questions.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setFilteredQuestions([]); // Initially empty until a difficulty is selected
      })
      .catch((err) => console.error("Failed to fetch questions data:", err));
  }, []);

  const handleDifficultyChange = (difficulty) => {
    if (currentDifficulty === difficulty) {
      // Toggle off when clicking the same difficulty
      setCurrentDifficulty(null);
      setFilteredQuestions([]);
    } else {
      setCurrentDifficulty(difficulty);

      if (difficulty === "all") {
        // Show all questions sorted by questionNum
        const sortedQuestions = Object.values(questions).sort(
          (a, b) => a.questionNum - b.questionNum
        );
        setFilteredQuestions(sortedQuestions);
      } else {
        // Filter questions by difficulty
        const filtered = Object.values(questions).filter(
          (question) =>
            question.questionDifficulty.toLowerCase() ===
            difficulty.toLowerCase()
        );
        // Sort filtered questions by questionNum
        const sortedFiltered = filtered.sort(
          (a, b) => a.questionNum - b.questionNum
        );
        setFilteredQuestions(sortedFiltered);
      }
    }
  };

  return (
    <article className="mt-10 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          Search by Difficulty
        </h1>
        <span className="mt-2 inline-block">
          Filter questions based on difficulty level.
        </span>
      </div>

      {/* Difficulty buttons */}
      <Difficulties
        difficulties={difficulties}
        currentDifficulty={currentDifficulty}
        onDifficultyChange={handleDifficultyChange}
      />

      {/* Display filtered questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:px-32 px-5 sm:px-10 md:px-24">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <Link
              href={question.questionLink}
              key={question.questionNum}
              className="col-span-1 row-span-1"
            >
              <Question question={question} />
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

export default DifficultySection;
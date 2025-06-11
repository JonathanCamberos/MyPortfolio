import React from "react";

const Question = ({ question }) => {
  return (
    <div className="group border p-4 rounded-md shadow-md hover:scale-105 transition-all ease duration-200">
      <h2 className="font-bold text-lg sm:text-xl">
        <span
          className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50
            dark:to-accentDark/50
            bg-[length:0px_6px]
            group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
        >
          {`${question.questionNum}. ${question.questionTitle}`}
        </span>
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        Topics: {question.questionTopics.join(", ")}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Category: {question.blog.replace(/leetcode:\s*/i, "")}
      </p>
      <p className="mt-2">{question.questionBlurb}</p>
    </div>
  );
};

export default Question;
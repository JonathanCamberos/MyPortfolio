import React from "react";

const Question = ({ question }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h2 className="font-bold text-lg">{`${question.questionNum}. ${question.questionTitle}`}</h2>
      <p className="text-sm text-gray-500">Topics: {question.questionTopics.join(", ")}</p>
      <p className="mt-2">{question.questionBlurb}</p>
    </div>
  );
};

export default Question;
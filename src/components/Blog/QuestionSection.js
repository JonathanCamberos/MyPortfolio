"use client";

import { useState, useEffect } from "react";
import Topics from "./Topics";
import Question from "./Question";
import Link from "next/link";

const QuestionSection = () => {
  const [topics, setTopics] = useState(["all"]);
  const [questions, setQuestions] = useState({});
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/topicQuestions.json").then((res) => res.json()),
      fetch("/questions.json").then((res) => res.json()),
    ])
      .then(([topicsData, questionsData]) => {
        setTopics(["all", ...Object.keys(topicsData)]);
        setQuestions(questionsData);
        setFilteredQuestions([]);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  const handleTopicChange = (topic) => {
    if (activeTopic === topic) {
      setActiveTopic(null);
      setFilteredQuestions([]);
    } else {
      setActiveTopic(topic);

      if (topic === "all") {
        const sortedQuestions = Object.values(questions).sort(
          (a, b) => a.questionNum - b.questionNum
        );
        setFilteredQuestions(sortedQuestions);
      } else {
        fetch("/topicQuestions.json")
          .then((res) => res.json())
          .then((topicsData) => {
            const questionNums = topicsData[topic] || [];
            const filtered = questionNums.map((num) => questions[num]);
            const sortedQuestions = filtered.sort(
              (a, b) => a.questionNum - b.questionNum
            );
            setFilteredQuestions(sortedQuestions);
          });
      }
    }
  };

  topics.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  return (
    <article className="mt-5 flex flex-col text-dark dark:text-light">
      <div className="px-5 sm:px-10 md:px-24 sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          Search Topics
        </h1>
        <span className="mt-2 inline-block">
          Questions with solutions using certain topics, yes there are a lot :')
        </span>
      </div>

      <Topics topics={topics} currentTopic={activeTopic} onTopicChange={handleTopicChange} />

      {filteredQuestions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:px-32 px-5 sm:px-10 md:px-24">
          {filteredQuestions.map((question) => (
            <Link
              href={`/blogs/${question.blog
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s]/g, "")
                .replace(/\s+/g, "-")}#${question.questionNum}-${question.questionTitle
                .replace(/[^a-zA-Z0-9\s]/g, "")
                .replace(/\s+/g, "-")
                .toLowerCase()}---${question.questionDifficulty.toLowerCase()}`}
              key={question.questionNum}
              className="col-span-1 row-span-1"
            >
              <Question question={question} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="my-5" />
      )}
    </article>
  );
};

export default QuestionSection;

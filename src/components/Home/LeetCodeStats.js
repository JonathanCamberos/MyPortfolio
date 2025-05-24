"use client";

import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const LeetCodeStats = () => {
  const [stats, setStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
  const [sanity, setSanity] = useState("50.00%");

  const getRandomMultipleOf5 = () => {
    const min = 3; // 15/5
    const max = 18; // 90/5
    const randomMultiple = Math.floor(Math.random() * (max - min + 1)) + min;
    return (randomMultiple * 5).toFixed(2) + "%";
  };

  useEffect(() => {
    fetch("/leetcodeStats.json")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSanity(getRandomMultipleOf5());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md font-mono text-sm">
      <p>
        <span className="text-pink-400">#leetcode_solved</span> &#123;
      </p>
      <p className="ml-4">
        <span className="text-green-400">easy</span>:{" "}
        <span className="text-blue-300">{stats.easy};</span>
      </p>
      <p className="ml-4">
        <span className="text-yellow-400">medium</span>:{" "}
        <span className="text-blue-300">{stats.medium};</span>
      </p>
      <p className="ml-4">
        <span className="text-red-400">hard</span>:{" "}
        <span className="text-blue-300">{stats.hard};</span>
      </p>
      <p className="ml-4">
        <span className="text-purple-400">sanity</span>:{" "}
        <span className="text-blue-300">
          <TypeAnimation
            key={sanity}
            sequence={[sanity]}
            wrapper="span"
            cursor={true}
            repeat={0}
            speed={300}
          />
        </span>
        ;
      </p>
      <p>&#125;</p>
    </div>
  );
};

export default LeetCodeStats;
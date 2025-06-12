"use client";

import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

const LeetCodeStats = () => {
  const [stats, setStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
  const sanityOptions = [
    "15.00%;", "20.00%;", "25.00%;", "30.00%;", "35.00%;", "40.00%;", "45.00%;",
    "50.00%;", "55.00%;", "60.00%;", "65.00%;", "70.00%;", "75.00%;", "80.00%;",
    "85.00%;", "90.00%;", "95.00%;",
  ];
  

  const getRandomSanity = () => {
    const randomIndex = Math.floor(Math.random() * sanityOptions.length);
    return sanityOptions[randomIndex];
  };

  const [sanity, setSanity] = useState("95.00%;");

  useEffect(() => {
    fetch("/LeetCodeStats.json")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSanity = getRandomSanity();
      setSanity(newSanity);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="p-4 bg-gray-800 dark:text-white rounded-md font-mono text-sm md:translate-x-0 sm:translate-x-20 translate-x-20">
      <p>
        <span className="text-pink-500 dark:text-pink-400">#python3_leetcode_solved</span> &#123;
      </p>
      <p className="ml-4">
        <span className="text-green-600 dark:text-green-400">easy</span>:{" "}
        <span className="text-blue-500 dark:text-blue-300">{stats.easy};</span>
      </p>
      <p className="ml-4">
        <span className="text-yellow-500 dark:text-yellow-400">medium</span>:{" "}
        <span className="text-blue-500 dark:text-blue-300">{stats.medium};</span>
      </p>
      <p className="ml-4">
        <span className="text-red-600 dark:text-red-400">hard</span>:{" "}
        <span className="text-blue-500 dark:text-blue-300">{stats.hard};</span>
      </p>
      <p className="ml-4">
        <span className="text-purple-600 dark:text-purple-400">sanity</span>:{" "}
        <span className="text-blue-500 dark:text-blue-300">
          <TypeAnimation
            key={sanity} // Ensure animation re-runs when sanity changes
            sequence={[
              sanity, // Type the current value
              2000,   // Wait for 2 seconds
              "",     // Delete the text
              500,    // Pause before typing the next value
            ]}
            wrapper="span"
            cursor={true}
            repeat={0} // Do not repeat a single animation
            speed={75}
            deletionSpeed={50}
          />
        </span>
        
      </p>
      <p>&#125;</p>
    </div>
  );
};

export default LeetCodeStats;
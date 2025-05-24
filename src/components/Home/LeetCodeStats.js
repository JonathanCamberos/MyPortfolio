"use client";

import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


// Register the required components/scales
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const LeetCodeStats = () => {
    const [stats, setStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
  
    useEffect(() => {
      fetch("/leetcodeStats.json")
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error("Failed to fetch stats:", err));
    }, []);
  
    const data = {
      labels: ["Easy", "Medium", "Hard"],
      datasets: [
        {
          label: "LeetCode Questions",
          data: [stats.easy, stats.medium, stats.hard],
          backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">LeetCode Progress</h2>
        <Bar data={data} options={options} />
        <p className="mt-4">Total Questions Solved: {stats.total}</p>
      </div>
    );
  };
  
  export default LeetCodeStats;
"use client";

import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";


// Register the required components/scales
ChartJS.register(ArcElement, Tooltip, Legend);

const LeetCodeStats = () => {
    const [stats, setStats] = useState({ total: 0, easy: 0, medium: 0, hard: 0 });
  
    useEffect(() => {
      fetch("/leetcodeStats.json")
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error("Failed to fetch stats:", err));
    }, []);
  
    // Dummy total questions per category - replace with actual totals if needed
    const totalPerCategory = { easy: 50, medium: 30, hard: 20 };
  
    const data = {
      labels: ["Easy", "Medium", "Hard"],
      datasets: [
        {
          label: "Easy",
          data: [stats.easy, totalPerCategory.easy - stats.easy],
          backgroundColor: ["#4CAF50", "#E0F2E9"],
          borderWidth: 1,
          circumference: 360,
          rotation: -90,
          cutout: "80%",
        },
        {
          label: "Medium",
          data: [stats.medium, totalPerCategory.medium - stats.medium],
          backgroundColor: ["#FFC107", "#FFF8E1"],
          borderWidth: 1,
          circumference: 360,
          rotation: -90,
          cutout: "60%",
        },
        {
          label: "Hard",
          data: [stats.hard, totalPerCategory.hard - stats.hard],
          backgroundColor: ["#F44336", "#FFEBEE"],
          borderWidth: 1,
          circumference: 360,
          rotation: -90,
          cutout: "40%",
        },
      ],
    };
  
    const options = {
      responsive: true,
      cutout: "90%",
      plugins: {
        legend: {
          display: false, // Remove the legend
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || "";
              const value = context.parsed;
              if (value === 0) return null;
              return `${label}: ${value}`;
            },
          },
        },
      },
    };
  
    return (
      <div className="p-4 max-w-sm mx-auto dark:text-light">
        <h2 className="text-xl font-bold mb-4 text-center">LeetCode Progress</h2>
        <Doughnut data={data} options={options} />
        <p className="mt-4 text-center text-lg font-semibold">
          Total Questions Solved: {stats.total}
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <span className="font-bold text-sm" style={{ color: "#4CAF50" }}>
            Easy: {stats.easy}
          </span>
          <span className="font-bold text-sm" style={{ color: "#FFC107" }}>
            Medium: {stats.medium}
          </span>
          <span className="font-bold text-sm" style={{ color: "#F44336" }}>
            Hard: {stats.hard}
          </span>
        </div>
      </div>
    );
  };
  
  export default LeetCodeStats;
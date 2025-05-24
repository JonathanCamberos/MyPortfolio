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
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
      fetch("/leetcodeStats.json")
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error("Failed to fetch stats:", err));
  
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }, []);
  
    const totalPerCategory = { easy: 50, medium: 30, hard: 20 };
  
    // Define light & dark mode background colors for the non-filled slice
    const bgColorsLight = {
      easy: "#E0F2E9",
      medium: "#FFF8E1",
      hard: "#FFEBEE",
    };
  
    const bgColorsDark = {
      easy: "#264d2e",   // darker green background
      medium: "#665900", // darker amber background
      hard: "#5a1210",   // darker red background
    };
  
    const data = {
      labels: ["Easy", "Medium", "Hard"],
      datasets: [
        {
          label: "Easy",
          data: [stats.easy, totalPerCategory.easy - stats.easy],
          backgroundColor: [
            "#4CAF50",
            isDarkMode ? bgColorsDark.easy : bgColorsLight.easy,
          ],
          borderWidth: 1,
          circumference: 360,
          rotation: -90,
          cutout: "80%",
        },
        {
          label: "Medium",
          data: [stats.medium, totalPerCategory.medium - stats.medium],
          backgroundColor: [
            "#FFC107",
            isDarkMode ? bgColorsDark.medium : bgColorsLight.medium,
          ],
          borderWidth: 1,
          circumference: 360,
          rotation: -90,
          cutout: "60%",
        },
        {
          label: "Hard",
          data: [stats.hard, totalPerCategory.hard - stats.hard],
          backgroundColor: [
            "#F44336",
            isDarkMode ? bgColorsDark.hard : bgColorsLight.hard,
          ],
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
          position: "bottom",
          labels: {
            boxWidth: 15,
            padding: 15,
            generateLabels: (chart) => {
              return chart.data.datasets.map((dataset, i) => ({
                text: dataset.label,
                fillStyle: dataset.backgroundColor[0],
                strokeStyle: dataset.backgroundColor[0],
                lineWidth: 1,
                hidden: false,
                index: i,
              }));
            },
          },
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
      <div className="p-4 max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">LeetCode Progress</h2>
        <Doughnut data={data} options={options} />
        <p className="mt-4 text-center text-lg font-semibold">
          Total Questions Solved: {stats.total}
        </p>
      </div>
    );
  };
  
  export default LeetCodeStats;
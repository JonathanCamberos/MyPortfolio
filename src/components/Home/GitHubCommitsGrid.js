import React from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weeksPerMonth = [4, 4, 5, 4, 5, 4, 4, 5, 4, 5, 4, 5];
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getColor = (count) => {
  if (count === 0) return "#ebedf0";
  if (count === 1) return "#9be9a8";
  if (count <= 3) return "#40c463";
  if (count <= 6) return "#30a14e";
  return "#216e39";
};

const commitData = Array.from({ length: 53 }, () =>
  Array(7).fill(0)
);

const Month = ({ name, weeks, startWeek }) => {
  const weekBoxWidth = 12;
  const weekGap = 4;

  const monthWidth = weeks * (weekBoxWidth + weekGap) - weekGap;

  const monthWeeks = commitData.slice(startWeek, startWeek + weeks);

  return (
    <div style={{ width: monthWidth, marginRight: 8 /* space between months */ }}>
      <div style={{ textAlign: "center", fontSize: 12, color: "#4B5563" }}>
        {name}
      </div>

      <div className="flex space-x-1 mt-1">
        {monthWeeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col space-y-1">
            {week.map((count, dayIdx) => (
              <div
                key={dayIdx}
                className="rounded-sm cursor-default"
                style={{
                  width: weekBoxWidth,
                  height: weekBoxWidth,
                  backgroundColor: getColor(count),
                }}
                title={`0 commits, week ${startWeek + weekIdx + 1}, ${days[dayIdx]}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const GitHubCommitsGrid = () => {
  return (
    <div className="overflow-x-auto p-4 max-w-full bg-white dark:bg-gray-900 rounded-md shadow-md">
  <div className="flex" style={{ alignItems: "flex-start" }}>
    {/* Days column fixed width, sticky on left */}
    <div
      className="flex flex-col mr-2 text-xs text-gray-600 dark:text-gray-400 select-none"
      style={{
        width: 40,
        height: 140,
        justifyContent: "space-between",
        paddingTop: 22,
        position: "sticky",
        left: 0,
        backgroundColor: "inherit", // or explicit white/dark bg
        zIndex: 10,
      }}
    >
      {days.map((day, idx) => (
        <span key={idx}>{day}</span>
      ))}
    </div>

    {/* Months container */}
    <div
      className="flex"
      style={{
        flexWrap: "nowrap",
        gap: 8,
      }}
    >
      {monthNames.map((month, idx) => (
        <Month
          key={month}
          name={month}
          weeks={weeksPerMonth[idx]}
          startWeek={weeksPerMonth.slice(0, idx).reduce((a, b) => a + b, 0)}
        />
      ))}
    </div>
  </div>
</div>
  );
};

export default GitHubCommitsGrid;
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Solution = ({ solution }) => {
  return (
    <div className="group border p-4 rounded-md shadow-md hover:scale-105 transition-all ease duration-200">
      {/* Display question number and name */}
      <h2 className="font-bold text-lg sm:text-xl">
        <span
          className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50
            dark:to-accentDark/50
            bg-[length:0px_6px]
            group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
        >
          {`#${solution.questionNumber} - ${solution.name}`}
        </span>
      </h2>

      {/* Display application */}
      <p className="text-sm text-gray-500 mt-2">
        <span className="text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          Application:
        </span>{" "}
        {solution.application}
      </p>

      {/* Display blog */}
      <p className="text-sm text-gray-500 mt-2">
        <span className="text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          Blog:
        </span>{" "}
        {solution.blog}
      </p>

      {/* Display code */}
      <div className="mt-2 p-2 rounded overflow-x-auto" style={{ backgroundColor: "#2D2D2D" }}>
        <SyntaxHighlighter
          language="python"
          style={dracula}
          customStyle={{
            background: "transparent",
            fontSize: "0.9rem",
            lineHeight: "1.5",
            color: "#FFFFFF",
          }}
        >
          {solution.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Solution;
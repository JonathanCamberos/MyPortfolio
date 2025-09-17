import Link from "next/link";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";


const Solution = ({ solution }) => {
  return (
    <div className="group border p-4 rounded-md shadow-md hover:scale-100 transition-all ease duration-200">
      
      {/* Display question number and name */}
      <h2 className="font-bold text-lg sm:text-xl">
        <Link
          href={solution.solutionLink}
          className="hover:text-orange-500 hover:dark:text-accentDark transition-colors duration-300"
        >
          {`Solution ${solution.number}. ${solution.name}`}
        </Link>
      </h2>

      {/* Display application */}
      <p className="text-sm text-gray-500 mt-2">
        <span className="text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          Application:
        </span>{" "}
        {solution.application}
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
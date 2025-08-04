import Link from "next/link";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const Application = ({ useCase }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      {/* Only the title text is clickable */}
      <h2 className="font-bold text-lg sm:text-xl">
        <Link
          href={useCase.useCaseLink}
          className="hover:text-orange-500 dark:hover:text-accentDark transition-colors duration-300"
        >
          {`${useCase.type}: ${useCase.title}`}
        </Link>
      </h2>

      <p className="text-sm text-gray-500 mt-2">
        <span className="text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          Summary:
        </span>{" "}
        {useCase.summary}
      </p>

      <p className="mt-2">
        <span className="text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          Example:
        </span>{" "}
        {useCase.exampleIntro}
      </p>

      <div
        className="mt-2 p-2 rounded overflow-x-auto"
        style={{ backgroundColor: "#2D2D2D" }}
      >
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
          {useCase.codeExample}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default Application;
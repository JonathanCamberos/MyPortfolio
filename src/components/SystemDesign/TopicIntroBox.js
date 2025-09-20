import Link from "next/link";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const TopicIntroBox = ({ concept, intro }) => {
  if (!intro) return null;

  return (
    <div className="group border p-4 rounded-md shadow-md bg-light dark:bg-dark border-dark dark:border-light transition-all ease duration-200">
      {/* Centering both title and body */}
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-lg sm:text-xl mb-2">
          <Link
            href={intro.definitionLink}
            className="hover:text-orange-500 dark:hover:text-accentDark transition-colors duration-300"
          >
            {concept}
          </Link>
        </h2>

        {/* Text part */}
        {intro.bodyString && (
          <div className="text-gray-700 dark:text-gray-300 space-y-2 whitespace-pre-wrap max-w-[700px] text-left">
            {intro.bodyString}
          </div>
        )}

        {/* Code part */}
        {intro.bodyCode && (
          <div
            className="mt-2 p-2 rounded overflow-x-auto max-w-[700px] w-full"
            style={{ backgroundColor: "#2D2D2D" }}
          >
            <SyntaxHighlighter
              language={intro.bodyCodeLanguage || "text"}
              style={coldarkDark}
              customStyle={{
                background: "transparent",
                fontSize: "0.9rem",
                lineHeight: "1.5",
                color: "#FFFFFF",
              }}
            >
              {intro.bodyCode}
            </SyntaxHighlighter>
          </div>
        )}
      </div>

      {/* Diagram list */}
      {intro.diagramList && intro.diagramList.length > 0 && (
        <div className="mt-4 space-y-4">
          {intro.diagramList.map((diagram, i) => (
            <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h3 className="font-semibold mb-1">
                <Link
                  href={diagram.diagramLink}
                  className="hover:text-orange-500 dark:hover:text-accentDark transition-colors duration-300"
                >
                  {diagram.name}
                </Link>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Related: {diagram.related}
              </p>
              <div
                className="mt-2 p-2 rounded overflow-x-auto"
                style={{ backgroundColor: "#2D2D2D" }}
              >
                <SyntaxHighlighter
                  language={diagram.language || "text"}
                  style={coldarkDark}
                  customStyle={{
                    background: "transparent",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    color: "#FFFFFF",
                  }}
                >
                  {diagram.diagram}
                </SyntaxHighlighter>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicIntroBox;
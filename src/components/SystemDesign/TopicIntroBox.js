import Link from "next/link";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

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

        <div className="text-gray-700 dark:text-gray-300 space-y-2 whitespace-pre-wrap max-w-[700px] text-left">
          {intro.body}
        </div>
      </div>

      {intro.diagramList && intro.diagramList.length > 0 && (
        <div className="mt-4 space-y-4">
          {intro.diagramList.map((diagram, i) => (
            <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800">
              <h3 className="font-semibold mb-1">
                <Link
                  href={diagram.diagramLink}
                  className="hover:text-orange-500 dark:hover:text-accentDark transition-colors duration-300"
                >
                  {diagram.name}
                </Link>
              </h3>
              Related: {diagram.related}
              <div
                className="mt-2 p-2 rounded overflow-x-auto"
                style={{ backgroundColor: "#2D2D2D" }}
              >
                <SyntaxHighlighter
                  language={diagram.language || "text"}
                  style={dracula}
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

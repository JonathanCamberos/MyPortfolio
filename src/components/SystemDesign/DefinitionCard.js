import Link from "next/link";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const DefinitionCard = ({ concept, perspectives }) => {
  if (!perspectives || perspectives.length === 0) return null;

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 px-5 sm:px-10 md:px-24 sxl:px-32">
      {perspectives.map((definition, idx) => {
        const splitBody = definition.body.split(/```(.*?)\n([\s\S]*?)```/g);

        return (
          <div
            key={idx}
            className="group border p-4 rounded-md shadow-md bg-light dark:bg-dark border-dark dark:border-light transition-all ease duration-200"
          >
            {/* Title */}
            <h2 className="font-bold text-lg sm:text-xl mb-2">
              <Link
                href={definition.definitionLink}
                className="hover:text-orange-500 dark:hover:text-accentDark transition-colors duration-300"
              >
                {concept} – Example {definition.perspectiveId}
              </Link>
            </h2>

            {/* Body */}
            <div className="text-gray-700 dark:text-gray-300 space-y-2">
              {splitBody.map((chunk, i) => {
                if (i % 3 === 1) return null; // language line
                if (i % 3 === 2) {
                  const language = splitBody[i - 1] || "text";
                  return (
                    <div
                      key={i}
                      className="mt-2 p-2 rounded overflow-x-auto"
                      style={{ backgroundColor: "#2D2D2D" }}
                    >
                      <SyntaxHighlighter
                        language={language}
                        style={dracula}
                        customStyle={{
                          background: "transparent",
                          fontSize: "0.9rem",
                          lineHeight: "1.5",
                          color: "#FFFFFF",
                        }}
                      >
                        {chunk}
                      </SyntaxHighlighter>
                    </div>
                  );
                }
                return (
                  <p key={i} className="whitespace-pre-wrap">
                    {chunk}
                  </p>
                );
              })}
            </div>

            {/* Diagrams */}
            {definition.diagramList && definition.diagramList.length > 0 && (
              <div className="mt-4 space-y-4">
                {definition.diagramList.map((diagram, i) => (
                  <div
                    key={i}
                    className=" p-3 bg-gray-50 dark:bg-gray-800"
                  >
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
                        language="python"
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
      })}
    </div>
  );
};

export default DefinitionCard;

import Link from "next/link";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const DefinitionCard = ({ definition }) => {
  if (!definition) return null;

  // Split body to detect code blocks
  const splitBody = definition.body.split(/```(.*?)\n([\s\S]*?)```/g);

  return (
    <div className="mt-10 px-5 sm:px-10 md:px-24 sxl:px-32">
      <div className="group border p-4 rounded-md shadow-md bg-light dark:bg-dark border-dark dark:border-light transition-all ease duration-200">

        {/* Title as clickable link */}
        <h2 className="font-bold text-lg sm:text-xl mb-2">
          <Link
            href={definition.definitionLink}
            className="hover:text-orange-500 dark:hover:text-accentDark transition-colors duration-300"
          >
            {definition.name}
          </Link>
        </h2>

        {/* Body */}
        <div className="text-gray-700 dark:text-gray-300 space-y-2">
          {splitBody.map((chunk, idx) => {
            if (idx % 3 === 1) {
              // language string
              return null;
            }
            if (idx % 3 === 2) {
              const language = splitBody[idx - 1] || "text";
              return (
                <div
                  key={idx}
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
              <p key={idx} className="whitespace-pre-wrap">
                {chunk}
              </p>
            );
          })}
        </div>

        {/* Diagrams Section */}
        {definition.diagramList && definition.diagramList.length > 0 && (
          <div className="mt-4 space-y-4">
            {definition.diagramList.map((diagram, i) => (
              <div key={i} className="border rounded-md p-3 bg-gray-50 dark:bg-gray-800">
                <h3 className="font-semibold mb-1">
                  <Link
                    href={diagram.diagramLink}
                    className="hover:text-orange-500 dark:hover:text-accentDark transition-colors duration-300"
                  >
                    {diagram.name}
                  </Link>
                </h3>
                <div className="mt-2 p-2 rounded overflow-x-auto" style={{ backgroundColor: "#2D2D2D" }}>
                  <SyntaxHighlighter
                    language="python" // or "text" if diagram isn't code
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
            </div>
          );
        };

export default DefinitionCard;
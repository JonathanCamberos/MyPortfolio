import Link from "next/link";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const TopicPerspectiveDisplay = ({ concept, perspectives }) => {
  if (!perspectives || perspectives.length === 0) return null;

  return (
    <>
      {perspectives.map((definition, idx) => (
        <div
          key={idx}
          className="group border p-4 rounded-md shadow-md bg-light dark:bg-dark border-dark dark:border-light transition-all ease duration-200"
        >
          <h2 className="font-bold text-lg sm:text-xl mb-2">
            <Link
              href={definition.definitionLink}
              className="hover:text-orange-500 dark:hover:text-accentDark transition-colors duration-300"
            >
              {definition.perspective}
            </Link>
          </h2>

          {/* Text part */}
          {definition.bodyString && (
            <div className="text-gray-700 dark:text-gray-300 space-y-2">
              <p className="whitespace-pre-wrap">{definition.bodyString}</p>
            </div>
          )}

          {/* Code part */}
          {definition.bodyCode && (
            <div className="mt-2 p-2 rounded overflow-x-auto">
              <SyntaxHighlighter
                language={definition.bodyCodeLanguage || "text"}
                style={coldarkDark}
                customStyle={{
                  background: "transparent",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                  color: "#FFFFFF",
                }}
              >
                {definition.bodyCode}
              </SyntaxHighlighter>
            </div>
          )}

          {/* Diagram list */}
          {definition.diagramList && definition.diagramList.length > 0 && (
            <div className="mt-4 space-y-4">
              {definition.diagramList.map((diagram, i) => (
                <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800 ">
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
      ))}
    </>
  );
};

export default TopicPerspectiveDisplay;
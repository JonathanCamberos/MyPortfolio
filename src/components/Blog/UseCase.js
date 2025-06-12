import React from "react";

const UseCase = ({ useCase }) => {
  return (
    <div className="group border p-4 rounded-md shadow-md hover:scale-105 transition-all ease duration-200">
      <h2 className="font-bold text-lg sm:text-xl">
        <span
          className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50
            dark:to-accentDark/50
            bg-[length:0px_6px]
            group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
        >
          {`${useCase.type}: ${useCase.title}`}
        </span>
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
      <pre className="mt-2 bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm overflow-x-auto">
        <code>{useCase.codeExample}</code>
      </pre>
    </div>
  );
};

export default UseCase;
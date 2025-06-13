import React from "react";

const ApplicationButton = ({ useCases, currentCategory, onCategoryChange }) => {
  return (
    <div className="px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10">
      {useCases.map((category) => {
        const isActive = currentCategory === category;

        return (
          <button
            key={category}
            className={`inline-block py-1.5 md:py-2 px-6 md:px-10 rounded-full border-2 border-solid border-dark dark:border-light hover:scale-105 transition-all ease duration-200 m-2 ${
              isActive
                ? "bg-dark text-light dark:bg-light dark:text-dark"
                : "bg-light text-dark dark:bg-dark dark:text-light"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        );
      })}
    </div>
  );
};

export default ApplicationButton;
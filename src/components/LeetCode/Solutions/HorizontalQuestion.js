

const HorizontalQuestion = ({ question }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start border p-4 rounded-md shadow-md bg-light dark:bg-dark border-dark dark:border-light">
    <div className="flex-grow">
      <h2 className="font-bold text-lg sm:text-xl">
        <a
          href={question.questionLink}
          className="hover:text-orange-500 dark:hover:text-accentDark transition-colors duration-300"
        >
          {question.questionNum}. {question.questionTitle}
        </a>
      </h2>
      <p className="text-sm text-gray-500 mt-2">
        <span className="text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          Difficulty:
        </span>{" "}
        {question.questionDifficulty}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        <span className="text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
          Topics:
        </span>{" "}
        {question.questionTopics?.join(", ") || "N/A"}
      </p>
      <p className="mt-2">{question.questionBlurb || "No description available."}</p>
    </div>
  </div>
);

export default HorizontalQuestion;
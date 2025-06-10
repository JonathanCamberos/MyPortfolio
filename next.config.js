/** @type {import('next').NextConfig} */

const {withContentlayer} = require("next-contentlayer")
const fs = require('fs');
const path = require('path'); // <--- Add this line


const filePaths = [
    'content/leetcode-arrays-and-hashing/index.mdx',
    'content/leetcode-stacks/index.mdx',
    'content/leetcode-two-pointers/index.mdx',
  ];

const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      const questionStats = { total: 0, easy: 0, medium: 0, hard: 0 };
      const topicMap = {};           // topic -> [questionNums]
      const questionsMap = {};       // questionNum -> questionObject

      filePaths.forEach((relativePath) => {
        try {
          const filePath = path.join(process.cwd(), relativePath);
          const content = fs.readFileSync(filePath, "utf-8");

          // Regex patterns
          const questionRegex = /^##\s(\d+)\.\s(.+)\s-\s(Easy|Medium|Hard)$/gm;
          const topicRegex = /^Topics:\s+(.+)$/gm;
          const introRegex = /^> (.+)$/gm;

          const lines = content.split("\n");
          let currentQuestion = null;
          let questionBlurbLines = [];

          lines.forEach((line) => {
            const questionMatch = questionRegex.exec(line);
            if (questionMatch) {
              // Save previous question before starting a new one
              if (currentQuestion) {
                if (questionBlurbLines.length) {
                  currentQuestion.questionBlurb = questionBlurbLines.join(" ");
                  questionBlurbLines = [];
                }
                questionsMap[currentQuestion.questionNum] = currentQuestion;
              }

              const [, questionNumStr, questionTitle, questionDifficulty] = questionMatch;
              const questionNum = parseInt(questionNumStr, 10);

              questionStats.total++;
              if (questionDifficulty.toLowerCase() === "easy") questionStats.easy++;
              else if (questionDifficulty.toLowerCase() === "medium") questionStats.medium++;
              else if (questionDifficulty.toLowerCase() === "hard") questionStats.hard++;

              currentQuestion = {
                questionNum,
                questionTitle: questionTitle.trim(),
                questionDifficulty: questionDifficulty.trim(),
                questionBlurb: "", // To fill later
                questionTopics: [], // To fill later
                questionLink: `/blogs/common-formulas#question-${questionNum}`,
              };

              return;
            }

            const topicMatch = topicRegex.exec(line);
            if (topicMatch && currentQuestion) {
              const topics = topicMatch[1].split(",").map((t) => t.trim());
              currentQuestion.questionTopics.push(...topics);

              topics.forEach((topic) => {
                if (!topicMap[topic]) topicMap[topic] = [];
                if (!topicMap[topic].includes(currentQuestion.questionNum)) {
                  topicMap[topic].push(currentQuestion.questionNum);
                }
              });

              return;
            }

            const introMatch = introRegex.exec(line);
            if (introMatch && currentQuestion) {
              questionBlurbLines.push(introMatch[1].trim());
            }
          });

          // Save the last question in the file
          if (currentQuestion) {
            if (questionBlurbLines.length) {
              currentQuestion.questionBlurb = questionBlurbLines.join(" ");
            }
            questionsMap[currentQuestion.questionNum] = currentQuestion;
          }
        } catch (error) {
          console.error(`Error reading or parsing file ${relativePath}:`, error);
        }
      });

      // Write stats JSON
      fs.writeFileSync(
        path.join(process.cwd(), "public", "leetcodeStats.json"),
        JSON.stringify(questionStats, null, 2)
      );

      // Write topicQuestions.json (topic -> [questionNums])
      fs.writeFileSync(
        path.join(process.cwd(), "public", "topicQuestions.json"),
        JSON.stringify(topicMap, null, 2)
      );

      // Write questions.json (questionNum -> questionObject)
      fs.writeFileSync(
        path.join(process.cwd(), "public", "questions.json"),
        JSON.stringify(questionsMap, null, 2)
      );
    }

    return config;
  },
};

module.exports = withContentlayer({ ...nextConfig });

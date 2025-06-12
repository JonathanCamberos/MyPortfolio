/** @type {import('next').NextConfig} */

const {withContentlayer} = require("next-contentlayer")
const fs = require('fs');
const path = require('path'); // <--- Add this line

const filePaths = [
  'content/leetcode-arrays-and-hashing/index.mdx',
  'content/leetcode-stacks/index.mdx',
  'content/leetcode-two-pointers/index.mdx',
];// Function to parse questions from content
function parseQuestions(content, blogTitle) {
  const questionStats = { total: 0, easy: 0, medium: 0, hard: 0 };
  const topicMap = {};
  const questionsMap = {};

  const questionRegex = /^##\s(\d+)\.\s(.+)\s-\s(Easy|Medium|Hard)$/gm;
  const topicRegex = /^Topics:\s+(.+)$/gm;
  const introRegex = /^> (.+)$/gm;

  const formattedBlogTitle = blogTitle
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-");

  const lines = content.split("\n");
  let currentQuestion = null;
  let questionBlurbLines = [];

  lines.forEach((line) => {
    const questionMatch = questionRegex.exec(line);
    if (questionMatch) {
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
        questionBlurb: "",
        questionTopics: [],
        questionLink: `/blogs/${formattedBlogTitle}#${questionNum}-${questionTitle
          .trim()
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()}---${questionDifficulty.toLowerCase()}`,
        blog: blogTitle,
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

  if (currentQuestion) {
    if (questionBlurbLines.length) {
      currentQuestion.questionBlurb = questionBlurbLines.join(" ");
    }
    questionsMap[currentQuestion.questionNum] = currentQuestion;
  }

  return { questionStats, topicMap, questionsMap };
}

// Function to parse use cases from content
function parseUseCases(content, blogTitle) {
  const useCasesMap = {};
  const useCaseRegex = /^###\s([\w\s]+)\sUse\sCase:\s(.+)$/gm;
  const summaryRegex = /^(?!###).+$/;
  const exampleIntroRegex = /Ex:\s([\s\S]*?)(?=```)/;
  const codeBlockRegex = /```python([\s\S]*?)```/gm;

  const normalizeKey = (key) => key
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters
    .replace(/\s+/g, "-");       // Replace spaces with "-"

  const formattedBlogTitle = blogTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

  let currentUseCase = null;
  let lines = content.split("\n");
  let currentExampleIntroIndex = -1;

  lines.forEach((line, idx) => {
    const useCaseMatch = useCaseRegex.exec(line);
    if (useCaseMatch) {
      if (currentUseCase) {
        const normalizedKey = normalizeKey(currentUseCase.type);
        if (!useCasesMap[normalizedKey]) useCasesMap[normalizedKey] = [];
        useCasesMap[normalizedKey].push(currentUseCase);
      }
      const [, structureType, useCaseTitle] = useCaseMatch;
      currentUseCase = {
        type: structureType.trim(),
        title: useCaseTitle.trim(),
        summary: "",
        exampleIntro: "",
        codeExample: "",
        useCaseLink: `/blogs/${formattedBlogTitle}#${normalizeKey(structureType)}-use-case-${normalizeKey(useCaseTitle)}`,
        blog: blogTitle,
      };
      return;
    }

    if (currentUseCase && !currentUseCase.summary && summaryRegex.test(line)) {
      currentUseCase.summary += line.trim();
      return;
    }

    if (currentUseCase && line.startsWith("Ex:")) {
      const exampleIntroMatch = exampleIntroRegex.exec(content.slice(content.indexOf(line)));
      if (exampleIntroMatch) {
        currentUseCase.exampleIntro = exampleIntroMatch[1].trim();
        currentExampleIntroIndex = idx;
      }
      return;
    }

    if (
      currentUseCase &&
      currentExampleIntroIndex !== -1 &&
      idx > currentExampleIntroIndex &&
      line.startsWith("```python")
    ) {
      const codeBlockMatch = codeBlockRegex.exec(content.slice(content.indexOf(line)));
      if (codeBlockMatch) {
        currentUseCase.codeExample = codeBlockMatch[1].trim();
        currentExampleIntroIndex = -1;
      }
      return;
    }
  });

  if (currentUseCase) {
    const normalizedKey = normalizeKey(currentUseCase.type);
    if (!useCasesMap[normalizedKey]) useCasesMap[normalizedKey] = [];
    useCasesMap[normalizedKey].push(currentUseCase);
  }

  return useCasesMap;
}

const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      const questionStats = { total: 0, easy: 0, medium: 0, hard: 0 };
      const topicMap = {};
      const questionsMap = {};
      const useCasesMap = {};

      filePaths.forEach((relativePath) => {
        try {
          const filePath = path.join(process.cwd(), relativePath);
          const content = fs.readFileSync(filePath, "utf-8");

          // Extract blog title from frontmatter or fallback
          const titleMatch = /^title:\s*"(.+)"$/m.exec(content);
          const blogTitle = titleMatch ? titleMatch[1] : "unknown-blog";

          // Parse questions separately
          const {
            questionStats: qs,
            topicMap: tm,
            questionsMap: qm,
          } = parseQuestions(content, blogTitle);

          // Merge question data
          questionStats.total += qs.total;
          questionStats.easy += qs.easy;
          questionStats.medium += qs.medium;
          questionStats.hard += qs.hard;

          Object.entries(tm).forEach(([k, v]) => {
            if (!topicMap[k]) topicMap[k] = [];
            topicMap[k].push(...v.filter((num) => !topicMap[k].includes(num)));
          });

          Object.entries(qm).forEach(([k, v]) => {
            questionsMap[k] = v;
          });

          // Parse use cases separately
          const uc = parseUseCases(content, blogTitle);
          Object.entries(uc).forEach(([k, arr]) => {
            if (!useCasesMap[k]) useCasesMap[k] = [];
            useCasesMap[k].push(...arr);
          });
        } catch (error) {
          console.error(`Error processing ${relativePath}`, error);
        }
      });

      fs.writeFileSync(
        path.join(process.cwd(), "public", "leetcodeStats.json"),
        JSON.stringify(questionStats, null, 2)
      );
      fs.writeFileSync(
        path.join(process.cwd(), "public", "topicQuestions.json"),
        JSON.stringify(topicMap, null, 2)
      );
      fs.writeFileSync(
        path.join(process.cwd(), "public", "questions.json"),
        JSON.stringify(questionsMap, null, 2)
      );
      fs.writeFileSync(
        path.join(process.cwd(), "public", "useCases.json"),
        JSON.stringify(useCasesMap, null, 2)
      );
    }
    return config;
  },
};



module.exports = withContentlayer({ ...nextConfig });

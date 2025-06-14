/** @type {import('next').NextConfig} */

const {withContentlayer} = require("next-contentlayer")
const fs = require('fs');
const path = require('path'); // <--- Add this line

const filePaths = [
  'content/leetcode-arrays-and-hashing/index.mdx',
  'content/leetcode-stacks/index.mdx',
  'content/leetcode-two-pointers/index.mdx',
];
// Function to parse solutions from content
function parseSolutions(content, blogTitle) {
  const solutionsMap = {};

  // Regex to match the question number and title
  const questionHeaderRegex = /^##\s(\d+)\.\s(.+)\s-\s(Easy|Medium|Hard)$/gm;

  // Updated regex to capture solution number, name, and all pairs after first ' - '
  const solutionHeaderRegex = /^### Solution (\d+): (.+?) - (.+)$/gm;

  // Normalize keys (for use as object keys and URLs)
  const normalizeKey = (key) =>
    key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const formattedBlogTitle = blogTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Collect all question headers and their indices
  const questionHeaders = [];
  let match;
  while ((match = questionHeaderRegex.exec(content)) !== null) {
    questionHeaders.push({
      index: match.index,
      questionNumber: parseInt(match[1], 10),
      title: match[2].trim(),
      difficulty: match[3].trim(),
    });
  }

  // Collect all solution headers and their indices
  const solutionHeaders = [];
  while ((match = solutionHeaderRegex.exec(content)) !== null) {
    solutionHeaders.push({
      index: match.index,
      number: parseInt(match[1], 10),
      name: match[2].trim(),
      typeApplicationsRaw: match[3].trim(), // everything after first ' - '
    });
  }

  for (let i = 0; i < solutionHeaders.length; i++) {
    const current = solutionHeaders[i];
    const next = solutionHeaders[i + 1];

    // Determine the question number associated with this solution
    const associatedQuestion = questionHeaders.find(
      (q, idx) =>
        q.index <= current.index &&
        (!questionHeaders[idx + 1] || questionHeaders[idx + 1].index > current.index)
    );

    const questionNumber = associatedQuestion ? associatedQuestion.questionNumber : null;

    // Slice of content for this solution section (from current header to next or EOF)
    const section = content.substring(current.index, next ? next.index : content.length);

    // Find python code block inside this section (non-global regex)
    const codeBlockRegex = /```python([\s\S]*?)```/;
    const codeMatch = codeBlockRegex.exec(section);
    const code = codeMatch ? codeMatch[1].trim() : "";

    // Split the type/application pairs by ' - '
    const typeApplicationPairs = current.typeApplicationsRaw.split(/\s-\s/);

    for (const pair of typeApplicationPairs) {
      const [typeRaw, applicationRaw] = pair.split("/").map((str) => str.trim());

      if (!typeRaw || !applicationRaw) {
        throw new Error(`Invalid type/application pair '${pair}' in solution header.`);
      }

      const type = normalizeKey(typeRaw);
      const application = normalizeKey(applicationRaw);

      const solutionObj = {
        number: current.number,
        name: current.name,
        type,
        application,
        code,
        questionNumber,
        solutionLink: `/Notes/${formattedBlogTitle}#solution-${current.number}-${normalizeKey(current.name)}`,
        blog: blogTitle,
      };

      if (!solutionsMap[type]) solutionsMap[type] = {};
      if (!solutionsMap[type][application]) solutionsMap[type][application] = [];

      solutionsMap[type][application].push(solutionObj);
    }
  }

  return solutionsMap;
}

// Function to parse questions from content
function parseQuestions(content, blogTitle) {
  const questionStats = { total: 0, easy: 0, medium: 0, hard: 0 };
  const topicMap = {};
  const questionsMap = {};

  const questionRegex = /^##\s(\d+)\.\s(.+)\s-\s(Easy|Medium|Hard)$/gm;
  const topicRegex = /^Topics:\s+(.+)$/gm;
  const introLineRegex = /^>\s(.+)$/; // Match single lines starting with '>'
  const formattedBlogTitle = blogTitle
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-");

  const lines = content.split("\n");
  let currentQuestion = null;
  let questionBlurbLines = [];
  let insideIntro = false;

  lines.forEach((line) => {
    const questionMatch = questionRegex.exec(line);
    if (questionMatch) {
      // Finalize the previous question
      if (currentQuestion) {
        if (questionBlurbLines.length) {
          currentQuestion.questionBlurb = questionBlurbLines.join(" ");
          questionBlurbLines = [];
        }
        questionsMap[currentQuestion.questionNum] = currentQuestion;
      }

      // Start a new question
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
        questionLink: `/Notes/${formattedBlogTitle}#${questionNum}-${questionTitle
          .trim()
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase()}---${questionDifficulty.toLowerCase()}`,
        blog: blogTitle,
      };

      insideIntro = false; // Reset intro flag
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

    if (introLineRegex.test(line) && currentQuestion) {
      questionBlurbLines.push(line.match(introLineRegex)[1].trim());
      insideIntro = true; // Signal we're inside an intro section
      return;
    }

    if (insideIntro && line.trim() === "") {
      // End of intro section
      insideIntro = false;
    }
  });

  // Finalize the last question
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
  const useCaseRegex = /^###\s([\w\s]+)\sApplication:\s(.+)$/gm;
  const summaryRegex = /^(?!###).+$/;
  const exampleIntroRegex = /Ex:\s([\s\S]*?)(?=```)/;
  const codeBlockRegex = /```python([\s\S]*?)```/gm;

  const normalizeKey = (key) =>
    key
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters
      .replace(/\s+/g, "-"); // Replace spaces with "-"

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
        useCaseLink: `/Notes/${formattedBlogTitle}#${normalizeKey(structureType)}-use-case-${normalizeKey(
          useCaseTitle
        )}`,
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

// New organizeSolutions function
function organizeSolutions(inputPath, outputPath) {
  const solutionsData = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  const organizedData = {};

  Object.entries(solutionsData).forEach(([typeKey, applications]) => {
    Object.entries(applications).forEach(([appKey, solutions]) => {
      solutions.forEach((solution) => {
        if (!organizedData[solution.questionNumber]) {
          organizedData[solution.questionNumber] = [];
        }
        organizedData[solution.questionNumber].push(solution);
      });
    });
  });

  fs.writeFileSync(outputPath, JSON.stringify(organizedData, null, 2));
}

// Function to parse LeetCode stats from content files
function parseLeetcodeStats(filePaths) {
  const questionStats = { total: 0, easy: 0, medium: 0, hard: 0 };
  const topicMap = {};
  const questionsMap = {};
  const useCasesMap = {};
  const solutionsMap = {};

  filePaths.forEach((relativePath) => {
    try {
      const filePath = path.join(process.cwd(), relativePath);
      const content = fs.readFileSync(filePath, "utf-8");

      // Extract blog title from frontmatter or fallback
      const titleMatch = /^title:\s*"(.+)"$/m.exec(content);
      const blogTitle = titleMatch ? titleMatch[1] : "unknown-blog";

      // Parse questions separately
      const { questionStats: qs, topicMap: tm, questionsMap: qm } = parseQuestions(content, blogTitle);

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

      const solutions = parseSolutions(content, blogTitle);
      Object.entries(solutions).forEach(([typeKey, appMap]) => {
        if (!solutionsMap[typeKey]) solutionsMap[typeKey] = {};

        Object.entries(appMap).forEach(([appKey, solutionArr]) => {
          if (!solutionsMap[typeKey][appKey]) solutionsMap[typeKey][appKey] = [];
          solutionsMap[typeKey][appKey].push(...solutionArr);
        });
      });
    } catch (error) {
      console.error(`Error processing ${relativePath}`, error);
    }
  });

  return {
    questionStats,
    topicMap,
    questionsMap,
    useCasesMap,
    solutionsMap,
  };
}

// Function to create a mapping for search
function createQuestionMapping(filePath) {
  const mapping = {};

  try {
    // Read and parse the JSON file
    const fileContent = fs.readFileSync(path.resolve(filePath), "utf-8");
    const allQuestions = JSON.parse(fileContent);

    // Build the mapping
    Object.values(allQuestions).forEach(({ questionNum, questionTitle }) => {
      const searchKey = `${questionNum}. ${questionTitle}`;
      mapping[searchKey] = questionNum;
    });
  } catch (error) {
    console.error("Error parsing the file:", error);
  }

  return mapping;
}

const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      const {
        questionStats,
        topicMap,
        questionsMap,
        useCasesMap,
        solutionsMap,
      } = parseLeetcodeStats(filePaths);

      fs.writeFileSync(
        path.join(process.cwd(), "public/generatedDB", "leetcodeStats.json"),
        JSON.stringify(questionStats, null, 2)
      );
      fs.writeFileSync(
        path.join(process.cwd(), "public/generatedDB", "topicQuestionNums.json"),
        JSON.stringify(topicMap, null, 2)
      );
      fs.writeFileSync(
        path.join(process.cwd(), "public/generatedDB", "allQuestionNum.json"),
        JSON.stringify(questionsMap, null, 2)
      );
      fs.writeFileSync(
        path.join(process.cwd(), "public/generatedDB", "topicApplications.json"),
        JSON.stringify(useCasesMap, null, 2)
      );
      fs.writeFileSync(
        path.join(process.cwd(), "public/generatedDB", "topicApplicationSolutions.json"),
        JSON.stringify(solutionsMap, null, 2)
      );

      const solutionsPath = path.join(process.cwd(), "public/generatedDB", "topicApplicationSolutions.json");
      organizeSolutions(
        solutionsPath,
        path.join(process.cwd(), "public/generatedDB", "questionNumAllSolutions.json")
      );

      // Adding the logic for allQuestionNum.js parsing
      const allQuestionsPath = path.join(process.cwd(), "public/generatedDB", "allQuestionNum.json");
      const questionMapping = createQuestionMapping(allQuestionsPath);

      // Write the mapping to a new file
      fs.writeFileSync(
        path.join(process.cwd(), "public/generatedDB", "queryQuestionNumString.json"),
        JSON.stringify(questionMapping, null, 2)
      );
    }
    return config;
  },
};



module.exports = withContentlayer({ ...nextConfig });

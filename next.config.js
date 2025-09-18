/** @type {import('next').NextConfig} */

const {withContentlayer} = require("next-contentlayer")
const fs = require('fs');
const path = require('path');

const systemDesignFilePaths = [
  "content/systemdesign-system-design-interview/index.mdx",
  "content/systemdesign-ticket-master/index.mdx",
  "content/systemdesign-url-shortner/index.mdx",
  "content/textbook-designing-data-intensive-applications/index.mdx",
];


const filePaths = [
  'content/leetcode-arrays-and-hashing/index.mdx',
  'content/leetcode-stacks/index.mdx',
  'content/leetcode-two-pointers/index.mdx',
  'content/leetcode-binary-search/index.mdx',
  'content/leetcode-sliding-window/index.mdx',
  'content/leetcode-linked-list/index.mdx',
  'content/leetcode-trees/index.mdx',
  'content/leetcode-tries/index.mdx',
  'content/leetcode-heaps/index.mdx',
  'content/leetcode-backtracking/index.mdx',
  'content/leetcode-graphs/index.mdx',
  'content/leetcode-1D-dynamic-programming/index.mdx',
  'content/leetcode-greedy/index.mdx',
  'content/leetcode-intervals/index.mdx',
  'content/leetcode-bit-manipulation/index.mdx',
  'content/leetcode-math-and-geometry/index.mdx',
  'content/leetcode-advanced-graphs/index.mdx',
  'content/leetcode-2D-dynamic-programming/index.mdx'

];


// ***************************
// LeetCode parsers
function syncWarmness() {
  const allQuestionsPath = path.join(process.cwd(), "public/generatedDB", "allQuestionNum.json");
  const warmnessPath = path.join(process.cwd(), "public/generatedDB", "allQuestionWarmness.json");

  const allQuestions = JSON.parse(fs.readFileSync(allQuestionsPath, "utf-8"));

  let warmnessData = {};
  if (fs.existsSync(warmnessPath)) {
    warmnessData = JSON.parse(fs.readFileSync(warmnessPath, "utf-8"));
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize time for comparison

  let updatedAllQuestions = false;
  let updatedWarmness = false;

  // Calculate days between dates and adjust for today being 1
  const daysBetween = (d1, d2) => {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.max(1, Math.floor((d1 - d2) / msPerDay) + 1); // Ensure today is 1
  };

  Object.values(allQuestions).forEach((question) => {
    const qNum = question.questionNum.toString();

    if (warmnessData[qNum]) {
      const lastDateStr = warmnessData[qNum].lastSubmittedDate;
      let coldnessCount = -1; // default: no submissions

      if (lastDateStr) {
        const lastDate = new Date(lastDateStr);
        lastDate.setHours(0, 0, 0, 0);

        coldnessCount = daysBetween(today, lastDate);
      }

      if (warmnessData[qNum].coldnessCount !== coldnessCount) {
        warmnessData[qNum].coldnessCount = coldnessCount;
        updatedWarmness = true;
      }

      if (
        question.lastSubmittedDate !== lastDateStr ||
        question.coldnessCount !== coldnessCount
      ) {
        question.lastSubmittedDate = lastDateStr;
        question.coldnessCount = coldnessCount;
        updatedAllQuestions = true;
      }
    } else {
      // New question - no submissions
      warmnessData[qNum] = {
        lastSubmittedDate: null,
        coldnessCount: -1,
      };
      question.lastSubmittedDate = null;
      question.coldnessCount = -1;
      updatedWarmness = true;
      updatedAllQuestions = true;
    }
  });

  if (updatedAllQuestions) {
    fs.writeFileSync(allQuestionsPath, JSON.stringify(allQuestions, null, 2));
    console.log("allQuestionNum.json updated with warmness fields and coldness counts");
  } else {
    console.log("No changes made to allQuestionNum.json");
  }

  // Ensure warmnessData has all questions from allQuestions
  Object.values(allQuestions).forEach(({ questionNum }) => {
    const qNum = questionNum.toString();
    if (!(qNum in warmnessData)) {
      warmnessData[qNum] = {
        lastSubmittedDate: null,
        coldnessCount: -1,
      };
      updatedWarmness = true;
    }
  });

  if (updatedWarmness) {
    fs.writeFileSync(warmnessPath, JSON.stringify(warmnessData, null, 2));
    console.log("allQuestionWarmness.json updated with new questions and coldness counts");
  } else {
    console.log("No new questions to update in allQuestionWarmness.json");
  }
}

// Function to parse solutions from content
function parseSolutions(content, blogTitle) {
  const solutionsMap = {};

  // Regex to match the question number and title
  const questionHeaderRegex = /^#\s(\d+)\.\s(.+)\s-\s(Easy|Medium|Hard)$/gm;

  // Updated regex to capture solution number, name, and all pairs after first ' - '
  const solutionHeaderRegex = /^## Solution (\d+): (.+?) - (.+)$/gm;

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

      // Append ---{type}{application} to the solutionLink
      const baseLink = `/Notes/${formattedBlogTitle}#solution-${current.number}-${normalizeKey(current.name)}`;
      const solutionLink = `${baseLink}---${type}${application}`;

      const solutionObj = {
        number: current.number,
        name: current.name,
        type,
        application,
        code,
        questionNumber,
        solutionLink,
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

  const questionRegex = /^#\s(\d+)\.\s(.+)\s-\s(Easy|Medium|Hard)$/gm;
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
  const useCaseRegex = /^##\s([\w\s]+)\sApplication:\s(.+)$/gm;

  // Normalize keys helper
  const normalizeKey = (key) =>
    key
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters
      .replace(/\s+/g, "-"); // Replace spaces with "-"

  const formattedBlogTitle = blogTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

  const lines = content.split("\n");

  let currentUseCase = null;
  let summaryLines = [];
  let collectingSummary = false;
  let exampleIntroFoundAt = -1;

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx];

    const useCaseMatch = useCaseRegex.exec(line);
    if (useCaseMatch) {
      // Save previous use case if any
      if (currentUseCase) {
        currentUseCase.summary = summaryLines.join(" ").trim();
        const normalizedType = normalizeKey(currentUseCase.type);
        if (!useCasesMap[normalizedType]) useCasesMap[normalizedType] = [];
        useCasesMap[normalizedType].push(currentUseCase);
      }

      // Reset for new use case
      const [, structureType, useCaseTitle] = useCaseMatch;
      currentUseCase = {
        type: structureType.trim(),
        title: useCaseTitle.trim(),
        summary: "",
        exampleIntro: "",
        codeExample: "",
        useCaseLink: `/Notes/${formattedBlogTitle}#${normalizeKey(structureType)}-application-${normalizeKey(
          useCaseTitle
        )}`,
        blog: blogTitle,
      };

      summaryLines = [];
      collectingSummary = true;
      exampleIntroFoundAt = -1;
      continue;
    }

    // Collect summary lines (all lines until the line starts with 'Ex:')
    if (currentUseCase && collectingSummary) {
      if (line.startsWith("Ex:")) {
        collectingSummary = false;
        exampleIntroFoundAt = idx;

        // Capture example intro text after 'Ex:'
        currentUseCase.exampleIntro = line.slice(3).trim();
        continue;
      }

      if (line.trim() !== "") {
        summaryLines.push(line.trim());
      }
      continue;
    }

    // After example intro line found, look for the first code block starting from here
    if (currentUseCase && exampleIntroFoundAt !== -1 && idx > exampleIntroFoundAt) {
      if (line.startsWith("```python")) {
        // Join the rest lines from this idx onward to search the code block
        const remainingContent = lines.slice(idx).join("\n");
        const codeBlockMatch = /```python([\s\S]*?)```/.exec(remainingContent);

        if (codeBlockMatch) {
          currentUseCase.codeExample = codeBlockMatch[1].trim();

          // Move idx forward past this code block to avoid reprocessing
          // Count how many lines the code block spans
          const codeBlockLines = codeBlockMatch[0].split("\n").length;
          idx += codeBlockLines - 1; // -1 because for-loop will add 1
        }
        exampleIntroFoundAt = -1; // reset so we don't grab multiple code blocks
        continue;
      }
    }
  }

  // Save last use case
  if (currentUseCase) {
    currentUseCase.summary = summaryLines.join(" ").trim();
    const normalizedType = normalizeKey(currentUseCase.type);
    if (!useCasesMap[normalizedType]) useCasesMap[normalizedType] = [];
    useCasesMap[normalizedType].push(currentUseCase);
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
  const questionStats = { total: 0, totalSolutions: 0, easy: 0, medium: 0, hard: 0 };
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

function updateTotalSolutions(folderPath, solutionsFileName, statsFileName) {
  const solutionsPath = path.join(process.cwd(), folderPath, solutionsFileName);
  const statsPath = path.join(process.cwd(), folderPath, statsFileName);

  // Read existing stats file (leetcodeStats.json)
  const questionStats = JSON.parse(fs.readFileSync(statsPath, "utf-8"));

  // Read solutions file
  const questionSolutions = JSON.parse(fs.readFileSync(solutionsPath, "utf-8"));

  // Calculate total solutions count
  let totalSolutions = 0;
  Object.values(questionSolutions).forEach((solutionsArray) => {
    totalSolutions += solutionsArray.length;
  });

  // Update questionStats
  questionStats.totalSolutions = totalSolutions;

  // Write back the updated stats file
  fs.writeFileSync(statsPath, JSON.stringify(questionStats, null, 2));

  return totalSolutions;
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

// ********************
// System Design Parsers
// parseDefinitions: preserve first-line content and combine with following buffer lines
function parseDefinitions(content, filePath) {
  const defs = {};
  const lines = content.split("\n");

  const normalizeKey = (key) =>
    key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const baseLink = filePath.replace(/^content\//, "/Notes/").replace(/\/index\.mdx$/, "");

  let currentDef = null;
  let buffer = [];
  let insideDef = false;
  let currentHeadingSlug = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Track closest preceding heading (#, ##, ###, etc.)
    const headingMatch = /^(#+)\s*(.+)$/.exec(line.trim());
    if (headingMatch) {
      currentHeadingSlug = normalizeKey(headingMatch[2]);
      continue;
    }

    // Start of a perspective
    if (/^{\/\*\s*def:/.test(line.trim())) {
      insideDef = true;
      buffer = [];

      // Extract perspectiveId and diagramId
      const perspectiveIdMatch = /perspectiveId\s*=\s*(\d+)/.exec(line);
      const diagramIdMatch = /diagramId\s*=\s*([^\s*}]+)/.exec(line);

      currentDef = {
        perspectiveId: perspectiveIdMatch ? parseInt(perspectiveIdMatch[1], 10) : 0,
        diagramId: diagramIdMatch ? diagramIdMatch[1].trim() : null,
      };
      continue;
    }

    // End of perspective
    if (line.trim() === "{/* end */}") {
      if (currentDef && currentDef.name) {
        currentDef.body = buffer.join("\n").trim();
        currentDef.definitionLink = `${baseLink}#${currentHeadingSlug || normalizeKey(currentDef.name)}`;

        if (!defs[currentDef.name]) defs[currentDef.name] = [];
        defs[currentDef.name].push(currentDef);
      }
      currentDef = null;
      insideDef = false;
      buffer = [];
      continue;
    }

    if (insideDef) {
      // Remove leading "-" or "*" for markdown lists
      const cleanLine = line.replace(/^[-*]\s*/, "");

      if (!currentDef.name) {
        // Split on first colon for name/body
        const [rawName, ...rest] = cleanLine.split(":");
        currentDef.name = rawName.trim();
        buffer.push(rest.join(":").trim());
      } else {
        buffer.push(cleanLine);
      }
    }
  }

  // Sort perspectives by perspectiveId ascending
  Object.keys(defs).forEach((concept) => {
    defs[concept].sort((a, b) => a.perspectiveId - b.perspectiveId);
  });

  return defs;
}


// parseDiagrams: preserves raw line spacing inside code blocks
function parseDiagrams(content, filePath) {
  const diagrams = {};
  const normalizeKey = (key) =>
    key.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const baseLink = filePath
    .replace(/^content\//, "/Notes/")
    .replace(/\/index\.mdx$/, "");

  const lines = content.split("\n");
  let currentDiagram = null;
  let buffer = [];
  let relatedIds = [];
  let currentLanguage = null;
  let insideCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const lineRaw = lines[i];
    const line = lineRaw.trim();

    // Match diagram reference to diagramId
    const diagramRefMatch = /^\{\/\*\s*Diagram:\s*(.+)\s*\*\/\}/i.exec(line);
    if (diagramRefMatch) {
      relatedIds = diagramRefMatch[1].split(",").map((d) => d.trim());
      continue;
    }

    // Match diagram heading
    const diagramMatch = /^#{1,6}\s*Diagram:\s*(.+)$/i.exec(line);
    if (diagramMatch) {
      currentDiagram = {
        name: diagramMatch[1].trim(),
        diagramLink: `${baseLink}#diagram-${normalizeKey(
          diagramMatch[1].trim()
        )}`,
        diagram: "",
        relatedIds: relatedIds || [],
        related: [],
        language: null, // store language later
      };
      buffer = [];
      continue;
    }

    if (currentDiagram) {
      // Opening or closing code block
      const codeBlockMatch = /^```(\w*)/.exec(line);
      if (codeBlockMatch) {
        if (!insideCodeBlock) {
          // Opening code block
          insideCodeBlock = true;
          currentLanguage = codeBlockMatch[1] || "text"; // default to text
        } else {
          // Closing code block
          insideCodeBlock = false;
          currentDiagram.diagram = buffer.join("\n");
          currentDiagram.language = currentLanguage;

          // Use first relatedId as the key, fallback to normalized name
          const key = currentDiagram.relatedIds[0] || normalizeKey(currentDiagram.name);
          diagrams[key] = currentDiagram;

          // Reset for next diagram
          currentDiagram = null;
          buffer = [];
          relatedIds = [];
          currentLanguage = null;
        }
        continue;
      }

      if (insideCodeBlock) {
        buffer.push(lineRaw); // preserve whitespace
      }
    }
  }

  return diagrams;
}


function attachDiagramsToPerspectives(defs, diagrams) {
  Object.entries(defs).forEach(([concept, perspectiveArray]) => {
    perspectiveArray.forEach((perspective) => {
      if (perspective.diagramId) {
        const diagram = diagrams[perspective.diagramId];
        if (diagram) {
          // Attach the diagram to the perspective
          if (!perspective.diagramList) perspective.diagramList = [];
          perspective.diagramList.push({
            name: diagram.name,
            diagramLink: diagram.diagramLink,
            diagram: diagram.diagram,
            // Use the pre-populated related array
            related: diagram.related.join(", "),
            language: diagram.language
          });
        }
      }
    });
  });
}

function addConceptsToDiagramRelated(defs, diagrams) {
  Object.entries(defs).forEach(([conceptName, perspectives]) => {
    perspectives.forEach((perspective) => {
      if (perspective.diagramId) {
        const diagram = diagrams[perspective.diagramId];
        if (diagram) {
          // Ensure the 'related' array exists
          if (!diagram.related) diagram.related = [];

          // Add the concept name if it's not already there
          if (!diagram.related.includes(conceptName)) {
            diagram.related.push(conceptName);
          }
        }
      }
    });
  });
}


const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {

      // ********************
      // LeetCode Parsing
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
      
      updateTotalSolutions("public/generatedDB", "questionNumAllSolutions.json", "leetcodeStats.json");

      // Write the mapping to a new file
      fs.writeFileSync(
        path.join(process.cwd(), "public/generatedDB", "queryQuestionNumString.json"),
        JSON.stringify(questionMapping, null, 2)
      );

      syncWarmness();

      // ********************
      // System Design Parsing
      const systemDefinitions = {};
      const systemDiagrams = {};

      const outputDir = path.join(process.cwd(), "public/generatedDB");
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

      systemDesignFilePaths.forEach((relPath) => {
        try {
          const filePath = path.join(process.cwd(), relPath);
          const content = fs.readFileSync(filePath, "utf-8");

          const defs = parseDefinitions(content, relPath);
          const diagrams = parseDiagrams(content, relPath);

          addConceptsToDiagramRelated(defs, diagrams);
          // Attach diagrams to perspectives (existing function)
          attachDiagramsToPerspectives(defs, diagrams);

          // NEW: automatically populate diagram.related arrays
          Object.entries(defs).forEach(([conceptName, perspectives]) => {
            perspectives.forEach((perspective) => {
              if (perspective.diagramId) {
                const diagram = diagrams[perspective.diagramId];
                if (diagram) {
                  if (!diagram.related) diagram.related = [];
                  if (!diagram.related.includes(conceptName)) {
                    diagram.related.push(conceptName);
                  }
                }
              }
            });
          });

          // Merge into the master DBs
          Object.entries(defs).forEach(([concept, perspectiveArray]) => {
            if (!systemDefinitions[concept]) systemDefinitions[concept] = [];
            systemDefinitions[concept].push(...perspectiveArray);
          });

          Object.assign(systemDiagrams, diagrams);

        } catch (err) {
          console.error(`Error parsing ${relPath}`, err);
        }
      });

      fs.writeFileSync(
        path.join(outputDir, "systemDesignDefinitions.json"),
        JSON.stringify(systemDefinitions, null, 2)
      );

      fs.writeFileSync(
        path.join(outputDir, "systemDesignDiagrams.json"),
        JSON.stringify(systemDiagrams, null, 2)
      );


      }

    return config;
  },
};

module.exports = withContentlayer({ ...nextConfig });

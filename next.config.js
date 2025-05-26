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
    
          filePaths.forEach((relativePath) => {
            try {
              const filePath = path.join(process.cwd(), relativePath);
              const content = fs.readFileSync(filePath, "utf-8");
    
              // Split lines and filter only exact level 2 headers: '## ' at start of line
              const questionLines = content
                .split("\n")
                .filter((line) => /^##\s/.test(line));
    
              questionLines.forEach((line) => {
                // Check difficulty by matching the line end exactly
                const match = line.match(/- (Easy|Medium|Hard)$/i);
                if (match) {
                  questionStats.total++;
                  const diff = match[1].toLowerCase();
                  if (diff === "easy") questionStats.easy++;
                  else if (diff === "medium") questionStats.medium++;
                  else if (diff === "hard") questionStats.hard++;
                }
              });
            } catch (error) {
              console.error(`Error reading or parsing file ${relativePath}:`, error);
            }
          });
    
          console.log("LeetCode Stats:", questionStats);
    
          // Write stats JSON for frontend usage
          fs.writeFileSync(
            path.join(process.cwd(), "public", "leetcodeStats.json"),
            JSON.stringify(questionStats, null, 2)
          );
        }
    
        return config;
    }
};

module.exports = withContentlayer({ ...nextConfig });

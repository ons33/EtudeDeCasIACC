const fs = require('fs');
const path = require('path');
const glob = require('glob');
const axios = require('axios');

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("No API key provided!");
  process.exit(1);
}

// Function to read all .ts files in the project
function getAllCodeFiles() {
  return glob.sync('src/**/*.ts', { absolute: true });
}

// Read file contents
function readFiles(files) {
  return files.map(file => fs.readFileSync(file, 'utf-8')).join('\n');
}

async function detectAIUsage(code) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/ai-detection', // placeholder, depends on actual detection API
      { input: code },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error detecting AI usage:", error.response?.data || error.message);
    return null;
  }
}

async function main() {
  console.log("AI detection started");
  const files = getAllCodeFiles();
  const code = readFiles(files);
  
  const result = await detectAIUsage(code);
  
  if (result && result.percentage) {
    console.log(`AI-generated content percentage: ${result.percentage}%`);
  } else {
    console.log("AI detection could not compute a percentage.");
  }
}

main();

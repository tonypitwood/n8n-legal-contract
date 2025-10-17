require('dotenv').config();
const fs = require('fs');
const axios = require('axios');

const {
  N8N_TOKEN,
  GITHUB_TOKEN,
  REPO,
  WORKFLOW_ID,
  WORKFLOW_PATH,
  COMMIT_MESSAGE
} = process.env;

const headersN8N = { Authorization: `Bearer ${N8N_TOKEN}` };
const headersGitHub = { Authorization: `Bearer ${GITHUB_TOKEN}` };

// Step 1: Export workflow from n8n
axios.get(`http://localhost:5678/rest/workflows/${WORKFLOW_ID}`, { headers: headersN8N })
  .then(res => {
    fs.writeFileSync(WORKFLOW_PATH, JSON.stringify(res.data, null, 2));
    console.log('✅ Workflow exported');

    const content = Buffer.from(JSON.stringify(res.data)).toString('base64');

    // Step 2: Get current file SHA from GitHub
    return axios.get(`https://api.github.com/repos/${REPO}/contents/${WORKFLOW_PATH}`, { headers: headersGitHub })
      .then(res => {
        const sha = res.data.sha;

        // Step 3: Push updated file to GitHub
        return axios.put(`https://api.github.com/repos/${REPO}/contents/${WORKFLOW_PATH}`, {
          message: COMMIT_MESSAGE,
          content,
          sha
        }, { headers: headersGitHub });
      });
  })
  .then(() => console.log('✅ Pushed to GitHub'))
  .catch(err => {
    console.error('❌ Error:', err.response?.data || err.message);
  });
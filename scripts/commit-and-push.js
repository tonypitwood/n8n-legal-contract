const fs = require('fs');
const axios = require('axios');

const token = 'ghp_...'; // Your GitHub token
const repo = 'tonypitwood/n8n-legal-contract';
const path = 'workflows/security-scaffold.json';
const message = 'Auto-backup: exported and committed';
const fileContent = fs.readFileSync(path, 'utf8');
const encodedContent = Buffer.from(fileContent).toString('base64');

// Step 1: Get current file SHA
axios.get(`https://api.github.com/repos/${repo}/contents/${path}`, {
  headers: { Authorization: `Bearer $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` }
})
.then(res => {
  const sha = res.data.sha;

  // Step 2: Push updated file
  return axios.put(`https://api.github.com/repos/${repo}/contents/${path}`, {
    message,
    content: encodedContent,
    sha
  }, {
    headers: { Authorization: `Bearer $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` }
  });
})
.then(() => console.log('✅ Pushed to GitHub'))
.catch(err => console.error('❌ GitHub push failed:', err.response?.data || err.message));
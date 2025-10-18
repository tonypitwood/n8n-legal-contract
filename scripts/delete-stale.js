const axios = require('axios');

const token = process.env.GITHUB_TOKEN;
const sha = process.env.FILE_SHA;
const url = 'https://api.github.com/repos/tonypitwood/n8n-legal-contract/contents/workflows/security-scaffold.json';

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'n8n-sync-agent',
  'Content-Type': 'application/json'
};

const body = {
  message: 'Deleting stale file before push',
  sha: sha
};

axios.put(url, body, { headers })
  .then(res => console.log('✅ Deleted:', res.data.commit.sha))
  .catch(err => console.error('❌ Failed:', err.response?.data || err.message));

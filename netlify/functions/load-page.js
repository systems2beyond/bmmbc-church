const { Octokit } = require("@octokit/rest");

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const token = event.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' })
      };
    }

    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });

    // Get HTML file
    const { data: htmlFile } = await octokit.rest.repos.getContent({
      owner: 'systems2beyond',
      repo: 'bmmbc-church',
      path: 'index.html'
    });

    // Get CSS file
    const { data: cssFile } = await octokit.rest.repos.getContent({
      owner: 'systems2beyond',
      repo: 'bmmbc-church',
      path: 'styles.css'
    });

    const html = Buffer.from(htmlFile.content, 'base64').toString();
    const css = Buffer.from(cssFile.content, 'base64').toString();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ html, css })
    };
  } catch (error) {
    console.error('Error loading page:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load page' })
    };
  }
};

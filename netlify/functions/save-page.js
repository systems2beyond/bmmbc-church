const { Octokit } = require("@octokit/rest");

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { html, css } = JSON.parse(event.body);
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

    // Get current file to get SHA
    const { data: currentFile } = await octokit.rest.repos.getContent({
      owner: 'systems2beyond',
      repo: 'bmmbc-church',
      path: 'index.html'
    });

    // Update HTML file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: 'systems2beyond',
      repo: 'bmmbc-church',
      path: 'index.html',
      message: 'Update page content via visual editor',
      content: Buffer.from(html).toString('base64'),
      sha: currentFile.sha
    });

    // Update CSS if provided
    if (css) {
      const { data: currentCSS } = await octokit.rest.repos.getContent({
        owner: 'systems2beyond',
        repo: 'bmmbc-church',
        path: 'styles.css'
      });

      await octokit.rest.repos.createOrUpdateFileContents({
        owner: 'systems2beyond',
        repo: 'bmmbc-church',
        path: 'styles.css',
        message: 'Update styles via visual editor',
        content: Buffer.from(css).toString('base64'),
        sha: currentCSS.sha
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error saving page:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save page' })
    };
  }
};

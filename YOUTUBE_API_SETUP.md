# YouTube API Setup Guide

This guide will help you set up the YouTube Data API to automatically display the most recent videos from BMBC's YouTube channel.

## Quick Setup Steps

### 1. Get a YouTube Data API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **YouTube Data API v3**:
   - Go to "APIs & Services" > "Library"
   - Search for "YouTube Data API v3"
   - Click "Enable"
4. Create an API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your new API key

### 2. Configure the API Key

**Option A: Direct Edit (Recommended)**
1. Open `watch-past-services.html`
2. Find line 134: `const API_KEY = 'YOUR_API_KEY';`
3. Replace `'YOUR_API_KEY'` with your actual API key in quotes

**Option B: Using Config File**
1. Open `youtube-config.js`
2. Replace `'YOUR_API_KEY'` with your actual API key
3. Update `watch-past-services.html` to use the config file

### 3. Test the Integration

1. Open `watch-past-services.html` in your browser
2. The page should now automatically load the most recent videos from BMBC's channel
3. Videos will auto-refresh every 30 minutes

## Security Best Practices

### Restrict Your API Key
1. In Google Cloud Console, go to your API key settings
2. Under "API restrictions", select "Restrict key"
3. Choose "YouTube Data API v3" only
4. Under "Application restrictions", you can optionally restrict to your domain

### Environment Variables (For Production)
For production deployment, consider using environment variables instead of hardcoding the API key:

```javascript
const API_KEY = process.env.YOUTUBE_API_KEY || 'YOUR_API_KEY';
```

## Features

✅ **Auto-Updates**: Fetches the latest videos automatically  
✅ **Fallback System**: Shows sample videos if API is not configured  
✅ **Error Handling**: Graceful degradation if API fails  
✅ **Performance**: Lazy loading and efficient API calls  
✅ **Mobile Friendly**: Responsive design for all devices  

## Troubleshooting

### API Key Not Working?
- Ensure YouTube Data API v3 is enabled in your Google Cloud project
- Check that your API key has the correct permissions
- Verify there are no typos in the API key

### No Videos Loading?
- Check browser console for error messages
- Verify the channel username is correct
- Ensure your API key has sufficient quota

### Rate Limits
- YouTube API has daily quotas (10,000 units by default)
- Each video search uses ~100 units
- The page auto-refreshes every 30 minutes to stay within limits

## API Costs

The YouTube Data API v3 is free up to 10,000 units per day, which is more than sufficient for this church website usage.

## Support

If you need help with setup, the page will show helpful error messages and fallback content until the API is properly configured.

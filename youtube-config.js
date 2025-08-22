// YouTube API Configuration
// Replace 'YOUR_API_KEY' with your actual YouTube Data API key from Google Cloud Console

const YOUTUBE_CONFIG = {
    // Get your API key from: https://console.cloud.google.com/
    // 1. Create a new project or select existing project
    // 2. Enable YouTube Data API v3
    // 3. Create credentials (API Key)
    // 4. Restrict the key to YouTube Data API v3 for security
    API_KEY: 'YOUR_API_KEY',
    
    // BMBC's YouTube channel information
    CHANNEL_USERNAME: 'BethelMetropolitanBaptistCh',
    CHANNEL_NAME: 'Bethel Metropolitan Baptist Church',
    
    // Display settings
    MAX_RESULTS: 6, // Number of recent videos to show
    AUTO_REFRESH_MINUTES: 30, // How often to check for new videos
    
    // Fallback videos (used when API is not configured)
    FALLBACK_VIDEOS: [
        {
            videoId: "DyJavhSxNdA",
            title: "Sunday Worship Service - Live Stream",
            description: "Join us for worship and the Word",
            publishedAt: new Date()
        },
        {
            videoId: "njbPUJRAdaU", 
            title: "Knowing Jesus in 2024",
            description: "Dr. Rickey L. Houston, Preaching",
            publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YOUTUBE_CONFIG;
}

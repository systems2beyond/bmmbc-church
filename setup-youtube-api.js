#!/usr/bin/env node

// YouTube API Setup Script
// This script helps you get a YouTube API key and configure the integration

const fs = require('fs');
const path = require('path');

console.log('🎥 BMBC YouTube API Setup');
console.log('========================\n');

// Check if we're in the right directory
const watchFile = path.join(__dirname, 'watch-past-services.html');
if (!fs.existsSync(watchFile)) {
    console.error('❌ Error: watch-past-services.html not found in current directory');
    console.log('Please run this script from the project root directory.');
    process.exit(1);
}

console.log('📋 To get your YouTube Data API key:');
console.log('1. Go to: https://console.cloud.google.com/');
console.log('2. Create a new project or select existing');
console.log('3. Enable "YouTube Data API v3"');
console.log('4. Go to Credentials > Create Credentials > API Key');
console.log('5. Copy your API key\n');

// Simple interactive setup
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your YouTube Data API key (or press Enter to skip): ', (apiKey) => {
    if (apiKey && apiKey.trim() && apiKey !== 'YOUR_API_KEY') {
        // Update the HTML file with the API key
        try {
            let htmlContent = fs.readFileSync(watchFile, 'utf8');
            const oldKey = "const API_KEY = 'YOUR_API_KEY';";
            const newKey = `const API_KEY = '${apiKey.trim()}';`;
            
            if (htmlContent.includes(oldKey)) {
                htmlContent = htmlContent.replace(oldKey, newKey);
                fs.writeFileSync(watchFile, htmlContent);
                console.log('✅ API key successfully configured!');
                console.log('🚀 Your Watch Past Services page will now automatically load the latest videos from BMBC\'s channel.');
                console.log('\n📱 Test it by opening: http://localhost:8081/watch-past-services.html');
            } else {
                console.log('⚠️  Could not find API key placeholder in the file.');
                console.log('Please manually replace "YOUR_API_KEY" with your actual API key in watch-past-services.html');
            }
        } catch (error) {
            console.error('❌ Error updating file:', error.message);
        }
    } else {
        console.log('⏭️  Skipped API key setup.');
        console.log('You can manually add it later by editing watch-past-services.html');
    }
    
    console.log('\n🔧 Additional Setup Options:');
    console.log('- Edit youtube-config.js for advanced configuration');
    console.log('- See YOUTUBE_API_SETUP.md for detailed instructions');
    console.log('- The page includes fallback videos until API is configured');
    
    rl.close();
});

// Handle Ctrl+C gracefully
rl.on('SIGINT', () => {
    console.log('\n\n👋 Setup cancelled. You can run this script again anytime.');
    process.exit(0);
});

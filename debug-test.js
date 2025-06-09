// Test file to verify API connections and troubleshoot issues
const fs = require('fs');

console.log('=== AI Assistant Extension Debug Test ===');

// Test 1: Check if the current API key format is correct
const hardcodedApiKey = 'AIzaSyBEerOO5jAJRt5ccFyHjniaUptzdS3vx0I';
console.log('1. API Key format check:');
console.log('   Length:', hardcodedApiKey.length);
console.log('   Starts with AIza:', hardcodedApiKey.startsWith('AIzaSy'));
console.log('   Contains only valid chars:', /^[A-Za-z0-9_-]+$/.test(hardcodedApiKey));

// Test 2: Check package.json dependencies
console.log('\n2. Package.json dependencies check:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('   @langchain/google-genai:', packageJson.dependencies['@langchain/google-genai']);
    console.log('   ollama:', packageJson.dependencies['ollama']);
    console.log('   @langchain/core:', packageJson.dependencies['@langchain/core']);
} catch (error) {
    console.error('   Error reading package.json:', error.message);
}

// Test 3: Check if extension build is up to date
console.log('\n3. Build status check:');
try {
    const srcStats = fs.statSync('src/extension.ts');
    const outStats = fs.statSync('out/extension.js');
    console.log('   Source modified:', srcStats.mtime);
    console.log('   Build modified:', outStats.mtime);
    console.log('   Build is newer:', outStats.mtime > srcStats.mtime);
} catch (error) {
    console.error('   Error checking build status:', error.message);
}

console.log('\n=== Potential Issues and Solutions ===');
console.log('1. Buffer deprecation warning:');
console.log('   - This is likely from a dependency (langchain or google-genai)');
console.log('   - Consider updating dependencies with: npm update');

console.log('\n2. Token exchange error:');
console.log('   - Check if API key is still valid');
console.log('   - Verify Google AI Studio API access');
console.log('   - Test with a fresh API key if needed');

console.log('\n3. Extension loading:');
console.log('   - Make sure to reload VS Code window after building');
console.log('   - Check Developer Tools for additional errors');

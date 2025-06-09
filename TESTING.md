# AI Assistant Extension - Testing Guide

## How to Test the Contextual Suggestions UI

### 1. Launch the Extension
1. Press `F5` in VS Code to launch the extension development host
2. In the new VS Code window, open the test-code.js file
3. Click on the AI Assistant icon in the activity bar (robot icon)

### 2. Test Contextual Suggestions
1. Place your cursor in different parts of the test-code.js file
2. Wait for contextual suggestions to appear in the sidebar
3. Test the expand/collapse functionality for long suggestions

### 3. Test Other Features
1. Select some code and use the "Explain Selected Code" button
2. Try the "Generate Vulnerability Report" for security analysis
3. Use "Suggest Refactoring" on the sample code
4. Try "Get Test Case Ideas" for testing suggestions

### 4. Expected Behavior
- Suggestions should appear as nicely formatted blocks
- Long suggestions should be collapsible/expandable
- No raw JSON should be visible
- All features should work with the hardcoded API key

## Troubleshooting
- If suggestions don't appear, check the console for errors
- Ensure the API key is working (should be hardcoded)
- Try refreshing suggestions with the refresh button

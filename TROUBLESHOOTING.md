# AI Assistant Extension - Troubleshooting Guide

## Current Issues and Solutions

### 1. Buffer Deprecation Warning
**Issue:** `(node:26948) [DEP0005] DeprecationWarning: Buffer() is deprecated`

**Cause:** This warning comes from dependencies using the deprecated `Buffer()` constructor.

**Solutions:**
```bash
# Update dependencies to newer versions
npm update

# If the warning persists, it's from @langchain/google-genai or ollama dependencies
# The warning doesn't break functionality but you can suppress it:
export NODE_NO_WARNINGS=1  # Linux/Mac
$env:NODE_NO_WARNINGS=1    # PowerShell
```

### 2. Token Exchange Error
**Issue:** `Error 2025-06-07T13:28:21.215Z: Unexpected error while trying to exchange token: fetch failed`

**Cause:** Google Gemini API authentication issues

**Solutions:**

#### Option A: Update to newer Gemini model (Recommended)
The hardcoded API key might be using an older authentication method. Let's switch to a more recent model:

```typescript
// In extension.ts and aiAssistantViewProvider.ts, update the model selections:
{
  label: 'Google Gemini 1.5 Flash (Cloud)',
  description: 'Use Google Gemini 1.5 Flash model via API',
  provider: 'gemini',
  model: 'gemini-1.5-flash',  // Instead of gemini-2.0-flash
  detail: 'Requires API key - Fast and powerful'
}
```

#### Option B: Update dependencies
```bash
npm install @langchain/google-genai@latest
npm install langchain@latest
```

#### Option C: Generate a fresh API key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Replace the hardcoded key in the code

#### Option D: Use Ollama as primary option
Since Ollama is working well, you can make it the default choice.

### 3. Extension Reloading
After any changes, make sure to:

1. **Rebuild the extension:**
   ```bash
   npm run vscode:prepublish
   ```

2. **Reload VS Code window:**
   - Press `Ctrl+Shift+P`
   - Type "Developer: Reload Window"
   - Press Enter

3. **Check Developer Console:**
   - Press `Ctrl+Shift+I` in VS Code
   - Look for any additional error messages

## Quick Fix Implementation

Let me update the extension to use more stable model configurations:

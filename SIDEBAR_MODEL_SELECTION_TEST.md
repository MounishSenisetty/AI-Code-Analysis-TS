# Sidebar Model Selection Integration Test

## Overview
This test verifies that model selection is working for both command palette commands and sidebar button actions.

## Test Scenarios

### ✅ 1. Command Palette Model Selection (Ctrl+Shift+P)
**Steps:**
1. Press `Ctrl+Shift+P`
2. Type "AI Assistant" to see available commands
3. Select any of the 4 commands:
   - "AI Assistant: Generate Vulnerability Report"
   - "AI Assistant: Explain Selected Code"  
   - "AI Assistant: Suggest Refactoring"
   - "AI Assistant: Get Test Case Ideas"
4. **Expected Result:** Model selection QuickPick should appear with 5 options

### ✅ 2. Sidebar Button Model Selection
**Steps:**
1. Open VS Code sidebar and navigate to AI Assistant view
2. Click any of the 4 action buttons:
   - 🔒 Generate Vulnerability Report
   - 📖 Explain Selected Code
   - 🔨 Suggest Refactoring
   - 🧪 Get Test Case Ideas
3. **Expected Result:** Model selection QuickPick should appear with 5 options

## Model Options Available
1. **Google Gemini 2.0 Flash (Cloud)** - Fast and powerful
2. **Google Gemini Pro (Cloud)** - Advanced reasoning
3. **Qwen2.5 Coder 3B (Local)** - Code-specialized, privacy focused
4. **DeepSeek R1 1.5B (Local)** - Reasoning-optimized, fast
5. **Llama 3.2 1B (Local)** - Lightweight general purpose, very fast

## Updated Files
- ✅ `src/aiAssistantViewProvider.ts` - Added model selection to all 4 sidebar button methods
- ✅ `src/extension.ts` - Already had model selection for command palette commands
- ✅ `src/types.ts` - Model interfaces defined
- ✅ `src/llmService.ts` - Dual provider support (Gemini + Ollama)

## Technical Changes Made

### aiAssistantViewProvider.ts Updates:
1. **Added import:** `ModelConfig, ProviderOption` from types
2. **Added method:** `showModelSelection()` - Identical to extension.ts version
3. **Updated 4 methods:** All now call `showModelSelection()` before API calls:
   - `_generateVulnerabilityReport()`
   - `_explainSelectedCode()`
   - `_suggestRefactoring()`
   - `_getTestIdeas()`

### Pattern for Each Method:
```typescript
// Show model selection
const modelConfig = await this.showModelSelection();
if (!modelConfig) {
  return; // User cancelled selection
}

// Switch to selected model
this._llmService.switchModel(modelConfig);

if (!this._llmService.isConfigured()) {
  vscode.window.showErrorMessage(`Please configure your ${modelConfig.provider} settings.`);
  return;
}
```

## Testing Instructions

### Prerequisites:
1. Ensure extension is compiled: `npm run compile`
2. Have Ollama running locally (optional for Ollama models)
3. Open a code file for testing

### Manual Test Steps:
1. **Test Command Palette:**
   - Press Ctrl+Shift+P
   - Try each AI Assistant command
   - Verify model selection appears

2. **Test Sidebar Buttons:**
   - Open AI Assistant sidebar
   - Click each button
   - Verify model selection appears

3. **Test Model Switching:**
   - Select different models for different operations
   - Verify appropriate provider is used

### Expected Behavior:
- ✅ Both command palette and sidebar should show model selection
- ✅ User can cancel selection (returns to normal operation)
- ✅ Selected model is used for the specific operation
- ✅ Error handling for misconfigured providers
- ✅ Progress indicators during AI processing

## Build Status:
- ✅ TypeScript compilation: SUCCESS
- ✅ No compilation errors
- ✅ Extension bundle ready for testing

## Next Steps:
1. Load extension in VS Code (F5 or Extension Development Host)
2. Test both command palette and sidebar model selection
3. Verify end-to-end functionality with both Gemini and Ollama models

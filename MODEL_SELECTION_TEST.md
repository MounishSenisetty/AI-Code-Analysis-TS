# Model Selection Feature Test Guide

## Overview
The AI Assistant extension now supports model selection between Google Gemini (cloud) and Ollama (local) models. Users can choose their preferred model when running commands via Ctrl+Shift+P.

## Features Implemented

### 1. Model Provider Support
- **Gemini Provider**: Cloud-based Google Gemini models (requires API key)
- **Ollama Provider**: Local models via Ollama server (privacy-focused)

### 2. Available Models
- **Gemini 2.0 Flash**: Fast and powerful cloud model
- **Gemini Pro**: Advanced reasoning cloud model
- **Llama 3.2**: Local model via Ollama
- **CodeLlama**: Code-specialized local model via Ollama
- **Mistral**: Lightweight local model via Ollama

### 3. Model Selection UI
- QuickPick interface with model descriptions
- Provider and model details
- Setup requirements shown for each option

## Testing Steps

### Test 1: Basic Model Selection
1. Open VS Code with the AI Assistant extension
2. Open a code file (e.g., test-code.js)
3. Press `Ctrl+Shift+P` and search for "AI Assistant"
4. Run any command (e.g., "Generate Vulnerability Report")
5. **Expected**: Model selection QuickPick appears with 5 options
6. Select a Gemini model
7. **Expected**: Command proceeds with selected model

### Test 2: Ollama Model Selection
1. Run a command via Ctrl+Shift+P
2. Select an Ollama model (e.g., "Ollama - Llama 3.2")
3. **Expected**: 
   - If Ollama is not running: Error message about configuration
   - If Ollama is running: Command proceeds successfully

### Test 3: Model Switching
1. Run "Generate Vulnerability Report" with Gemini model
2. Run "Explain Selected Code" with Ollama model
3. **Expected**: Each command uses the selected model provider

### Test 4: Contextual Suggestions
1. Open a code file and make changes
2. **Expected**: Contextual suggestions continue to work (using default Gemini)
3. The sidebar doesn't show model selection (as designed)

## Verification Points

### Code Changes
- ✅ `types.ts`: Added ModelProvider interfaces
- ✅ `llmService.ts`: Updated to support both Gemini and Ollama
- ✅ `extension.ts`: Added model selection for all commands
- ✅ `package.json`: Added Ollama dependency

### Functionality
- ✅ Model selection QuickPick appears for commands
- ✅ LLMService can switch between providers
- ✅ Gemini models work with API key
- ✅ Ollama models attempt local connection
- ✅ Error handling for unconfigured providers

## Known Limitations
1. Contextual suggestions in sidebar use default Gemini (no model selection UI)
2. Ollama requires local server to be running
3. Model selection is per-command, not persistent across sessions

## Troubleshooting

### Ollama Not Working
1. Install Ollama: https://ollama.com/
2. Start Ollama server: `ollama serve`
3. Pull a model: `ollama pull llama3.2`
4. Verify: `ollama list`

### Gemini Not Working
1. Check API key is configured (using hardcoded key for development)
2. Verify internet connection
3. Check API quotas/limits

## Future Enhancements
- Persistent model preference storage
- Model selection for contextual suggestions
- Custom Ollama server URL configuration
- Model performance indicators
- Streaming responses for large outputs

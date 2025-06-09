# Ollama Integration Guide

## Overview
The AI Assistant extension now supports Ollama for running local AI models. This provides a privacy-focused alternative to cloud-based APIs.

## Prerequisites

### 1. Install Ollama
Download and install Ollama from: https://ollama.com/

### 2. Start Ollama Server
Open a terminal and run:
```bash
ollama serve
```
This starts the Ollama server on `http://localhost:11434`

### 3. Pull Models
Download models you want to use:
```bash
# Popular options:
ollama pull llama3.2          # General purpose, good balance
ollama pull codellama         # Code-specialized
ollama pull mistral           # Lightweight and fast
ollama pull llama2            # Alternative general purpose
```

### 4. Verify Installation
Check available models:
```bash
ollama list
```

## Testing the Integration

### Test 1: Direct Ollama Test
Run the test script to verify Ollama works:
```bash
cd "c:\Users\munna\OneDrive\Desktop\Code Review\CodeAnalysisTypeScript"
node test-ollama.js
```

Expected output if working:
```
🧪 Testing Ollama Integration...
📋 Checking available models...
Available models: llama3.2, codellama, mistral
🤖 Testing with model: llama3.2
✅ Ollama Response:
[JavaScript function code here]
🎉 Ollama integration test successful!
```

### Test 2: VS Code Extension Test
1. Open VS Code with AI Assistant extension
2. Open a code file (e.g., test-code.js)
3. Select some code
4. Press Ctrl+Shift+P → "AI Assistant: Explain Selected Code"
5. Choose an Ollama model from the QuickPick
6. Expected: Code explanation using local model

### Test 3: All Commands with Ollama
Test each command with Ollama models:
- Generate Vulnerability Report
- Explain Selected Code  
- Suggest Refactoring
- Get Test Case Ideas

## Model Recommendations

### For Code Analysis:
- **codellama** - Best for code-related tasks
- **llama3.2** - Good general performance

### For Quick Tasks:
- **mistral** - Fast and lightweight
- **llama2** - Good balance of speed/quality

### Model Sizes:
- 7B models: Fast, good for simple tasks
- 13B models: Better quality, slower
- 34B+ models: Best quality, requires more RAM

## Troubleshooting

### Error: "Ollama server not running"
**Solution:** Start Ollama server:
```bash
ollama serve
```

### Error: "Model 'modelname' not found"
**Solution:** Pull the model:
```bash
ollama pull modelname
```

### Error: "Connection refused"
**Causes:**
1. Ollama not installed
2. Ollama server not running
3. Firewall blocking port 11434

### Slow Performance
**Solutions:**
1. Use smaller models (7B instead of 13B)
2. Close other applications to free RAM
3. Use SSD storage for model files

### Out of Memory
**Solutions:**
1. Use smaller models
2. Increase system RAM
3. Close other applications

## Configuration

### Default Settings
- Host: `http://localhost:11434`
- Models: User selects via QuickPick
- Streaming: Disabled (waits for complete response)

### Custom Ollama Host
If running Ollama on different host/port, you can modify the baseUrl in the extension code.

## Privacy Benefits
✅ All processing happens locally
✅ No data sent to external servers
✅ No API keys required
✅ Works offline
✅ Full control over models and data

## Performance Comparison

### Gemini (Cloud)
- ✅ Fast response times
- ✅ High quality outputs
- ❌ Requires internet
- ❌ Data sent to Google
- ❌ API costs

### Ollama (Local)
- ✅ Complete privacy
- ✅ No API costs
- ✅ Works offline
- ❌ Initial setup required
- ❌ Uses local resources
- ❌ Model quality varies

## Next Steps
1. Install and test Ollama
2. Pull your preferred models
3. Test the VS Code extension with Ollama
4. Choose models based on your needs
5. Enjoy private, local AI assistance!

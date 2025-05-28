# AI Assistant VS Code Extension

An intelligent VS Code extension that provides AI-powered code assistance using Google's Gemini language model. Get real-time contextual suggestions, security vulnerability reports, code explanations, refactoring suggestions, and test case ideas.

## Features

- **Real-time Contextual Suggestions**: Get AI-powered suggestions as you code
- **Security Vulnerability Reports**: Comprehensive security analysis of your code
- **Code Explanations**: Detailed explanations of selected code snippets
- **Refactoring Suggestions**: AI-generated suggestions for code improvements
- **Test Case Ideas**: Generate comprehensive test scenarios for your code

## Setup

1. **Install the Extension**: Install from the VS Code marketplace or load locally
2. **Get Gemini API Key**: 
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
3. **Configure the Extension**:
   - Open VS Code Settings (`Ctrl+,` or `Cmd+,`)
   - Search for "AI Assistant"
   - Enter your Gemini API key in `aiAssistant.gemini.apiKey`

## Usage

### Sidebar Panel
- Click the AI Assistant icon in the Activity Bar (left sidebar)
- View real-time contextual suggestions as you code
- Use action buttons for on-demand analysis

### Commands
- `Ctrl+Shift+A` (`Cmd+Shift+A` on Mac): Toggle AI Assistant panel
- Use Command Palette (`Ctrl+Shift+P`) and search for "AI Assistant" commands

### Features in Detail

#### Contextual Suggestions
- Automatically analyzes code around your cursor
- Provides real-time suggestions for improvements
- Configurable debounce timing and enable/disable option

#### Vulnerability Reports
- Analyzes entire files for security vulnerabilities
- Provides severity ratings and mitigation suggestions
- Covers common vulnerability types (OWASP Top 10, etc.)

#### Code Explanations
- Select any code snippet and get detailed explanations
- Understand complex algorithms and logic
- Learn about programming concepts in context

#### Refactoring Suggestions
- Get AI-powered suggestions for code improvements
- See before/after examples
- Focus on readability, performance, and best practices

#### Test Case Ideas
- Generate comprehensive test scenarios
- Cover unit tests, integration tests, and edge cases
- Includes testing framework recommendations

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `aiAssistant.gemini.apiKey` | `""` | Your Google Gemini API Key |
| `aiAssistant.gemini.modelName` | `"gemini-pro"` | Gemini model to use |
| `aiAssistant.suggestions.enabled` | `true` | Enable real-time suggestions |
| `aiAssistant.suggestions.debounceMs` | `1000` | Debounce time for suggestions |

## Supported Languages

- JavaScript/TypeScript
- Python
- Java
- Go
- C#
- C/C++
- Ruby
- PHP
- Rust
- Kotlin
- Swift

## Requirements

- VS Code 1.74.0 or higher
- Google Gemini API key
- Internet connection for AI requests

## Privacy & Security

- Code is sent to Google's Gemini API for analysis
- API key is stored locally in VS Code settings
- No code is stored or cached by the extension
- Review Google's data usage policies for Gemini API

## Troubleshooting

### Common Issues

1. **"No API key configured" error**
   - Set your Gemini API key in VS Code settings
   - Restart VS Code after configuration

2. **Suggestions not appearing**
   - Check if suggestions are enabled in settings
   - Ensure you're working with a supported language
   - Verify API key is valid

3. **AI requests failing**
   - Check internet connection
   - Verify API key has proper permissions
   - Check if you've exceeded API quota

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

- Report issues on GitHub
- Check documentation for common solutions
- Review Google Gemini API documentation for API-related issues
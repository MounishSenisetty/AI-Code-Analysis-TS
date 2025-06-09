import * as vscode from 'vscode';
import { LLMService } from './llmService';
import { PromptFactory } from './promptFactory';
import { WebviewPanelManager } from './webviewPanels';
import { CodeContext, ContextualSuggestion, WebviewMessage, ModelConfig, ProviderOption } from './types';

export class AIAssistantViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'aiAssistant.sidebarView';
  
  private _view?: vscode.WebviewView;
  private _suggestions: ContextualSuggestion[] = [];
  private _isLoading = false;
  private _debounceTimer?: NodeJS.Timeout;
  constructor(
    private readonly _extensionUri: vscode.Uri,
    private readonly _llmService: LLMService  ) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage((data: WebviewMessage) => {
      switch (data.command) {
        case 'generateVulnerabilityReport':
          this._generateVulnerabilityReport();
          break;
        case 'explainCode':
          this._explainSelectedCode();
          break;
        case 'suggestRefactoring':
          this._suggestRefactoring();
          break;
        case 'getTestIdeas':
          this._getTestIdeas();
          break;
        case 'refresh':
          this._refreshSuggestions();
          break;
      }
    });

    // Start listening for editor changes
    this._startListeningForChanges();
  }

  private _startListeningForChanges(): void {
    // Listen for active editor changes
    vscode.window.onDidChangeActiveTextEditor(() => {
      this._refreshSuggestions();
    });

    // Listen for text document changes
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (event.document === vscode.window.activeTextEditor?.document) {
        this._debouncedRefreshSuggestions();
      }
    });

    // Listen for cursor position changes
    vscode.window.onDidChangeTextEditorSelection(() => {
      this._debouncedRefreshSuggestions();
    });

    // Initial load
    this._refreshSuggestions();
  }

  private _debouncedRefreshSuggestions(): void {
    const config = vscode.workspace.getConfiguration('aiAssistant');
    const debounceMs = config.get<number>('suggestions.debounceMs') || 1000;
    const suggestionsEnabled = config.get<boolean>('suggestions.enabled') ?? true;

    if (!suggestionsEnabled) {
      return;
    }

    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
    }

    this._debounceTimer = setTimeout(() => {
      this._refreshSuggestions();
    }, debounceMs);
  }

  private async _refreshSuggestions(): Promise<void> {
    const context = this._getCurrentCodeContext();
    if (!context || !context.cursorContext.trim()) {
      this._suggestions = [];
      this._updateWebview();
      return;
    }

    this._isLoading = true;
    this._updateWebview();

    try {
      const prompt = PromptFactory.createContextualSuggestionPrompt(context);
      this._suggestions = await this._llmService.generateContextualSuggestions(prompt);
    } catch (error) {
      console.error('AI Assistant: Error refreshing suggestions:', error);
      this._suggestions = [];
    } finally {
      this._isLoading = false;
      this._updateWebview();
    }
  }

  private _getCurrentCodeContext(): CodeContext | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return null;
    }

    const document = editor.document;
    const selection = editor.selection;
    const position = selection.active;

    // Get context around cursor (5 lines before and after)
    const startLine = Math.max(0, position.line - 5);
    const endLine = Math.min(document.lineCount - 1, position.line + 5);
    const contextRange = new vscode.Range(startLine, 0, endLine, Number.MAX_VALUE);
    const cursorContext = document.getText(contextRange);

    return {
      language: document.languageId,
      selectedText: document.getText(selection),
      fullContent: document.getText(),
      cursorContext,
      fileName: document.fileName
    };
  }  private async _generateVulnerabilityReport(): Promise<void> {
    const context = this._getCurrentCodeContext();
    if (!context) {
      vscode.window.showWarningMessage('Please open a code file to generate a vulnerability report.');
      return;
    }

    // LLMService already auto-detected the best provider
    if (!this._llmService.isConfigured()) {
      vscode.window.showErrorMessage(`Please configure your AI provider settings.`);
      return;
    }

    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Generating vulnerability report...",
      cancellable: false
    }, async () => {
      try {
        const prompt = PromptFactory.createVulnerabilityReportPrompt(context);
        const response = await this._llmService.generateResponse(prompt);
        
        if (response.error) {
          vscode.window.showErrorMessage(`Failed to generate vulnerability report: ${response.error}`);
          return;
        }

        WebviewPanelManager.showVulnerabilityReport(response.content);
      } catch (error) {
        vscode.window.showErrorMessage(`Error generating vulnerability report: ${error}`);
      }
    });
  }  private async _explainSelectedCode(): Promise<void> {
    const context = this._getCurrentCodeContext();
    if (!context || !context.selectedText.trim()) {
      vscode.window.showWarningMessage('Please select some code to explain.');
      return;
    }
    // LLMService already auto-detected the best provider
    if (!this._llmService.isConfigured()) {
      vscode.window.showErrorMessage(`Please configure your AI provider settings.`);
      return;
    }
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Explaining selected code...",
      cancellable: false
    }, async () => {
      try {
        const prompt = PromptFactory.createCodeExplanationPrompt(context);
        const response = await this._llmService.generateResponse(prompt);
        
        if (response.error) {
          vscode.window.showErrorMessage(`Failed to explain code: ${response.error}`);
          return;
        }

        WebviewPanelManager.showCodeExplanation(response.content);
      } catch (error) {
        vscode.window.showErrorMessage(`Error explaining code: ${error}`);
      }
    });
  }  private async _suggestRefactoring(): Promise<void> {
    const context = this._getCurrentCodeContext();
    if (!context || !context.selectedText.trim()) {
      vscode.window.showWarningMessage('Please select some code to refactor.');
      return;
    }
    // LLMService already auto-detected the best provider
    if (!this._llmService.isConfigured()) {
      vscode.window.showErrorMessage(`Please configure your AI provider settings.`);
      return;
    }
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Generating refactoring suggestions...",
      cancellable: false
    }, async () => {
      try {
        const prompt = PromptFactory.createRefactoringPrompt(context);
        const response = await this._llmService.generateResponse(prompt);
        
        if (response.error) {
          vscode.window.showErrorMessage(`Failed to generate refactoring suggestions: ${response.error}`);
          return;
        }

        WebviewPanelManager.showRefactoringSuggestions(response.content);
      } catch (error) {
        vscode.window.showErrorMessage(`Error generating refactoring suggestions: ${error}`);
      }
    });
  }  private async _getTestIdeas(): Promise<void> {
    const context = this._getCurrentCodeContext();
    if (!context || !context.selectedText.trim()) {
      vscode.window.showWarningMessage('Please select some code to generate test ideas for.');
      return;
    }
    // LLMService already auto-detected the best provider
    if (!this._llmService.isConfigured()) {
      vscode.window.showErrorMessage(`Please configure your AI provider settings.`);
      return;
    }
    vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Generating test case ideas...",
      cancellable: false
    }, async () => {
      try {
        const prompt = PromptFactory.createTestIdeasPrompt(context);
        const response = await this._llmService.generateResponse(prompt);
        
        if (response.error) {
          vscode.window.showErrorMessage(`Failed to generate test ideas: ${response.error}`);
          return;
        }

        WebviewPanelManager.showTestIdeas(response.content);
      } catch (error) {
        vscode.window.showErrorMessage(`Error generating test ideas: ${error}`);
      }
    });
  }

  private _updateWebview(): void {
    if (this._view) {
      this._view.webview.html = this._getHtmlForWebview(this._view.webview);
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const isConfigured = this._llmService.isConfigured();
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Assistant</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            background-color: var(--vscode-sideBar-background);
            margin: 0;
            padding: 16px;
        }
        
        .section {
            margin-bottom: 24px;
            padding: 16px;
            background-color: var(--vscode-editor-background);
            border-radius: 6px;
            border: 1px solid var(--vscode-panel-border);
        }
        
        .section-title {
            font-weight: 600;
            margin-bottom: 12px;
            color: var(--vscode-titleBar-activeForeground);
            display: flex;
            align-items: center;
            gap: 8px;
        }        .suggestion {
            background-color: var(--vscode-list-hoverBackground);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            border-left: 4px solid var(--vscode-textLink-foreground);
            transition: all 0.2s ease;
        }
        
        .suggestion:hover {
            background-color: var(--vscode-list-activeSelectionBackground);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .suggestion-warning {
            border-left-color: #ff9500;
        }
        
        .suggestion-optimization {
            border-left-color: #28a745;
        }
        
        .suggestion-explanation {
            border-left-color: #17a2b8;
        }
        
        .suggestion-best-practice {
            border-left-color: #007acc;
        }
        
        .suggestion-content {
            font-size: 14px;
            line-height: 1.6;
            color: var(--vscode-foreground);
            word-wrap: break-word;
            white-space: pre-wrap;
        }
        
        .suggestion-type {
            font-size: 11px;
            color: var(--vscode-descriptionForeground);
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 8px;
            letter-spacing: 0.5px;
        }
        
        .suggestion-expandable {
            max-height: 120px;
            overflow: hidden;
            position: relative;
        }
        
        .suggestion-expanded {
            max-height: none;
        }
        
        .suggestion-fade {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40px;
            background: linear-gradient(transparent, var(--vscode-list-hoverBackground));
            pointer-events: none;
        }
        
        .expand-button {
            background: var(--vscode-button-secondaryBackground);
            border: none;
            color: var(--vscode-button-secondaryForeground);
            cursor: pointer;
            font-size: 12px;
            margin-top: 8px;
            padding: 6px 12px;
            border-radius: 4px;
            transition: background-color 0.2s;
            width: 100%;
        }
        
        .expand-button:hover {
            background-color: var(--vscode-button-hoverBackground);
            color: var(--vscode-button-foreground);
        }
        
        .button {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin: 4px 0;
            width: 100%;
            text-align: left;
            transition: background-color 0.2s;
        }
        
        .button:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        
        .button:disabled {
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            cursor: not-allowed;
        }
        
        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            color: var(--vscode-descriptionForeground);
        }
        
        .spinner {
            width: 16px;
            height: 16px;
            border: 2px solid var(--vscode-progressBar-background);
            border-top: 2px solid var(--vscode-progressBar-foreground);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-right: 8px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .no-suggestions {
            color: var(--vscode-descriptionForeground);
            font-style: italic;
            text-align: center;
            padding: 20px;
        }
        
        .error-message {
            background-color: var(--vscode-inputValidation-errorBackground);
            color: var(--vscode-inputValidation-errorForeground);
            border: 1px solid var(--vscode-inputValidation-errorBorder);
            padding: 12px;
            border-radius: 4px;
            margin-bottom: 16px;
        }
        
        .config-link {
            color: var(--vscode-textLink-foreground);
            text-decoration: underline;
            cursor: pointer;
        }
        
        .icon {
            width: 16px;
            height: 16px;
        }
    </style>
</head>
<body>
    ${!isConfigured ? `
    <div class="error-message">
        <strong>⚠️ Configuration Required</strong><br>
        Please set your Gemini API key in VS Code settings to use AI Assistant features.<br>
        Go to Settings → Extensions → AI Assistant → Gemini API Key
    </div>
    ` : ''}
    
    <div class="section">
        <div class="section-title">
            <span>🧠</span>
            Contextual Suggestions
            <button class="button" onclick="refresh()" style="margin-left: auto; width: auto; padding: 4px 8px;">
                🔄
            </button>
        </div>
        
        ${this._isLoading ? `
        <div class="loading">
            <div class="spinner"></div>
            Analyzing code...
        </div>        ` : this._suggestions.length > 0 ? this._suggestions.map((suggestion, index) => {
            const content = suggestion.content || 'No content provided';
            const isLong = content.length > 200;
            const displayContent = isLong ? content.substring(0, 200) + '...' : content;
            const escapedContent = content.replace(/'/g, "&#39;").replace(/"/g, "&quot;").replace(/\n/g, "\\n");
            
            return `
        <div class="suggestion suggestion-${suggestion.type}">
            <div class="suggestion-type">${suggestion.type.replace('-', ' ')}</div>
            <div class="suggestion-content ${isLong ? 'suggestion-expandable' : ''}" 
                 id="content-${index}" 
                 data-full-content="${escapedContent}">
                ${displayContent.replace(/\n/g, '<br>')}
                ${isLong ? '<div class="suggestion-fade" id="fade-${index}"></div>' : ''}
            </div>
            ${isLong ? `
            <button class="expand-button" id="btn-${index}" onclick="toggleExpand(${index})">
                Show More
            </button>
            ` : ''}
        </div>`;
        }).join(''): `
        <div class="no-suggestions">
            ${isConfigured ? 'Open a code file to see AI suggestions' : 'Configure API key to see suggestions'}
        </div>
        `}
    </div>
    
    <div class="section">
        <div class="section-title">
            <span>⚡</span>
            Actions
        </div>
        
        <button class="button" onclick="generateVulnerabilityReport()" ${!isConfigured ? 'disabled' : ''}>
            🔒 Generate Vulnerability Report
        </button>
        
        <button class="button" onclick="explainCode()" ${!isConfigured ? 'disabled' : ''}>
            📖 Explain Selected Code
        </button>
        
        <button class="button" onclick="suggestRefactoring()" ${!isConfigured ? 'disabled' : ''}>
            🔨 Suggest Refactoring
        </button>
        
        <button class="button" onclick="getTestIdeas()" ${!isConfigured ? 'disabled' : ''}>
            🧪 Get Test Case Ideas
        </button>
    </div>    <script>
        const vscode = acquireVsCodeApi();
        
        function generateVulnerabilityReport() {
            vscode.postMessage({ command: 'generateVulnerabilityReport' });
        }
        
        function explainCode() {
            vscode.postMessage({ command: 'explainCode' });
        }
        
        function suggestRefactoring() {
            vscode.postMessage({ command: 'suggestRefactoring' });
        }
        
        function getTestIdeas() {
            vscode.postMessage({ command: 'getTestIdeas' });
        }
          function refresh() {
            vscode.postMessage({ command: 'refresh' });
        }
        
        function toggleExpand(index) {
            const contentElement = document.getElementById('content-' + index);
            const fadeElement = document.getElementById('fade-' + index);
            const buttonElement = document.getElementById('btn-' + index);
            
            if (!contentElement || !buttonElement) {
                return;
            }
            
            const isExpanded = contentElement.classList.contains('suggestion-expanded');
            const fullContent = contentElement.getAttribute('data-full-content');
            
            if (isExpanded) {
                // Collapse
                contentElement.classList.remove('suggestion-expanded');
                contentElement.classList.add('suggestion-expandable');
                if (fadeElement) fadeElement.style.display = 'block';
                buttonElement.textContent = 'Show More';
                
                // Show truncated content
                if (fullContent) {
                    const truncated = fullContent.length > 200 ? fullContent.substring(0, 200) + '...' : fullContent;
                    contentElement.innerHTML = truncated.replace(/\\n/g, '<br>') + (fadeElement ? '<div class="suggestion-fade" id="fade-' + index + '"></div>' : '');
                }
            } else {
                // Expand
                contentElement.classList.remove('suggestion-expandable');
                contentElement.classList.add('suggestion-expanded');
                if (fadeElement) fadeElement.style.display = 'none';
                buttonElement.textContent = 'Show Less';
                
                // Show full content
                if (fullContent) {
                    contentElement.innerHTML = fullContent.replace(/\\n/g, '<br>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
                }
            }
        }
    </script>
</body>
</html>`;
  }
}
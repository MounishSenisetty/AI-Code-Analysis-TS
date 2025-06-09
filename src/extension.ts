import * as vscode from 'vscode';
import { LLMService } from './llmService';
import { AIAssistantViewProvider } from './aiAssistantViewProvider';
import { WebviewPanelManager } from './webviewPanels';
import { PromptFactory } from './promptFactory';
import { ModelConfig } from './types';

let llmService: LLMService;
let aiAssistantProvider: AIAssistantViewProvider;

export function activate(context: vscode.ExtensionContext) {
  console.log('AI Assistant extension is now active!');

  // Initialize services - LLMService will auto-detect the best provider
  llmService = new LLMService();
  aiAssistantProvider = new AIAssistantViewProvider(context.extensionUri, llmService);

  // Register the webview view provider
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      AIAssistantViewProvider.viewType, 
      aiAssistantProvider
    )
  );

  // Register commands
  const commands = [
    vscode.commands.registerCommand('aiAssistant.toggleView', async () => {
      await vscode.commands.executeCommand('workbench.view.extension.aiAssistantView');
      await vscode.commands.executeCommand('aiAssistant.sidebarView.focus');
    }),

    vscode.commands.registerCommand('aiAssistant.generateVulnerabilityReport', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('Please open a code file to generate a vulnerability report.');
        return;
      }

      // LLMService already auto-detected the best provider
      if (!llmService.isConfigured()) {
        vscode.window.showErrorMessage(`Please configure your AI provider settings.`);
        return;
      }

      const document = editor.document;
      const context = {
        language: document.languageId,
        selectedText: '',
        fullContent: document.getText(),
        cursorContext: '',
        fileName: document.fileName
      };

      vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Generating vulnerability report...",
        cancellable: false
      }, async () => {
        try {
          const prompt = PromptFactory.createVulnerabilityReportPrompt(context);
          const response = await llmService.generateResponse(prompt);
          
          if (response.error) {
            vscode.window.showErrorMessage(`Failed to generate vulnerability report: ${response.error}`);
            return;
          }

          WebviewPanelManager.showVulnerabilityReport(response.content);
        } catch (error) {
          vscode.window.showErrorMessage(`Error generating vulnerability report: ${error}`);
        }
      });
    }),

    vscode.commands.registerCommand('aiAssistant.explainCode', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('Please open a code file and select some code to explain.');
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      
      if (!selectedText.trim()) {
        vscode.window.showWarningMessage('Please select some code to explain.');
        return;
      }

      // LLMService already auto-detected the best provider
      if (!llmService.isConfigured()) {
        vscode.window.showErrorMessage(`Please configure your AI provider settings.`);
        return;
      }

      const document = editor.document;
      const context = {
        language: document.languageId,
        selectedText,
        fullContent: document.getText(),
        cursorContext: selectedText,
        fileName: document.fileName
      };

      vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Explaining selected code...",
        cancellable: false
      }, async () => {
        try {
          const prompt = PromptFactory.createCodeExplanationPrompt(context);
          const response = await llmService.generateResponse(prompt);
          
          if (response.error) {
            vscode.window.showErrorMessage(`Failed to explain code: ${response.error}`);
            return;
          }

          WebviewPanelManager.showCodeExplanation(response.content);
        } catch (error) {
          vscode.window.showErrorMessage(`Error explaining code: ${error}`);
        }
      });
    }),

    vscode.commands.registerCommand('aiAssistant.suggestRefactoring', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('Please open a code file and select some code to refactor.');
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      
      if (!selectedText.trim()) {
        vscode.window.showWarningMessage('Please select some code to refactor.');
        return;
      }

      // LLMService already auto-detected the best provider
      if (!llmService.isConfigured()) {
        vscode.window.showErrorMessage(`Please configure your AI provider settings.`);
        return;
      }

      const document = editor.document;
      const context = {
        language: document.languageId,
        selectedText,
        fullContent: document.getText(),
        cursorContext: selectedText,
        fileName: document.fileName
      };

      vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Generating refactoring suggestions...",
        cancellable: false
      }, async () => {
        try {
          const prompt = PromptFactory.createRefactoringPrompt(context);
          const response = await llmService.generateResponse(prompt);
          
          if (response.error) {
            vscode.window.showErrorMessage(`Failed to generate refactoring suggestions: ${response.error}`);
            return;
          }

          WebviewPanelManager.showRefactoringSuggestions(response.content);
        } catch (error) {
          vscode.window.showErrorMessage(`Error generating refactoring suggestions: ${error}`);
        }
      });
    }),

    vscode.commands.registerCommand('aiAssistant.getTestIdeas', async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage('Please open a code file and select some code to generate test ideas for.');
        return;
      }

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      
      if (!selectedText.trim()) {
        vscode.window.showWarningMessage('Please select some code to generate test ideas for.');
        return;
      }

      // LLMService already auto-detected the best provider
      if (!llmService.isConfigured()) {
        vscode.window.showErrorMessage(`Please configure your AI provider settings.`);
        return;
      }

      const document = editor.document;
      const context = {
        language: document.languageId,
        selectedText,
        fullContent: document.getText(),
        cursorContext: selectedText,
        fileName: document.fileName
      };

      vscode.window.withProgress({
        location: vscode.ProgressLocation.Notification,
        title: "Generating test case ideas...",
        cancellable: false
      }, async () => {
        try {
          const prompt = PromptFactory.createTestIdeasPrompt(context);
          const response = await llmService.generateResponse(prompt);
          
          if (response.error) {
            vscode.window.showErrorMessage(`Failed to generate test ideas: ${response.error}`);
            return;
          }

          WebviewPanelManager.showTestIdeas(response.content);
        } catch (error) {
          vscode.window.showErrorMessage(`Error generating test ideas: ${error}`);
        }
      });
    })
  ];

  context.subscriptions.push(...commands);

  // Listen for configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration('aiAssistant')) {
        llmService.refreshConfiguration();
      }
    })
  );

  // Set context for when view should be visible
  vscode.commands.executeCommand('setContext', 'aiAssistant.viewVisible', true);

  // Show welcome message on first install
  const hasShownWelcome = context.globalState.get('aiAssistant.hasShownWelcome', false);
  if (!hasShownWelcome) {
    vscode.window.showInformationMessage(
      'Welcome to AI Assistant! Configure your Gemini API key in settings to get started.',
      'Open Settings'
    ).then(selection => {
      if (selection === 'Open Settings') {
        vscode.commands.executeCommand('workbench.action.openSettings', 'aiAssistant.gemini.apiKey');
      }
    });
    context.globalState.update('aiAssistant.hasShownWelcome', true);
  }
}

export function deactivate() {
  console.log('AI Assistant extension is now deactivated!');
}
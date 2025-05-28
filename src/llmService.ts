import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import * as vscode from 'vscode';
import { LLMResponse, ContextualSuggestion } from './types';

export class LLMService {
  private model: ChatGoogleGenerativeAI | null = null;
  private apiKey: string = 'AIzaSyBEerOO5jAJRt5ccFyHjniaUptzdS3vx0I';
  private modelName: string = 'gemini-2.0-flash';
  constructor() {
    console.log('AI Assistant: LLMService constructor called');
    this.loadConfiguration();
    this.initializeModel();
    console.log('AI Assistant: LLMService initialized - apiKey:', !!this.apiKey, 'model:', !!this.model);
  }
  private loadConfiguration(): void {
    const config = vscode.workspace.getConfiguration('aiAssistant');
    // this.apiKey = config.get<string>('gemini.apiKey') || '';
    // this.modelName = config.get<string>('gemini.modelName') || 'gemini-pro';
    this.apiKey = "AIzaSyBEerOO5jAJRt5ccFyHjniaUptzdS3vx0I";
    this.modelName = 'gemini-2.0-flash';
    console.log('AI Assistant: Configuration loaded - apiKey set:', !!this.apiKey, 'modelName:', this.modelName);
  }
  private initializeModel(): void {
    if (!this.apiKey) {
      console.warn('AI Assistant: No API key configured');
      return;
    }

    try {
      console.log('AI Assistant: Attempting to initialize Gemini model with API key:', this.apiKey.substring(0, 10) + '...');
      this.model = new ChatGoogleGenerativeAI({
        apiKey: this.apiKey,
        model: this.modelName,
        temperature: 0.0,
        maxOutputTokens: 4096,
      });
      console.log('AI Assistant: Gemini model initialized successfully');
    } catch (error) {
      console.error('AI Assistant: Failed to initialize Gemini model:', error);
      vscode.window.showErrorMessage(
        'AI Assistant: Failed to initialize Gemini model. Please check your API key.'
      );
    }
  }

  public async generateResponse(prompt: string): Promise<LLMResponse> {
    if (!this.model) {
      if (!this.apiKey) {
        const response: LLMResponse = {
          content: '',
          error: 'No API key configured. Please set your Gemini API key in settings.'
        };
        return response;
      } else {
        this.initializeModel();
        if (!this.model) {
          const response: LLMResponse = {
            content: '',
            error: 'Failed to initialize AI model. Please check your API key and try again.'
          };
          return response;
        }
      }
    }

    try {
      const result = await this.model.invoke(prompt);
      const response: LLMResponse = {
        content: typeof result.content === 'string' ? result.content : String(result.content)
      };
      return response;
    } catch (error) {
      console.error('AI Assistant: LLM request failed:', error);
      const response: LLMResponse = {
        content: '',
        error: `AI request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
      return response;
    }
  }

  public async generateContextualSuggestions(prompt: string): Promise<ContextualSuggestion[]> {
    try {
      const response = await this.generateResponse(prompt);
      
      if (response.error) {
        console.error('AI Assistant: Failed to generate suggestions:', response.error);
        return [];
      }

      // Try to parse JSON response
      try {
        const suggestions = JSON.parse(response.content) as ContextualSuggestion[];
        return Array.isArray(suggestions) ? suggestions.slice(0, 3) : [];
      } catch (parseError) {
        console.error('AI Assistant: Failed to parse suggestions JSON:', parseError);
        // Fallback: create a single suggestion from the raw response
        return [{
          type: 'explanation',
          content: response.content.substring(0, 100) + '...',
          severity: 'low'
        }];
      }
    } catch (error) {
      console.error('AI Assistant: Error generating contextual suggestions:', error);
      return [];
    }
  }  public isConfigured(): boolean {
    // For development with hardcoded API key, just check if we have an API key
    // The model will be initialized when needed
    console.log('AI Assistant: isConfigured check - apiKey:', !!this.apiKey, 'model:', !!this.model);
    return !!this.apiKey;
  }

  public refreshConfiguration(): void {
    this.loadConfiguration();
    this.initializeModel();
  }
}
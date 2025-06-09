import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { Ollama } from 'ollama';
import * as vscode from 'vscode';
import { LLMResponse, ContextualSuggestion, ModelProvider, ModelConfig } from './types';

export class LLMService {
  private geminiModel: ChatGoogleGenerativeAI | null = null;
  private ollamaClient: Ollama | null = null;
  private currentConfig: ModelConfig;
  private apiKey: string = 'YOUR APIKEY';
    constructor(config?: ModelConfig) {
    console.log('AI Assistant: LLMService constructor called');
    
    // Will be set by auto-detection
    this.currentConfig = config || {
      provider: 'gemini',
      model: 'gemini-1.5-flash',
      apiKey: this.apiKey
    };
    
    this.autoDetectAndInitialize();
  }
  private async autoDetectAndInitialize(): Promise<void> {
    console.log('AI Assistant: Auto-detecting available models...');
    
    // First, try to detect if Ollama is available
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        const data: any = await response.json();
        console.log('AI Assistant: Ollama detected, available models:', data.models?.length || 0);
        
        // Use the first available model or default to qwen2.5-coder:3b
        let selectedModel = 'qwen2.5-coder:3b';
        if (data.models && data.models.length > 0) {
          // Prefer code-specific models if available
          const codeModels = data.models.filter((m: any) => 
            m.name.includes('coder') || m.name.includes('code') || m.name.includes('qwen')
          );
          if (codeModels.length > 0) {
            selectedModel = codeModels[0].name;
          } else {
            selectedModel = data.models[0].name;
          }
        }
          this.currentConfig = {
          provider: 'ollama',
          model: selectedModel,
          baseUrl: 'http://localhost:11434'
        };
        
        console.log('AI Assistant: Using Ollama with model:', selectedModel);
        vscode.window.showInformationMessage(`🤖 Using Ollama (Local AI) - ${selectedModel}`);
        this.initializeOllama();
        return;
      }
    } catch (error) {
      console.log('AI Assistant: Ollama not available, falling back to Gemini');
    }
      // Fallback to Gemini
    this.currentConfig = {
      provider: 'gemini',
      model: 'gemini-1.5-flash',
      apiKey: this.apiKey
    };
    
    console.log('AI Assistant: Using Gemini model');
    vscode.window.showInformationMessage('☁️ Using Gemini (Cloud AI) - gemini-1.5-flash');
    this.loadConfiguration();
    this.initializeModel();
  }private loadConfiguration(): void {
    const config = vscode.workspace.getConfiguration('aiAssistant');
    
    // Use current config or load from settings
    if (!this.currentConfig.apiKey) {
      this.currentConfig.apiKey = config.get<string>('gemini.apiKey') || this.apiKey;
    }
    
    console.log('AI Assistant: Configuration loaded - provider:', this.currentConfig.provider, 'model:', this.currentConfig.model);
  }

  private initializeModel(): void {
    try {
      if (this.currentConfig.provider === 'gemini') {
        this.initializeGemini();
      } else if (this.currentConfig.provider === 'ollama') {
        this.initializeOllama();
      }
    } catch (error) {
      console.error('AI Assistant: Failed to initialize model:', error);
      vscode.window.showErrorMessage(
        `AI Assistant: Failed to initialize ${this.currentConfig.provider} model.`
      );
    }
  }

  private initializeGemini(): void {
    if (!this.currentConfig.apiKey) {
      console.warn('AI Assistant: No API key configured for Gemini');
      return;
    }

    console.log('AI Assistant: Initializing Gemini model:', this.currentConfig.model);
    this.geminiModel = new ChatGoogleGenerativeAI({
      apiKey: this.currentConfig.apiKey,
      model: this.currentConfig.model,
      temperature: 0.0,
      maxOutputTokens: 4096,
    });
    console.log('AI Assistant: Gemini model initialized successfully');
  }
  private initializeOllama(): void {
    const baseUrl = this.currentConfig.baseUrl || 'http://localhost:11434';
    console.log('AI Assistant: Initializing Ollama client with baseUrl:', baseUrl);
    
    this.ollamaClient = new Ollama({
      host: baseUrl
    });
    console.log('AI Assistant: Ollama client initialized successfully');
  }public async generateResponse(prompt: string): Promise<LLMResponse> {
    const model = this.isModelInitialized();
    
    if (!model) {
      if (this.currentConfig.provider === 'gemini' && !this.currentConfig.apiKey) {
        return {
          content: '',
          error: 'No API key configured. Please set your Gemini API key in settings.'
        };
      } else {
        this.initializeModel();
        const retryModel = this.isModelInitialized();
        if (!retryModel) {
          return {
            content: '',
            error: `Failed to initialize ${this.currentConfig.provider} model. Please check your configuration.`
          };
        }
      }
    }    try {
      let content: string;
      
      if (this.currentConfig.provider === 'gemini' && this.geminiModel) {
        const result = await this.geminiModel.invoke(prompt);
        content = typeof result.content === 'string' ? result.content : String(result.content);
      } else if (this.currentConfig.provider === 'ollama' && this.ollamaClient) {
        console.log('AI Assistant: Making Ollama request with model:', this.currentConfig.model);
        const response = await this.ollamaClient.chat({
          model: this.currentConfig.model,
          messages: [{ role: 'user', content: prompt }],
          stream: false
        });
        content = response.message.content;
        console.log('AI Assistant: Ollama response received, length:', content.length);
      } else {
        throw new Error(`No valid model available for provider: ${this.currentConfig.provider}`);
      }

      return { content };
    } catch (error) {
      console.error('AI Assistant: LLM request failed:', error);
        // Provide more specific error messages for different providers
      if (this.currentConfig.provider === 'gemini') {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('fetch failed') || errorMessage.includes('token')) {
          return {
            content: '',
            error: `Gemini API connection failed. Please check your internet connection and API key. Try using a local Ollama model instead.`
          };
        } else if (errorMessage.includes('API key')) {
          return {
            content: '',
            error: `Invalid Gemini API key. Please check your API key in settings or generate a new one from Google AI Studio.`
          };
        } else if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
          return {
            content: '',
            error: `Gemini API quota exceeded. Please wait or try using a local Ollama model.`
          };
        }
      } else if (this.currentConfig.provider === 'ollama') {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('fetch')) {
          return {
            content: '',
            error: `Ollama server not running. Please start Ollama with: ollama serve`
          };
        } else if (errorMessage.includes('model')) {
          return {
            content: '',
            error: `Model '${this.currentConfig.model}' not found. Pull it with: ollama pull ${this.currentConfig.model}`
          };
        }
      }
      
      return {
        content: '',
        error: `AI request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
  private isModelInitialized(): boolean {
    if (this.currentConfig.provider === 'gemini') {
      return !!this.geminiModel;
    } else if (this.currentConfig.provider === 'ollama') {
      return !!this.ollamaClient;
    }
    return false;
  }
  public async generateContextualSuggestions(prompt: string): Promise<ContextualSuggestion[]> {
    try {
      const response = await this.generateResponse(prompt);
      
      if (response.error) {
        console.error('AI Assistant: Failed to generate suggestions:', response.error);
        return [];
      }

      // Clean up the response first
      let cleanResponse = response.content.trim();
      
      // Remove common AI response wrappers
      cleanResponse = cleanResponse.replace(/^```json\s*/i, '');
      cleanResponse = cleanResponse.replace(/\s*```$/i, '');
      cleanResponse = cleanResponse.replace(/^```\s*/, '');
      cleanResponse = cleanResponse.replace(/\s*```$/, '');
      
      // Find JSON array in the response
      const jsonMatch = cleanResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        cleanResponse = jsonMatch[0];
      }

      // Try to parse JSON response
      try {
        const suggestions = JSON.parse(cleanResponse) as ContextualSuggestion[];
        if (Array.isArray(suggestions)) {
          return suggestions.slice(0, 3).map(suggestion => ({
            type: suggestion.type || 'explanation',
            content: suggestion.content || 'No content provided',
            severity: suggestion.severity || 'low'
          }));
        }
      } catch (parseError) {
        console.error('AI Assistant: Failed to parse suggestions JSON:', parseError);
        console.log('AI Assistant: Raw response:', response.content);
      }

      // Fallback: create a single suggestion from the raw response
      let fallbackContent = response.content.trim();
      
      // Remove JSON formatting artifacts if present
      fallbackContent = fallbackContent.replace(/```json\s*/gi, '');
      fallbackContent = fallbackContent.replace(/\s*```/g, '');
      fallbackContent = fallbackContent.replace(/^\[?\s*\{?/, '');
      fallbackContent = fallbackContent.replace(/\}?\s*\]?$/, '');
      
      // Clean up common JSON artifacts
      fallbackContent = fallbackContent.replace(/"type":\s*"[^"]*",?\s*/gi, '');
      fallbackContent = fallbackContent.replace(/"content":\s*"/gi, '');
      fallbackContent = fallbackContent.replace(/"severity":\s*"[^"]*",?\s*/gi, '');
      fallbackContent = fallbackContent.replace(/",?\s*$/, '');
      fallbackContent = fallbackContent.replace(/^"/, '');
      
      if (fallbackContent && fallbackContent.length > 10) {
        return [{
          type: 'explanation',
          content: fallbackContent,
          severity: 'low'
        }];
      }

      return [];
    } catch (error) {
      console.error('AI Assistant: Error generating contextual suggestions:', error);
      return [];
    }
  }  public isConfigured(): boolean {
    if (this.currentConfig.provider === 'gemini') {
      return !!this.currentConfig.apiKey;
    } else if (this.currentConfig.provider === 'ollama') {
      return true; // Ollama doesn't require API key, just assumes it's running locally
    }
    return false;
  }

  public refreshConfiguration(): void {
    this.loadConfiguration();
    this.initializeModel();
  }

  public switchModel(config: ModelConfig): void {
    console.log('AI Assistant: Switching to provider:', config.provider, 'model:', config.model);
    this.currentConfig = { ...config };
    if (!this.currentConfig.apiKey && config.provider === 'gemini') {
      this.currentConfig.apiKey = this.apiKey; // fallback to hardcoded key
    }
    this.initializeModel();
  }

  public getCurrentProvider(): ModelProvider {
    return this.currentConfig.provider;
  }

  public getCurrentModel(): string {
    return this.currentConfig.model;
  }
}

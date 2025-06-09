export interface LLMResponse {
  content: string;
  error?: string;
}

export interface ContextualSuggestion {
  type: 'explanation' | 'optimization' | 'best-practice' | 'warning';
  content: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface VulnerabilityReport {
  vulnerabilities: Vulnerability[];
  summary: string;
  totalCount: number;
}

export interface Vulnerability {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  location?: string;
  mitigation?: string;
  cweId?: string;
}

export interface CodeExplanation {
  summary: string;
  details: string;
  purpose: string;
  workingMechanism: string;
}

export interface RefactoringSuggestion {
  title: string;
  description: string;
  beforeCode: string;
  afterCode: string;
  benefits: string[];
  complexity: 'low' | 'medium' | 'high';
}

export interface TestCaseIdea {
  type: 'unit' | 'integration' | 'edge-case' | 'performance' | 'security';
  description: string;
  testScenario: string;
  expectedBehavior: string;
}

// Model Provider Interfaces
export type ModelProvider = 'gemini' | 'ollama';

export interface ModelConfig {
  provider: ModelProvider;
  model: string;
  apiKey?: string;
  baseUrl?: string;
}

export interface ProviderOption {
  label: string;
  description: string;
  provider: ModelProvider;
  model: string;
  detail?: string;
}

export interface WebviewMessage {
  command: string;
  data?: any;
}

export interface CodeContext {
  language: string;
  selectedText: string;
  fullContent: string;
  cursorContext: string;
  fileName: string;
}
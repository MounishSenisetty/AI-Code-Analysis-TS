import { CodeContext } from './types';

export class PromptFactory {
  static createContextualSuggestionPrompt(context: CodeContext): string {
    return `You are an expert code assistant. Analyze the following code snippet and provide 1-3 brief, actionable suggestions.

Language: ${context.language}
File: ${context.fileName}
Code around cursor:
\`\`\`${context.language}
${context.cursorContext}
\`\`\`

Focus on:
- Code quality improvements
- Potential bugs or issues
- Best practices
- Performance optimizations

Respond with a JSON array of suggestions in this format:
[
  {
    "type": "explanation|optimization|best-practice|warning",
    "content": "Brief suggestion text (max 100 characters)",
    "severity": "low|medium|high"
  }
]

Keep suggestions concise and actionable. Only include the JSON array in your response.`;
  }

  static createVulnerabilityReportPrompt(context: CodeContext): string {
    return `You are a security expert analyzing code for vulnerabilities. Perform a comprehensive security analysis of the following ${context.language} code.

File: ${context.fileName}
Code:
\`\`\`${context.language}
${context.fullContent}
\`\`\`

Analyze for common vulnerabilities including but not limited to:
- Injection attacks (SQL, NoSQL, Command, etc.)
- Cross-Site Scripting (XSS)
- Insecure authentication/authorization
- Sensitive data exposure
- Security misconfigurations
- Insecure dependencies
- Cryptographic issues
- Buffer overflows
- Input validation issues

Provide a detailed report in the following Markdown format:

# Security Analysis Report

## Executive Summary
[Brief overview of findings]

## Vulnerabilities Found

### [Vulnerability Title]
- **Severity:** Critical/High/Medium/Low
- **Description:** [Detailed description]
- **Location:** [Code location if applicable]
- **CWE ID:** [If applicable]
- **Mitigation:** [Specific steps to fix]

## Recommendations
[General security recommendations]

If no vulnerabilities are found, state that clearly and provide general security best practices for the codebase.`;
  }

  static createCodeExplanationPrompt(context: CodeContext): string {
    return `You are an expert code instructor. Explain the following ${context.language} code in detail.

Selected Code:
\`\`\`${context.language}
${context.selectedText}
\`\`\`

Provide a comprehensive explanation in Markdown format covering:

# Code Explanation

## Summary
[One-sentence summary of what this code does]

## Purpose
[Why this code exists and its role in the application]

## How It Works
[Step-by-step breakdown of the code's execution]

## Key Concepts
[Important programming concepts demonstrated]

## Dependencies
[External libraries, modules, or services used]

## Potential Issues
[Any concerns or areas for improvement]

Make the explanation clear for developers of varying experience levels.`;
  }

  static createRefactoringPrompt(context: CodeContext): string {
    return `You are a senior software engineer specializing in code refactoring. Analyze the following ${context.language} code and suggest improvements.

Selected Code:
\`\`\`${context.language}
${context.selectedText}
\`\`\`

Provide refactoring suggestions in the following Markdown format:

# Refactoring Suggestions

## Overview
[Brief assessment of the current code]

## Suggested Improvements

### 1. [Improvement Title]
**Benefits:** [List of benefits]
**Complexity:** Low/Medium/High

**Current Code:**
\`\`\`${context.language}
${context.selectedText}
\`\`\`

**Refactored Code:**
\`\`\`${context.language}
[Your improved version]
\`\`\`

**Explanation:** [Why this improvement helps]

[Continue with additional improvements as needed]

## Summary
[Overall impact of suggested changes]

Focus on:
- Code readability and maintainability
- Performance optimizations
- Design patterns
- Error handling
- Code organization
- Best practices for ${context.language}`;
  }

  static createTestIdeasPrompt(context: CodeContext): string {
    return `You are a QA engineer and testing expert. Analyze the following ${context.language} code and suggest comprehensive test cases.

Selected Code:
\`\`\`${context.language}
${context.selectedText}
\`\`\`

Provide test case ideas in the following Markdown format:

# Test Case Ideas

## Code Analysis
[Brief description of what the code does]

## Test Categories

### Unit Tests
[Test cases for individual functions/methods]

### Integration Tests
[Test cases for component interactions]

### Edge Cases
[Boundary conditions and unusual inputs]

### Error Handling Tests
[Invalid inputs and error scenarios]

### Performance Tests
[Load and performance considerations]

### Security Tests
[Security-related test scenarios if applicable]

For each test case, include:
- **Test Scenario:** [What you're testing]
- **Input:** [Test data/conditions]
- **Expected Output:** [Expected result]
- **Purpose:** [Why this test is important]

## Testing Framework Recommendations
[Suggest appropriate testing frameworks for ${context.language}]

Focus on practical, implementable test cases that provide good coverage.`;
  }
}
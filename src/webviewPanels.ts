import * as vscode from 'vscode';

export class WebviewPanelManager {
  private static panels: Map<string, vscode.WebviewPanel> = new Map();

  public static createOrShowPanel(
    type: string,
    title: string,
    content: string,
    viewColumn: vscode.ViewColumn = vscode.ViewColumn.One
  ): vscode.WebviewPanel {
    const columnKey = `${type}-${viewColumn}`;
    
    // Check if panel already exists
    const existingPanel = this.panels.get(columnKey);
    if (existingPanel) {
      existingPanel.title = title;
      existingPanel.webview.html = this.getWebviewContent(title, content);
      existingPanel.reveal(viewColumn);
      return existingPanel;
    }

    // Create new panel
    const panel = vscode.window.createWebviewPanel(
      type,
      title,
      viewColumn,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        enableFindWidget: true,
      }
    );

    panel.webview.html = this.getWebviewContent(title, content);

    // Handle panel disposal
    panel.onDidDispose(() => {
      this.panels.delete(columnKey);
    });

    this.panels.set(columnKey, panel);
    return panel;
  }

  private static getWebviewContent(title: string, content: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            line-height: 1.6;
            margin: 0;
            padding: 20px;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: var(--vscode-titleBar-activeForeground);
            margin-top: 24px;
            margin-bottom: 16px;
        }
        
        h1 {
            border-bottom: 1px solid var(--vscode-panel-border);
            padding-bottom: 8px;
        }
        
        code {
            background-color: var(--vscode-textCodeBlock-background);
            color: var(--vscode-textPreformat-foreground);
            padding: 2px 4px;
            border-radius: 3px;
            font-family: var(--vscode-editor-font-family);
        }
        
        pre {
            background-color: var(--vscode-textCodeBlock-background);
            border: 1px solid var(--vscode-panel-border);
            border-radius: 6px;
            padding: 16px;
            overflow-x: auto;
            margin: 16px 0;
        }
        
        pre code {
            background: none;
            padding: 0;
        }
        
        blockquote {
            border-left: 4px solid var(--vscode-textBlockQuote-border);
            background-color: var(--vscode-textBlockQuote-background);
            margin: 16px 0;
            padding: 8px 16px;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 16px 0;
        }
        
        th, td {
            border: 1px solid var(--vscode-panel-border);
            padding: 8px 12px;
            text-align: left;
        }
        
        th {
            background-color: var(--vscode-list-hoverBackground);
            font-weight: bold;
        }
        
        ul, ol {
            padding-left: 24px;
            margin: 16px 0;
        }
        
        li {
            margin: 4px 0;
        }
        
        .vulnerability-critical {
            border-left: 4px solid #dc3545;
            background-color: rgba(220, 53, 69, 0.1);
            padding: 12px;
            margin: 8px 0;
        }
        
        .vulnerability-high {
            border-left: 4px solid #fd7e14;
            background-color: rgba(253, 126, 20, 0.1);
            padding: 12px;
            margin: 8px 0;
        }
        
        .vulnerability-medium {
            border-left: 4px solid #ffc107;
            background-color: rgba(255, 193, 7, 0.1);
            padding: 12px;
            margin: 8px 0;
        }
        
        .vulnerability-low {
            border-left: 4px solid #20c997;
            background-color: rgba(32, 201, 151, 0.1);
            padding: 12px;
            margin: 8px 0;
        }
        
        .loading {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            color: var(--vscode-descriptionForeground);
        }
        
        .error {
            color: var(--vscode-errorForeground);
            background-color: var(--vscode-inputValidation-errorBackground);
            border: 1px solid var(--vscode-inputValidation-errorBorder);
            padding: 16px;
            border-radius: 6px;
            margin: 16px 0;
        }
        
        .success {
            color: var(--vscode-gitDecoration-addedResourceForeground);
            background-color: rgba(0, 255, 0, 0.1);
            padding: 16px;
            border-radius: 6px;
            margin: 16px 0;
        }
    </style>
</head>
<body>
    <div id="content">${this.markdownToHtml(content)}</div>
</body>
</html>`;
  }

  private static markdownToHtml(markdown: string): string {
    // Basic markdown to HTML conversion for fallback
    return markdown
      .replace(/### (.*?)$/gm, '<h3>$1</h3>')
      .replace(/## (.*?)$/gm, '<h2>$1</h2>')
      .replace(/# (.*?)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
      .replace(/\n/g, '<br>');
  }

  public static showVulnerabilityReport(content: string): void {
    this.createOrShowPanel(
      'aiAssistant.vulnerabilityReport',
      'Security Vulnerability Report',
      content,
      vscode.ViewColumn.One
    );
  }

  public static showCodeExplanation(content: string): void {
    this.createOrShowPanel(
      'aiAssistant.codeExplanation',
      'Code Explanation',
      content,
      vscode.ViewColumn.One
    );
  }

  public static showRefactoringSuggestions(content: string): void {
    this.createOrShowPanel(
      'aiAssistant.refactoring',
      'Refactoring Suggestions',
      content,
      vscode.ViewColumn.One
    );
  }

  public static showTestIdeas(content: string): void {
    this.createOrShowPanel(
      'aiAssistant.testIdeas',
      'Test Case Ideas',
      content,
      vscode.ViewColumn.One
    );
  }
}
import * as vscode from 'vscode';
import documentTree from 'document-tree';

import selection from './selection';

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.generateDocumentTree', async () => {
    const selectedText = selection.getText();

    if (!selectedText) {
      return;
    }

    const tree = documentTree.generate(selectedText);

    const doc = await vscode.workspace.openTextDocument({
      content: JSON.stringify(tree, null, 2),
      language: 'json'
    });

    await vscode.window.showTextDocument(doc);
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

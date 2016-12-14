'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument } from 'vscode';
import * as fs from 'fs';

import * as models from './models';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    let updater = new CurrentlyListeningUpdater();
    updater.startListening();

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand('extension.sayHello', () => {
        // updater.startListening();
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(updater);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class CurrentlyListeningUpdater {
    playbackJsonPath: string = process.env.APPDATA + '/Google Play Music Desktop Player/json_store/playback.json';
    _statusBarItem: StatusBarItem;

    public startListening(): void {
        fs.watchFile(this.playbackJsonPath, { interval: 1000 }, (curr: fs.Stats, prev: fs.Stats) => {
            this.update();
        });
    }

    private update(): void {
        if (!this._statusBarItem)
            this._statusBarItem = window.createStatusBarItem(StatusBarAlignment.Right);

        let editor = window.activeTextEditor;
        if (!editor) {
            this._statusBarItem.hide();

            return;
        }

        fs.readFile(this.playbackJsonPath, (err: NodeJS.ErrnoException, data: Buffer) => {
            let playback: models.Playback = new models.Playback(JSON.parse(data.toString()));

            this._statusBarItem.text = playback.currentSong;
            this._statusBarItem.show();
        })
    }

    dispose(): void {
        this._statusBarItem.dispose();
    }
}
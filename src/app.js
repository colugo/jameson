// Here is the starting point for your application code.

// Small helpers you might want to keep
import './helpers/context_menu.js';


import { remote } from 'electron';
import jetpack from 'fs-jetpack';
const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());
plainEnglishReplacements = appDir.read('plainEnglishReplacements.json', 'json');
setupReplacementWords();

function setupReplacementWords(){
  var plainEnglishReplacementsKeywordString = "";
  for(var key in plainEnglishReplacements)
  {
    plainEnglishReplacementsKeywordString = plainEnglishReplacementsKeywordString + "\\b" + key + "\\b|";
  }
  plainEnglishReplacementsKeywordString = plainEnglishReplacementsKeywordString.substring(0, plainEnglishReplacementsKeywordString.length - 1);
  plainEnglishReplacementsRegex = new RegExp(plainEnglishReplacementsKeywordString, 'i');
}



import SimpleMDE from 'simplemde';
import { setup } from './editor/setup';
jamesonEditor = setup();


/*

// All stuff below is just to show you how it works. You can delete all of it.
import { remote } from 'electron';
import jetpack from 'fs-jetpack';
import { greet } from './hello_world/hello_world';
import env from './env';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files form disk like it's node.js! Welcome to Electron world :)
const manifest = appDir.read('package.json', 'json');

const osMap = {
  win32: 'Windows',
  darwin: 'macOS',
  linux: 'Linux',
};

document.querySelector('#greet').innerHTML = greet();
document.querySelector('#os').innerHTML = osMap[process.platform];
document.querySelector('#author').innerHTML = manifest.author;
document.querySelector('#env').innerHTML = env.name;
document.querySelector('#electron-version').innerHTML = process.versions.electron;

*/

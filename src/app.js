// Here is the starting point for your application code.

// Small helpers you might want to keep
import './helpers/context_menu.js';
var md5 = require('md5');
import { remote } from 'electron';
import jetpack from 'fs-jetpack';
const app = remote.app;
const BrowserWindow = remote.BrowserWindow;
const dialog = remote.dialog;
const appDir = jetpack.cwd(app.getAppPath());
var textMD5 = "";


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

const ipcRenderer = require('electron').ipcRenderer;

ipcRenderer.on('open', (event) => {
  showModal();
});

function _open(){
  var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
  closeModal();
  dialog.showOpenDialog((fileNames) => {
    // fileNames is an array that contains all the selected
    if(fileNames === undefined){
        console.log("No file selected");
        return;
    }

    fs.readFile(fileNames[0], 'utf-8', (err, data) => {
      if(err){
          alert("An error ocurred reading the file :" + err.message);
          return;
      }

      jamesonEditor.codemirror.setValue(data);
      textMD5 = md5(jamesonEditor.codemirror.getValue());
    });
  });
}

function closeModal(){
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
}

function showModal(){


  $('#modal-header-content').text("You have unsaved changes!");
  $('.modal-body').html("<p>You will lose your chanages if you open another document.</p><p>Are you sure you want to do this?</p>");

/*
  var btn = document.createElement("BUTTON");
  $('.modal-footer').appendChild(btn);
*/

  var buttonDiv = document.getElementById('modal-footer');
  buttonDiv.innerHTML = "";

  var okButton = document.createElement("button");
  okButton.innerHTML="Yes, I'm OK to lose my changes";
  buttonDiv.appendChild(okButton);
  okButton.addEventListener ("click", _open);

  var noButton = document.createElement("button");
  noButton.innerHTML="No, I want to keep my changes";
  buttonDiv.appendChild(noButton);
  noButton.addEventListener ("click", closeModal);


  // Get the modal
  var modal = document.getElementById('myModal');
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  $('.close').on('click', closeModal);

}
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

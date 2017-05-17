import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';
import createWindow from '../helpers/window';


export const fileMenuTemplate = {
  label: 'File',
  submenu: [
    {
      label: 'New',
      accelerator: 'CmdOrCtrl+N',
      click: () => {
        newWindow();
      },
    },
    {
      label: 'Open',
      accelerator: 'CmdOrCtrl+O',
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('open');
      },
    },
    {
      label: 'Save',
      accelerator: 'CmdOrCtrl+S',
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('save');
      },
    },
    {
      label: 'Save As',
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('saveas');
      },
    },
  {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    click: () => {
      BrowserWindow.getFocusedWindow().webContents.send('quit');
    },
  }],
};


function newWindow(){
  var newWindow = createWindow('main', {
   width: 1000,
   height: 600,
 });

 newWindow.loadURL(url.format({
   pathname: path.join(__dirname, 'app.html'),
   protocol: 'file:',
   slashes: true,
 }));
 return newWindow;
}

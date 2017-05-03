import { app, BrowserWindow } from 'electron';


export const fileMenuTemplate = {
  label: 'File',
  submenu: [
    {
      label: 'Open',
      accelerator: 'CmdOrCtrl+O',
      click: () => {
        BrowserWindow.getFocusedWindow().webContents.send('open');
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

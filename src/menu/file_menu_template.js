import { app, BrowserWindow } from 'electron';


export const fileMenuTemplate = {
  label: 'File',
  submenu: [{
    label: 'Open',
    accelerator: 'CmdOrCtrl+O',
    click: () => {
      BrowserWindow.getFocusedWindow().webContents.send('open');
    },
  },
  {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    click: () => {
      app.quit();
    },
  }],
};

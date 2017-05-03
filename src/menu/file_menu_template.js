import { app, BrowserWindow } from 'electron';


export const fileMenuTemplate = {
  label: 'File',
  submenu: [{
    label: 'Open',
    accelerator: 'CmdOrCtrl+O',
    click: () => {
      BrowserWindow.getFocusedWindow().webContents.send('open', 'whoooooooh!');
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

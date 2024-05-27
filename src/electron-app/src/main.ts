import { app, BrowserWindow, ipcMain } from "electron";
import AssociateInfo from "../../react-app/src/core/domain/interfaces/associate-info";

function createWindow() {
    let win = new BrowserWindow({
        width: 1600,
        height: 1024,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
    ipcMain.on('query-database', async (event, args: AssociateInfo) => {
        console.log(event);
        console.log(args);
    });

    createWindow();
});
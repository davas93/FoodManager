import { app, BrowserWindow, globalShortcut, screen } from 'electron';
import * as path from 'path';
import * as url from 'url';


let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
    serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            allowRunningInsecureContent: (serve) ? true : false,
            backgroundThrottling: false,
        },
    });

    win.setMenuBarVisibility(serve);
    win.maximize();

    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`),
        });
        win.loadURL('http://localhost:4200');
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }

    if (serve) {
        win.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
        app.exit();
    });

    return win;
}

try {
    app.commandLine.appendSwitch('lang', 'ru');
    app.commandLine.appendSwitch('disable-http-cache');

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    if (process.platform === 'win32') {
        app.setAppUserModelId('Food Manager');
    }

    app.on('ready', async () => setTimeout(() => {
        globalShortcut.register('CommandOrControl+R', () => false);
        globalShortcut.register('F5', () => false);

        createWindow();
    }, 400));

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });

} catch (e) {
    // Catch Error
    // throw e;
}

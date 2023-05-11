import { app, BrowserWindow } from 'electron';
import path from 'path'

const mode = process.argv[2];
if(mode === 'dev') {
    mainWindow.loadURL("http://localhost:3000/")
} else {
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname, './build/index.html'),
        protocol:'file:',
        slashes:true
    }))
}
//
//
// // 当 Electron 完成启动时调用此函数
// function createWindow() {
//     // 创建一个新的浏览器窗口
//     const win = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             // 加载 preload 脚本
//             preload: path.join(__dirname, 'preload.js')
//         }
//     });
//
//     // 加载应用程序的入口文件
//     win.loadFile(path.join(__dirname, '../client/index.html'));
// }
//
// // 等待 Electron 初始化完成后再创建窗口
// app.whenReady().then(() => {
//     createWindow();
// });

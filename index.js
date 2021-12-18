// アプリケーションの寿命の制御と、ネイティブなブラウザウインドウを作成するモジュール
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  // ブラウザウインドウを作成します。
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    alwaysOnTop: true
  })

  // laodURL
  mainWindow.loadURL('https://www.google.com/')
  // mainWindow.setIgnoreMouseEvents(true)

  // デベロッパー ツールを開きます。
  mainWindow.webContents.openDevTools()

  // ページ遷移後ロードが終わったら以下が実行される
  mainWindow.webContents.on('did-finish-load', ()=>{
    console.log("View");
    // win.show();
  });
}

// このメソッドは、Electron の初期化が完了し、
// ブラウザウインドウの作成準備ができたときに呼ばれます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // macOS では、Dock アイコンのクリック時に他に開いているウインドウがない
    // 場合、アプリのウインドウを再作成するのが一般的です。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// macOS を除き、全ウインドウが閉じられたときに終了します。 ユーザーが
// Cmd + Q で明示的に終了するまで、アプリケーションとそのメニューバーを
// アクティブにするのが一般的です。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const { SettingsStore } = require('./settings-store.cjs');
const settingsPath=()=>path.join(app.getPath('userData'),'settings.json');
let settingsStore;
app.whenReady().then(() => {
  settingsStore=new SettingsStore(settingsPath());
  const window = new BrowserWindow({ width: 1040, height: 740, minWidth: 850, minHeight: 680, autoHideMenuBar: true,
    title:'Конструктор пригласительных', icon:path.join(__dirname,'../assets/balloon.png'),
    webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false, sandbox: true } });
  window.webContents.session.webRequest.onBeforeRequest({ urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] }, (_details, callback) => callback({ cancel: true }));
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', event => event.preventDefault());
  window.loadFile(path.join(__dirname, 'index.html'));
});
ipcMain.handle('get-settings',async()=>({settings:await settingsStore.read(),path:settingsPath()}));
ipcMain.handle('save-locations',async(_event,locations)=>settingsStore.saveLocations(locations));
ipcMain.handle('confirm-location-delete',async(event,label)=>{
  const result=await dialog.showMessageBox(BrowserWindow.fromWebContents(event.sender),{type:'question',buttons:['Отмена','Удалить'],defaultId:0,cancelId:0,title:'Удалить локацию?',message:`Удалить локацию «${String(label).slice(0,100)}»?`,detail:'Удаление будет сохранено после нажатия «Сохранить» в настройках.'});
  return result.response===1;
});
ipcMain.handle('save-image', async (event, { data, filename }) => {
  if (typeof filename !== 'string' || !filename.endsWith('.jpg') || filename.length > 180 || /[<>:"/\\|?*\u0000-\u001f]/.test(filename) || typeof data !== 'string' || data.length > 100000000) throw new Error('Некорректное изображение');
  const prefix = 'data:image/jpeg;base64,';
  if (!data.startsWith(prefix)) throw new Error('Некорректный формат');
  const { canceled, filePath } = await dialog.showSaveDialog(BrowserWindow.fromWebContents(event.sender), {
    defaultPath: filename, filters: [{ name: 'JPEG', extensions: ['jpg'] }] });
  if (canceled) return false;
  await fs.writeFile(filePath, Buffer.from(data.slice(prefix.length), 'base64'));
  return true;
});
app.on('window-all-closed', () => app.quit());

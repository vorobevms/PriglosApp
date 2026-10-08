const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
app.whenReady().then(() => {
  const window = new BrowserWindow({ width: 1200, height: 850, minWidth: 850, minHeight: 650, autoHideMenuBar: true,
    webPreferences: { preload: path.join(__dirname, 'preload.cjs'), contextIsolation: true, nodeIntegration: false, sandbox: true } });
  window.webContents.session.webRequest.onBeforeRequest({ urls: ['http://*/*', 'https://*/*', 'ws://*/*', 'wss://*/*'] }, (_details, callback) => callback({ cancel: true }));
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', event => event.preventDefault());
  window.loadFile(path.join(__dirname, 'index.html'));
});
ipcMain.handle('save-image', async (event, { data, format }) => {
  if (!['png','jpg'].includes(format) || typeof data !== 'string' || data.length > 100000000) throw new Error('Некорректное изображение');
  const prefix = format === 'png' ? 'data:image/png;base64,' : 'data:image/jpeg;base64,';
  if (!data.startsWith(prefix)) throw new Error('Некорректный формат');
  const { canceled, filePath } = await dialog.showSaveDialog(BrowserWindow.fromWebContents(event.sender), {
    defaultPath: `Приглашение.${format}`, filters: [{ name: 'Изображение', extensions: [format] }] });
  if (canceled) return false;
  await fs.writeFile(filePath, Buffer.from(data.slice(prefix.length), 'base64'));
  return true;
});
app.on('window-all-closed', () => app.quit());

const templatePath = () => path.join(app.getPath('userData'), 'invitation-template.txt');
ipcMain.handle('get-template', async () => {
  try { return await fs.readFile(templatePath(), 'utf8'); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
});
ipcMain.handle('save-template', async (_event, data) => {
  if (typeof data !== 'string' || data.length > 35000000 || !/^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/.test(data)) throw new Error('Некорректный шаблон');
  await fs.mkdir(app.getPath('userData'), { recursive: true });
  await fs.writeFile(templatePath() + '.tmp', data);
  await fs.rename(templatePath() + '.tmp', templatePath());
});

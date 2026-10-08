const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktop', { getTemplate: () => ipcRenderer.invoke('get-template'), saveTemplate: data => ipcRenderer.invoke('save-template', data), saveImage: (data, format) => ipcRenderer.invoke('save-image', { data, format }) });

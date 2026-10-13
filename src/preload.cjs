const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktop', {
 saveImage:(data,filename)=>ipcRenderer.invoke('save-image',{data,filename}),
 getSettings:()=>ipcRenderer.invoke('get-settings'),
 saveLocations:locations=>ipcRenderer.invoke('save-locations',locations),
 confirmLocationDelete:label=>ipcRenderer.invoke('confirm-location-delete',label)
});

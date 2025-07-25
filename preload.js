const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  searchKeyword: (keyword) => ipcRenderer.invoke('search-and-load', keyword)
});
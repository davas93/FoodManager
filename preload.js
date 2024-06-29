const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    deleteUser: (uid) => new Promise((resolve, reject) => {
        ipcRenderer.once('delete-user-response', (event, response) => {
            if (response.success) {
                resolve(response);
            } else {
                reject(new Error(response.error));
            }
        });
        ipcRenderer.send('delete-user', uid);
    })
});

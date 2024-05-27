export default function IpcRenderer() {
    if (typeof window !== undefined && typeof window.require !== undefined) {
        try {
            return window.require('electron').ipcRenderer;
        } catch (error: any) {
            console.error('Error al cargar IpcRenderer, window, window.require o window.require("electron").ipcRenderer no están disponibles.');
        }
    } else {
        console.log('ipcRenderer no disponible, se omite funcionalidad.');
    }
}
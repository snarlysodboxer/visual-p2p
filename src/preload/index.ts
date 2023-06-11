import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // send: (channel: string, data: any) => {
  //   electronAPI.send(channel, data)
  // },
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)

    // We need to wait until the main world is ready to receive the message before
    // sending the port. We create this promise in the preload so it's guaranteed
    // to register the onload listener before the load event is fired.
    const windowLoaded = new Promise((resolve) => {
      window.onload = resolve
    })

    ipcRenderer.on('message-channel-ports', async (event) => {
      await windowLoaded
      // Transfer the ports from the isolated world to the main world.
      window.postMessage('message-channel-ports', '*', event.ports)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

import { MessageChannelMain } from 'electron'

const appChannel = new MessageChannelMain()
const connectionChannel = new MessageChannelMain()
const dataChannel = new MessageChannelMain()

appChannel.port2.start()
connectionChannel.port2.start()
dataChannel.port2.start()

export const appChannelPort = appChannel.port2
export const connectionChannelPort = connectionChannel.port2
export const dataChannelPort = dataChannel.port2

// Collection of ports to send to the renderer.
export const rendererPorts = [appChannel.port1, connectionChannel.port1, dataChannel.port1]

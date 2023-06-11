import { MessageChannelMain } from 'electron'

// Message channel to the App component
const appChannel = new MessageChannelMain()
const secondaryChannel = new MessageChannelMain()

// It's OK to send a message on the channel before the other end has
// registered a listener. Messages will be queued until a listener is
// registered.
appChannel.port2.postMessage(21)

// We can also receive messages from the main world of the renderer.
appChannel.port2.on('message', (event) => {
  console.log('from renderer main world:', event.data)
})
appChannel.port2.start()
secondaryChannel.port2.start()

export const appChannelPort = appChannel.port2
export const secondaryChannelPort = secondaryChannel.port2

// Collection of ports to send to the renderer.
export const rendererPorts = [appChannel.port1, secondaryChannel.port1]

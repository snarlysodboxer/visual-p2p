import { useState, useEffect } from 'react'

interface MessageChannelPorts {
  appChannelPort?: MessagePort
  connectionChannelPort?: MessagePort
  dataChannelPort?: MessagePort
}

export const useMessageChannels = () => {
  const [ports, setPorts] = useState<MessageChannelPorts>({})

  useEffect(() => {
    window.onmessage = (event: MessageEvent) => {
      if (event.source === window && event.data === 'message-channel-ports') {
        const [appChannelPort, connectionChannelPort, dataChannelPort] = event.ports

        setPorts({ appChannelPort, connectionChannelPort, dataChannelPort })
      }
    }
  }, [])

  return ports
}

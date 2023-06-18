import * as React from 'react'

interface MessageChannelPorts {
  appChannelPort?: MessagePort
  connectionChannelPort?: MessagePort
  dataChannelPort?: MessagePort
}

interface MessageChannelProviderProps {
  children: React.ReactNode
}

const messageChannelContext = React.createContext<MessageChannelPorts>({})

export const MessageChannelProvider = ({ children }: MessageChannelProviderProps) => {
  const [ports, setPorts] = React.useState<MessageChannelPorts>({})

  React.useEffect(() => {
    window.onmessage = (event: MessageEvent) => {
      if (event.source === window && event.data === 'message-channel-ports') {
        const [appChannelPort, connectionChannelPort, dataChannelPort] = event.ports

        setPorts({ appChannelPort, connectionChannelPort, dataChannelPort })
      }
    }
  }, [])

  return <messageChannelContext.Provider value={ports}>{children}</messageChannelContext.Provider>
}

export const useMessageChannels = () => {
  return React.useContext(messageChannelContext)
}

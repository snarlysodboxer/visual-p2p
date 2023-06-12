import { useState, useEffect } from 'react'
import { useMessageChannels } from './hooks/useMessageChannels'
import { Button, Input, Sheet } from '@mui/joy'

export function App(): JSX.Element {
  const [appData, setAppData] = useState<Record<string, string>>({})
  const [inputText, setInputText] = useState('')
  const { appChannelPort, connectionChannelPort, dataChannelPort } = useMessageChannels()
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    if (!connectionChannelPort) return

    connectionChannelPort.onmessage = (event: MessageEvent) => {
      setMessages((messages) => [...messages, event.data])
      console.log(event.data)
    }
  }, [connectionChannelPort])

  useEffect(() => {
    if (!dataChannelPort) return

    dataChannelPort.onmessage = (event: MessageEvent) => {
      setAppData(event.data)
    }
  }, [dataChannelPort])

  const handleButtonClick = () => {
    if (!appChannelPort) return
    appChannelPort.postMessage(inputText)
    setInputText('')
  }

  return (
    <Sheet variant="outlined" color="neutral" sx={{ p: 4, m: 4 }}>
      <h1>{appData.name}</h1>
      <Input
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value)
        }}
        placeholder="Type in here…"
      />
      <Button loading={!appChannelPort} onClick={handleButtonClick}>
        Send
      </Button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </Sheet>
  )
}

export default App

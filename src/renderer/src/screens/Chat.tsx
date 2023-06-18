import * as React from 'react'
import { useMessageChannels } from '../hooks/useMessageChannels'
import Button from '@mui/joy/Button'
import Sheet from '@mui/joy/Sheet'
import Input from '@mui/joy/Input'
import Layout from '../components/Layout'
import { useRecoilState } from 'recoil'
import { messagesState } from '../state'

export function Chat() {
  const [appData, setAppData] = React.useState<Record<string, string>>({})
  const [inputText, setInputText] = React.useState('')
  const { appChannelPort, connectionChannelPort, dataChannelPort } = useMessageChannels()
  const [messages, setMessages] = useRecoilState(messagesState)

  React.useEffect(() => {
    if (!connectionChannelPort) return

    connectionChannelPort.onmessage = (event: MessageEvent) => {
      setMessages((messages) => [...messages, event.data])
      console.log(event.data)
    }
  }, [connectionChannelPort])

  React.useEffect(() => {
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
    <Layout.Main>
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
    </Layout.Main>
  )
}

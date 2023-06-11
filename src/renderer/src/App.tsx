import { useState, useEffect } from 'react'

export function App(): JSX.Element {
  const [count, setCount] = useState(0)

  useEffect(() => {
    window.onmessage = (event) => {
      // event.source === window means the message is coming from the preload
      // script, as opposed to from an <iframe> or other source.
      if (event.source === window && event.data === 'message-channel-ports') {
        const [appChannelPort, secondaryChannelPort] = event.ports

        appChannelPort.onmessage = (event) => {
          setCount((count) => count + event.data)
        }
        secondaryChannelPort.onmessage = (event) => {
          setCount(event.data)
        }
      }
    }
  }, [])

  return <div className="container">{count}</div>
}

export default App

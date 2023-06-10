import { useState, useEffect } from 'react'

export function App(): JSX.Element {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCounter = (_event, value) => {
      setCount((c) => c + value)
    }
    window.api.onUpdateCounter(updateCounter)

    return () => {
      window.api.removeAllUpdateCounter()
    }
  }, [])

  return <div className="container">{count}</div>
}

export default App

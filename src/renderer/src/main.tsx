import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider } from '@mui/joy/styles'
import './assets/index.css'
import App from './App'
import { MessageChannelProvider } from './hooks/useMessageChannels'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <StyledEngineProvider injectFirst>
        <MessageChannelProvider>
          <App />
        </MessageChannelProvider>
      </StyledEngineProvider>
    </RecoilRoot>
  </React.StrictMode>
)

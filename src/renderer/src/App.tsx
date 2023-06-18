import * as React from 'react'

import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Input from '@mui/joy/Input'
import IconButton from '@mui/joy/IconButton'

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import FindInPageRoundedIcon from '@mui/icons-material/FindInPageRounded'
import MenuIcon from '@mui/icons-material/Menu'
import BookRoundedIcon from '@mui/icons-material/BookRounded'

// custom
import filesTheme from './theme'
import Menu from './components/Menu'
import Layout from './components/Layout'
import Navigation from './components/Navigation'
import { ColorSchemeToggle } from './components/ColorSchemeToggle'
import { Peers } from './screens/Peers'
import { Chat } from './screens/Chat'

export function App(): JSX.Element {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [screen, setScreen] = React.useState('Chat')

  return (
    <CssVarsProvider disableTransitionOnChange theme={filesTheme}>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation setScreen={setScreen} />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="solid"
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              <FindInPageRoundedIcon />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Files
            </Typography>
          </Box>
          <Input
            size="sm"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" size="sm" color="neutral">
                <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
                  /
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: '500px',
              display: {
                xs: 'none',
                sm: 'flex',
              },
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            >
              <SearchRoundedIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              component="a"
              onClick={() => setScreen('Peers')}
            >
              <BookRoundedIcon />
            </IconButton>
            <Menu
              id="app-selector"
              control={
                <IconButton size="sm" variant="outlined" color="primary" aria-label="Apps">
                  <GridViewRoundedIcon />
                </IconButton>
              }
              menus={[
                {
                  label: 'Email',
                  href: '/joy-ui/getting-started/templates/email/',
                },
                {
                  label: 'Team',
                  href: '/joy-ui/getting-started/templates/team/',
                },
                {
                  label: 'Files',
                  active: true,
                  href: '/joy-ui/getting-started/templates/files/',
                  'aria-current': 'page',
                },
              ]}
            />
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <Navigation setScreen={setScreen} />
        </Layout.SideNav>
        {screen === 'Peers' && <Peers />}
        {screen === 'Chat' && <Chat />}
      </Layout.Root>
    </CssVarsProvider>
  )
}

export default App

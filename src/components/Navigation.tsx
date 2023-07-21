'use client'

import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import { Skeleton } from '@mui/material'
import Image from 'next/image'
import { googleLogin, logout } from '@/firebase/auth'
import useAuth from '@/hooks/useAuth'
import useUser from '@/hooks/useUser'
import useClients from '@/hooks/useClients'
import { useRouter } from 'next/navigation'

const pages = [
  //'Products', 'Pricing', 'Blog'
  { label: 'Actividades', href: '/bb' }
]
const links = [
  //'Profile', 'Account', 'Dashboard', 'Logout'
  { label: 'Home', href: '/' },
  { label: 'Perfil', href: '/profile' }
]

function Navigation() {
  //* This are checking the login status
  useAuth()
  useClients()
  const { user } = useUser()
  const router = useRouter()

  const showDasboardLink =
    user?.isAdmin ||
    ['ADMIN', 'COORDINATOR', 'COLLABORATOR'].includes(user?.rol || '')
  const [anchorElSignIn, setAnchorElSignIn] =
    React.useState<null | HTMLElement>(null)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleOpenSignIn = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSignIn(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleCloseSignIn = () => {
    setAnchorElSignIn(null)
  }

  return (
    <AppBar position="static" role="navigation">
      <Container maxWidth="xl">
        <Toolbar disableGutters role="logo">
          <Link href={'/'} passHref>
            <Box
              className="items-center"
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            >
              <Image
                //loader={imageLoader}
                src={'/icons/Logotipo-01-512px.png'}
                width={80}
                height={50}
                alt="logo"
                style={{ width: 80, height: 50 }}
              />
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Link href={page.href} passHref>
                    <Typography textAlign="center">{page.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            className={'w-full justify-center '}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          >
            <Link href={'/'} passHref>
              <Image
                //loader={imageLoader}
                src={'/icons/Logotipo-01-512px.png'}
                width={80}
                height={50}
                alt="logo"
                style={{ width: 80, height: 50 }}
              />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={page.href}>{page.label}</Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user === undefined && <Skeleton variant="circular" />}
            {user === null && (
              <>
                <Tooltip title="Open Sign In">
                  <IconButton
                    aria-label="sign-in-button"
                    onClick={handleOpenSignIn}
                    className="text-white"
                  >
                    Ingresar
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="sign-in"
                  aria-label="sign-in-menu"
                  anchorEl={anchorElSignIn}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElSignIn)}
                  onClose={handleCloseSignIn}
                >
                  <MenuItem>
                    <Button
                      onClick={async (e) => {
                        const res = await googleLogin()
                        if (!!res) console.log('logged')
                        router.push('/')
                        handleCloseUserMenu()
                      }}
                    >
                      Entrar con Google
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            )}

            {user && (
              <>
                <Tooltip title="Open links">
                  <IconButton
                    aria-label="open-user-menu"
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    <Avatar alt="Remy Sharp" src={user.image} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  aria-label="user-menu"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {showDasboardLink && (
                    <Link href={'/bb/admin'} passHref>
                      <MenuItem role="listitem">
                        <Typography textAlign="center">Dashboard</Typography>
                      </MenuItem>
                    </Link>
                  )}
                  {links.map((setting) => (
                    <Link href={setting.href} key={setting.label} passHref>
                      <MenuItem role="listitem">
                        <Typography textAlign="center">
                          {setting.label}
                        </Typography>
                      </MenuItem>
                    </Link>
                  ))}

                  <MenuItem>
                    <Button
                      onClick={async (e) => {
                        await logout()
                        console.log('logout')
                        handleCloseSignIn()
                      }}
                    >
                      Salir
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default Navigation

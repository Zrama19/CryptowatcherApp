import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/CW-logos.jpeg';
import './NavBussy.css';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl' className='appbar'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <a href='/'>
              <h1 className='cryptowatcher'>
                crypto<span className='primary'>watcher</span>
              </h1>
            </a>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem>
                <Typography textAlign='center'>
                  <a href='/'>Home</a>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign='center'>
                  <a href='/coins/1'>Coins</a>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign='center'>
                  <a href='/#footsies'>Contact</a>
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign='center'>
                  <a href='/calculator'>Calculator</a>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <a href='/'>
              <h1 className='cryptowatcher'>
                crypto<span className='primary'>watcher</span>
              </h1>
            </a>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <a href='/'>Home</a>
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <a href='/coins/1'>Coins</a>
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <a href='/#footsies'>Contact</a>
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <a href='/calculator'>Calculator</a>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Avatar alt='logo' src={logo} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;

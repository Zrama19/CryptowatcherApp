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
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCoins = () => {
    navigate('/coins/1');
    handleCloseNavMenu();
  };

  const handleAbout = () => {
    navigate('/about');
    handleCloseNavMenu();
  };

  const handleCalc = () => {
    navigate('/calculator');
    handleCloseNavMenu();
  };

  const handleHome = () => {
    navigate('/');
    handleCloseNavMenu();
  };
  return (
    <AppBar position='static' onScroll={handleCloseNavMenu}>
      <Container maxWidth='xxl' className='appbar'>
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
              className='mobile-menu-icon'
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
              <MenuItem onClick={handleHome}>
                <Typography textAlign='center'>Home</Typography>
              </MenuItem>
              <MenuItem onClick={handleCoins}>
                <Typography textAlign='center'>Coins</Typography>
              </MenuItem>
              <MenuItem onClick={handleAbout}>
                <Typography textAlign='center'>About</Typography>
              </MenuItem>
              <MenuItem onClick={handleCalc}>
                <Typography textAlign='center'>Calculator</Typography>
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
            <Button
              onClick={handleHome}
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              Home
            </Button>
            <Button
              onClick={handleCoins}
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              Coins
            </Button>
            <Button
              onClick={handleAbout}
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              About
            </Button>
            <Button
              onClick={handleCalc}
              sx={{ my: 2, color: 'black', display: 'block' }}
            >
              Calculator
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

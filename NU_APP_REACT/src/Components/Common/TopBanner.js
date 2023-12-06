import * as React from 'react';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import '../../App.css';
// import AdbIcon from '@mui/icons-material/Adb';



const TopBanner = ({navTabs, setSelectedTab}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const profile = useSelector(state => state.profile);
  const token = useSelector(state => state.login.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [firstname, setFirstname] = useState('');
  const pages = navTabs;
  const profileMenu = ['Logout'];


  const handleOpenNavMenu = (event, index) => {
    setAnchorElNav(event.currentTarget);
    setSelectedTab(index);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
      dispatch({type: 'LOGOUT'});
  };

  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
  }, [token])
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/login"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NORTHERN UNIVERSITY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                className="MenuButton"
                onClick={(event) => handleOpenNavMenu(event, index)}
                sx={{ my: 2, mr: 3, color: 'white', display: 'block', width: 'fit-content'}}
              >
                {page}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={(profile?.firstname).toUpperCase()} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {profileMenu.map((menuItem) => (
                <MenuItem key={menuItem} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{menuItem}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TopBanner;
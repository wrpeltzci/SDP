import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Button,
  Tooltip,
  MenuItem,
  Hidden
} from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';

import { isAuth } from '../../../actions/auth';
import { Person } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: 'white !important',
    color: '#1976d2 !important'
  },
  toolbar: {
    backgroundColor: '#41464b'
  },
  logo: {
    height: 25,
    width: 25
  },
  spacer: {
    paddingRight: 10
  },
  title: {
    marginTop: '4px !important',
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: 'white'
    }
  },
  login: {
    textAlign: 'right'
  }
}));

const CoreNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const currentLoc = window.location.pathname.split('/')[1];
  const auth = isAuth();
  const classes = useStyles();

  const pages = [
    {
      id: "home",
      label: "Home",
      href: "/",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      secure: true
    },
    {
      id: 'business',
      label: "Company Info",
      href: "/business",
      secure: true
    },
    {
      id: 'templates',
      label: "Templates",
      href: "/templates",
      secure: true
    },
    {
      id: "about",
      label: "About",
      href: "/about",
    },
    {
      id: "services",
      label: "Services",
      href: "/services",
    },
    {
      id: "register",
      label: "Registration",
      href: "/register",
    },
    {
      id: "demo",
      label: "Demo",
      href: "/demo",
    },
    {
      id: "contact",
      label: "Contact",
      href: "/contact",
    },
  ];

  const settings = [
    {
      id: "profile",
      label: 'Profile',
      href: '/profile',
    },
    {
      id: "signout",
      label: 'Signout',
      href: '/signout',
    }
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <span className={classes.spacer}>
          <img src="logo.png" className={classes.logo} alt="Clincial Squared Logo" />
        </span>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          PDF Publisher
        </Typography>

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
            {pages.map((page, key) => (
              page.secure && auth ? <MenuItem key={key}
                component={Link}
                to={page.href}
              >
                <Typography textAlign="center">{page.label}</Typography>
              </MenuItem>
                :
                !page.secure && !auth && <MenuItem key={key}
                  component={Link}
                  to={page.href}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
            ))}
            <Hidden smDown>
              {
                !auth &&
                <MenuItem id="login"
                  component={Link}
                  to={'/login'}
                  className={classes.login}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              }
            </Hidden>
          </Menu>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        >
          PDF Publisher
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} mr='0'>
          {pages.map((page, key) => {
            return (
              page.secure && auth ? <Button
                component={Link}
                to={page.href}
                key={key}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                className={currentLoc === page.id || (currentLoc === '' && page.id === 'home') ? classes.active : ''}
              >
                {page.label}
              </Button>
                :
                !page.secure && !auth && <Button
                  component={Link}
                  to={page.href}
                  key={key}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  className={currentLoc === page.id || (currentLoc === '' && page.id === 'home') ? classes.active : ''}
                >
                  {page.label}
                </Button>
            )
          })
          }
        </Box>
        {!auth && <Box sx={{ flexGrow: 0 }}>
          <Button
            component={Link}
            to={'/login'}
            id="login"
            sx={{ my: 2, color: 'white', display: 'block' }}
            className={currentLoc === 'login' ? classes.active : ''}
          >
            Login
          </Button>
        </Box>}
        {
          auth &&
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'white' }} style={{ padding: 10 }}>
                <Person />
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
              {settings.map((setting, key) => (
                <MenuItem key={key} component={Link} to={setting.href}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        }
      </Toolbar>
    </AppBar>
  );
};
export default CoreNavBar;

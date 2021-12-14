import * as React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar, Button, CssBaseline, useScrollTrigger, Link, Typography } from '@mui/material';

import { isAuth } from '../../../actions/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  link: {
    color: '#ffffff !important',
    padding: 10,
    '&:hover': {
      textDecoration: 'none',
      color: '#1976d2 !important',
      backgroundColor: '#ffffff !important',
    }
  },
  active: {
    color: '#1976d2 !important',
    backgroundColor: '#ffffff !important',
    padding: 10,
    '&:hover': {
      textDecoration: 'none',
      color: '#ffffff'
    }
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const CoreNavBar = (props) => {
  const classes = useStyles();
  const currentLoc = window.location.pathname.split('/')[1];
  const auth = isAuth();
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
      id: "demo",
      label: "Demo",
      href: "/demo",
    },
    {
      id: "contact",
      label: "Contact",
      href: "/contact",
    },
    {
      id: "login",
      label: !auth ? "Login" : 'Signout',
      href: !auth ? "/login" : '/signout',
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div">
              PDF Builder
            </Typography>
            {
              currentLoc !== '' &&
              <div style={{ margin: 'auto' }}>
                {
                  pages.map((page, key) => {
                    console.log('tessss', currentLoc, page.id, page.id === currentLoc);
                    return (
                      !auth && page.secure ? null :
                        <Button
                          component={Link}
                          href={page.href}
                          className={currentLoc === page.id ? classes.active : classes.link}
                          key={key} 
                          variant="outlined"
                        >
                          {page.label}
                        </Button>
                    )
                  })
                }
              </div>
            }
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default CoreNavBar;
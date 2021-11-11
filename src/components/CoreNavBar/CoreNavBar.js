import * as React from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button, CssBaseline, useScrollTrigger, Link, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  link: {
    color: '#ffffff !important',
    padding: 10,
    '&:hover': {
      textDecoration: 'none',
      color: '#ffffff'
    }
  }
}));

const pages = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "Dashboard",
    href: "/dashboard"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Services",
    href: "/services"
  },
  {
    label: "Demo",
    href: "/demo"
  },
  {
    label: "Contact",
    href: "/contact"
  },
  {
    label: "Login",
    href: "/login"
  },
];

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
                  pages.map((page, key) =>
                    <Button component={Link} href={page.href} className={classes.link} key={key}>{page.label}</Button>
                  )
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
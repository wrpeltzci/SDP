import * as React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const NavTabs = () => {
  const [value, setValue] = React.useState(0);
  const currentLoc = window.location.pathname.split('/')[1];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const pages = [
    {
      key: "home",
      label: "Home",
      href: "/home"
    },
    {
      key: "about",
      label: "About",
      href: "/about"
    },
    {
      key: "services",
      label: "Services",
      href: "/services"
    },
    {
      key: "demo",
      label: "Demo",
      href: "/demo"
    },
    {
      key: "contact",
      label: "Contact",
      href: "/contact"
    },
    {
      key: "login",
      label: "Login",
      href: "/Login"
    },
  ]

  console.log("🚀 ~ file: CoreNavTabs.js ~ line 52 ~ pages.map ~ currentLoc", currentLoc)
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="pdf builder nav tabs">
        {
            currentLoc === '' ? 'Print to PDF' : 
          pages.map((page, key) => <Tab label={page.label} href={page.href} key={key} component={Link} />
          )
        }
      </Tabs>
    </Box>
  );
}

export default NavTabs;
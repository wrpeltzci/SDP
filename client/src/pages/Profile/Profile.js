import { Backdrop, CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../actions/auth';

import FullWidthLayout from '../../components/Layout/FullwidthLayout';

const Profile = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await getUser();
      setUser(userInfo);
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    }
    getUserInfo();
    return
  }, [])
  return (
    <FullWidthLayout title="Profile">
      {
        loading
          ? <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress value="Loading" size={100} style={{ margin: 'auto', color: '#FFFFFF' }} />
          </Backdrop> :
          <Grid container spacing={2}>
            <Grid item xs={4}>
              Name
            </Grid>
            <Grid item xs={8}>
              {user.name}
            </Grid>
            <Grid item xs={4}>
              Title
            </Grid>
            <Grid item xs={8}>
              {user.title}
            </Grid>
            <Grid item xs={4}>
              Email
            </Grid>
            <Grid item xs={8}>
              {user.email}
            </Grid>
            <Grid item xs={4}>
              Phone
            </Grid>
            <Grid item xs={8}>
              {user.phone}
            </Grid>
          </Grid>
      }
    </FullWidthLayout>
  )
};

export default Profile;
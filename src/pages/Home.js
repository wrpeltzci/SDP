import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, Grid, CardContent, Button, CardHeader, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import FullWidthLayout from '../components/Layout/FullwidthLayout';

const formatNumber = (numValue) => {
  var nf = new Intl.NumberFormat();
  return nf.format(numValue);
}

const useStyles = makeStyles(theme => ({
  card: {
    minHeight: 400
  },
  header: {
    fontSize: '1em',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  upload: {
    display: 'none'
  },
  textCenter: {
    textAlign: "center"
  },
  cardActions: {
    paddingTop: '170px !important'
  }
}));

const Home = () => {
  const [file, setFile] = useState();
  const [files, setFiles] = useState();
  const classes = useStyles();

  const uploadFile = (evt) => {
    setFile(evt.target.files[0]);

    const fileReader = new FileReader();
    fileReader.readAsText(evt.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setFiles(e.target.result);
    };
  };

  return (
    <FullWidthLayout>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardHeader title="Select a file to print" titleTypographyProps={classes.header} />
            <CardContent>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} className={classes.textCenter}>
                  <label htmlFor="btn-upload">
                    <input
                      id="btn-upload"
                      name="btn-upload"
                      className={classes.upload}
                      type="file"
                      onChange={uploadFile} />
                    <Button
                      className="btn-choose"
                      variant="outlined"
                      component="span" >
                      Choose File
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  {file &&
                    <Grid container justifyContent={"center"}>
                      <Grid item xs={6} className={classes.textCenter}>File: {file.name}</Grid>
                      <Grid item xs={6} className={classes.textCenter}>Size in bytes: {formatNumber(file.size)}</Grid>
                    </Grid>
                  }
                </Grid>
              </Grid>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Grid container justifyContent="center">
                <Grid item>
                  {file && <Button component={Link} to={{ pathname: "/print", state: { data: files } }} variant="outlined">Preview Selection</Button>}
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid >
    </FullWidthLayout>
  )
};

export default Home;
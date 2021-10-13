import { Card, Grid, CardContent, Button, CardHeader, CardActions } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [file, setFile] = useState();
  const [files, setFiles] = useState();

  const uploadFile = (evt) => {
    setFile(evt.target.files[0]);

    const fileReader = new FileReader();
    fileReader.readAsText(evt.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setFiles(e.target.result);
    };
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={4}>
        <Card style={{ minHeight: 400 }}>
          <CardHeader title="Select a file to print" titleTypographyProps={{ fontSize: '1em', fontWeight: 'bold', textAlign: 'center' }} />
          <CardContent>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <label htmlFor="btn-upload">
                  <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
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
                    <Grid item xs={6} style={{ textAlign: 'center' }}>File: {file.name}</Grid>
                    <Grid item xs={6} style={{ textAlign: 'center' }}>Size in bytes: {file.size}</Grid>
                  </Grid>
                }
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={{ paddingTop: 300, justifyContent: "center" }}>
            {file && <Button size="small" component={Link} to={{pathname: "/print", state: {data: files}}} variant="contained">Preview Selection</Button>}
          </CardActions>
        </Card>
      </Grid>
    </Grid >
  )
};

export default Home;
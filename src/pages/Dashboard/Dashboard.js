import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardHeader, Grid, Button, Divider, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { Link } from 'react-router-dom';
import TabCategory from './TabCategory';
import FullWidthLayout from '../../components/Layout/FullwidthLayout';
import CoreDrawer from '../../components/_core/CoreDrawer/CoreDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  block: {
    marginTop: theme.spacing(1)
  },
  actionBar: {
    border: '1 solid #ddd'
  },
  upload: {
    display: 'none'
  },
  options: {
    minHeight: 20,
    width: 50
  },
  cardContent: {
    maxHeight: '100%',
    overflow: 'auto'
  },
  card: {
    height: '100%'
  },
  copied: {
    color: 'green',
    fontSize: '13px'
  },
  drawer: {
    width: 200
  },
  divider: {
    paddingTop: 10
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [viewer, setViewer] = useState('');
  const [fileError, setFileError] = useState('');
  const [dataIndex, setDataIndex] = useState(0);
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const [fields, setFields] = useState([]);
  const [value, setValue] = useState('');
  const [editorState, setEditorState] = useState('');
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [notSaved, setNotSaved] = useState(false);
  const [openTab, setOpenTab] = useState(false);
  const tabs = ['Company Info', 'Profile', 'Templates'];


  const toggleTab = (tab) => {
    setOpenTab(!openTab ? tab : false);
  };

  function updateViewer() {
    if (editorState) {
      let currentData = editorState;
      setContent(currentData);
      for (var key in fields) {
        currentData = currentData.replaceAll(`&lt;${fields[key]}&gt;`, data[dataIndex][fields[key]]);
      };
      setViewer(currentData);
    };
  };

  useEffect(() => {
    updateViewer();
  }, [dataIndex]);

  const Expire = props => {
    useEffect(() => {
      setTimeout(() => {
        setVisible(false);
      }, props.delay);
    }, [props.delay]);

    return visible ? <div>{props.children}</div> : <div />;
  };

  function handleOptionChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
    navigator.clipboard.writeText(`<${newValue}>`);
    setVisible(true);
  };

  function preview() {
    if (!file) {
      setFileError('No JSON file loaded!');
    } else {
      if (fileError) {
        setFileError(false);
      }
      updateViewer();
      setNotSaved(false);
    };
  };

  const uploadFile = (evt) => {
    setFile(evt.target.files[0]);

    const fileReader = new FileReader();
    fileReader.readAsText(evt.target.files[0], "UTF-8");
    fileReader.onload = e => {
      try {
        const fileToJSON = JSON.parse(e.target.result);
        setData(fileToJSON);
        const keys = [];
        fileToJSON.map((item, index) => {
          if (index === 0) {
            Object.keys(item).map((objKey, index) => {
              keys.push(objKey)
            });
          };
        });
        setFields(keys);
        if (fileError) {
          setFileError(false);
        };
      } catch (e) {
        setFileError('JSON Error:' + e);
      };
    };
  };

  return (
    <FullWidthLayout>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2} justifyContent="flex-end">
            {tabs.map((tab, key) => {
              return (
                <Grid key={key} item>
                  <Button
                    className="btn"
                    variant="outlined"
                    component="span"
                    onClick={() => toggleTab(tab)}>
                    {tab}
                  </Button>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Grid xs={12} className={classes.divider}><Divider /></Grid>
      </Grid>

      <Grid style={{ marginTop: "5px" }} container spacing={5} alignItems="stretch" justifyContent="space-between">
        <Grid item xs={12} className={classes.actionBar}>
          {fileError &&
            <div className="alert alert-danger" role="alert">
              {fileError}
            </div>
          }
          <Grid container spacing={2} alignItems="stretch">
            <Grid item xs={12} md={2}>
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
            {file &&
              <Grid style={{ marginTop: "4px" }} item xs={12} md={3}>
                File: {file?.name}
              </Grid>
            }
            {file && <Grid item xs={12} md={2}>
              <select className="form-select" value={value}
                onChange={e => handleOptionChange(e)}>
                <option value="">Select Field</option>
                {
                  fields.map((item, key) =>
                    <option value={item} key={key} className={classes.options}>{item}</option>
                  )
                }
              </select>
              {visible &&
                <Grid style={{ marginTop: "4px", marginBottom: "-39px" }} item xs={12} md={3}>
                  <Expire delay="2000">
                    <p className={classes.copied}>Copied!</p>
                  </Expire>
                </Grid>
              }
            </Grid>}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} className={classes.block}>
          <Card>
            <CardHeader title="PDF Builder" />
            <CardContent className={classes.cardContent}>
              <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                  <Editor
                    initialValue=''
                    editorState={editorState}
                    init={{
                      invalid_elements: 'script[language|type|src]',
                      valid_children: '+body[style]',
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                        'code'
                      ],
                      toolbar: 'undo redo | formatselect | code |' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                      contextmenu: "paste | link image inserttable"
                    }}
                    value={editorState}
                    onEditorChange={(editor) => { setEditorState(editor); setNotSaved(true); }}
                    onEditorStateChange={(editor) => setEditorState(editor)}
                  />
                </Grid>
                <Grid item xs={12}>
                  {notSaved ?
                    <button className="btn btn-primary" onClick={preview}>SAVE & PREVIEW</button>
                    :
                    <Button onClick={preview} variant="outlined">SAVE & PREVIEW</Button>
                  }
                  {file && editorState && content &&
                    <Button style={{ marginLeft: "8px" }} component={Link} to={{ pathname: "/printpdf", state: { data, content } }} variant="outlined">PRINT...</Button>
                  }
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} className={classes.block}>
          <Card className={classes.card}>
            <CardHeader title="Viewer" />
            {viewer &&
              <Grid style={{ marginTop: "15px", marginLeft: "15px" }} item xs={12}>
                <Button variant="outlined" disabled={dataIndex <= 0 && true} onClick={() => { setDataIndex(dataIndex - 1); preview(); }}>&lt; </Button>
                <Button variant="outlined" disabled={dataIndex >= data.length - 1 && true} style={{ marginLeft: "8px" }} onClick={() => { setDataIndex(dataIndex + 1); preview(); }}>&gt; </Button>
              </Grid>
            }
            <CardContent>
              <div dangerouslySetInnerHTML={{ __html: viewer }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CoreDrawer
        anchor="left"
        open={openTab ? true : false}
        onClose={toggleTab}
      >
        <div className={classes.drawer}>
          <TabCategory tabs={tabs} openTab={openTab} />
        </div>
      </CoreDrawer>
    </FullWidthLayout>
  )
};

export default Dashboard;
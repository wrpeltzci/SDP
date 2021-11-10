import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardHeader, Grid, Button } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  block: {
    marginTop: theme.spacing(3)
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
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [viewer, setViewer] = useState('');
  const [fileError, setFileError] = useState(false);
  const [dataIndex, setDataIndex] = useState(0);
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const [fields, setFields] = useState([]);
  const [value, setValue] = useState('');
  const [editorState, setEditorState] = useState('');
  const [visible, setVisible] = useState(false);

  function updateViewer() {
    if (editorState) {
      let currentData = editorState;
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
      setFileError(true);
    } else {
      setFileError(false);
      updateViewer();
    };
  };

  const uploadFile = (evt) => {
    setFile(evt.target.files[0]);

    const fileReader = new FileReader();
    fileReader.readAsText(evt.target.files[0], "UTF-8");
    fileReader.onload = e => {
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
      setFileError(false);
    };
  };

  return (
    <Grid style={{ marginTop: "5px" }} container spacing={5} alignItems="stretch" justifyContent="space-between">
      <Grid item xs={12} className={classes.actionBar}>
        {fileError &&
          <div className="alert alert-danger" role="alert">
            No JSON file loaded!
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
          <Grid item xs={12} md={3}>
            File: {file?.name}
          </Grid>
          {file && <Grid item xs={12} md={2}>
            <select value={value}
              onChange={e => handleOptionChange(e)}>
              <option value="">Select Field</option>
              {
                fields.map((item, key) =>
                  <option value={item} key={key} className={classes.options}>{item}</option>
                )
              }
            </select>
            {visible &&
              <Grid style={{ marginTop: "4px", marginBottom: "-27px" }} item xs={12} md={3}>
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
                  editorState={editorState} //I think we can populate this before rendering if the user populates a field with their template. So a useState prop.
                  init={{
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
                  onEditorChange={(editor) => setEditorState(editor)}
                  onEditorStateChange={(editor) => setEditorState(editor)}
                />
              </Grid>
              <Grid item xs={12}>
                <button onClick={preview}>Preview</button>
                <button style={{ marginLeft: "8px" }} onClick={() => { }}>Print</button>
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
              <button disabled={dataIndex <= 0 && true} onClick={() => { setDataIndex(dataIndex - 1); preview(); }}>&lt;</button>
              <button disabled={dataIndex >= data.length - 1 && true} style={{ marginLeft: "8px" }} onClick={() => { setDataIndex(dataIndex + 1); preview(); }}>&gt;</button>
            </Grid>
          }
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: viewer }} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
};

export default Dashboard;
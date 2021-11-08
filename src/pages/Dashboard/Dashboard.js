import React, { useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardHeader, Grid, TextField, Button } from '@mui/material';
import { DateRange } from '@mui/icons-material';
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
  }
}));

const data = [
  {
    id: 1,
    patientName: 'Joe Smith',
    street: '111 Main St',
    city: 'Houston',
    cstate: 'TX',
    zip: '99999',
    name: 'ABC Company',
    abbrev: 'ABC',
    description: 'short description',
    originalDiagnosisCode: 'normal',
    condition: 'condition',
  }
];

const Dashboard = () => {
  const classes = useStyles();
  const editorRef = useRef(null);

  const [viewer, setViewer] = useState('');
  const [fileError, setFileError] = useState(false);
  const [file, setFile] = useState();
  const [files, setFiles] = useState();
  const [fields, setFields] = useState([]);
  const [value, setValue] = useState('');
  const [markup, setMarkup] = useState({});
  const [editorState, setEditorState] = useState(undefined);
  const [fieldWarning, setFieldWarning] = useState(false);

  // const handleTextChange = (e) => {
  //   setViewer(e.target.value);
  // }

  // const replaceData = (original, replaceString, newValue) => {
  //   return original.replaceAll(replaceString, newValue);
  // }

  // const replaceArray = (dataBlock) => {
  //   return fields.map(item => {
  //     dataBlock.replace(`${item}`, data[0][item])
  //   })
  // }

  function handleOptionChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
    setEditorState('&lt;fieldname&gt;');
    if (markup[newValue]) {
      setViewer(markup[newValue])
      const textReplace = markup[newValue].replaceAll(files[0][newValue], '&lt;fieldname&gt;')
      setEditorState(textReplace);
    } else {
      setViewer('');
    };
  };

  function log() {
    if (!file) {
      setFileError(true);
    } else {
      setFileError(false);
      if (editorState) {
        let currentData = editorState;
        // let newVal = currentData 
        //fields.map(item => replaceData(currentData, `{${item}}`, data[0][item]))
        // newVal = replaceData(newVal, '{name}', data[0]['name']);
        // newVal = replaceData(newVal, '{abbrev}', data[0]['abbrev']);
        // newVal = replaceData(newVal, '{description}', data[0]['description']);
        // newVal = replaceData(newVal, '{originalDiagnosisCode}', data[0]['originalDiagnosisCode']);
        // newVal = replaceData(newVal, '{condition}', data[0]['condition']);

        currentData = currentData.replaceAll('&lt;fieldname&gt;', files[0][value]);
        setViewer(currentData);
        setMarkup({ ...markup, [value]: currentData });
      };
    };
  };

  function logAll() {
    if (!file) {
      setFileError(true);
    } else {
      setFileError(false);
      setViewer(markup);
    };
  };

  const uploadFile = (evt) => {
    setFile(evt.target.files[0]);

    const fileReader = new FileReader();
    fileReader.readAsText(evt.target.files[0], "UTF-8");
    fileReader.onload = e => {
      // setFiles(e.target.result);
      const fileToJSON = JSON.parse(e.target.result);
      setFiles(fileToJSON);

      const keys = [];
      fileToJSON.map((item, index) => {
        if (index === 0) {
          Object.keys(item).map((objKey, index) => {
            keys.push(objKey)
          });
        }
      })
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
          {file && <Grid item xs={12} md={4}>
            <select value={value}
              onChange={e => handleOptionChange(e)}>
              <option value="">Select Field</option>
              {
                fields.map((item, key) =>
                  <option value={item} key={key} className={classes.options}>{item}</option>
                )
              }
            </select>
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
                  // onInit={(evt, editor) => editorRef.current = editorState}
                  initialValue=''
                  editorState={editorState} //I think we can populate this before rendering if the user populates a field with their template. So a useState prop.
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist autolink lists link image charmap print preview anchor',
                      'searchreplace visualblocks code fullscreen',
                      'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  value={editorState}
                  onEditorChange={(editor) => setEditorState(editor)}
                  onEditorStateChange={(editor) => setEditorState(editor)}
                />
              </Grid>
              <Grid item xs={12}>
                <button onClick={log}>Save & Preview</button>
                <button style={{ marginLeft: "8px" }} onClick={logAll}>Preview All</button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} className={classes.block}>
        <Card className={classes.card}>
          <CardHeader title="Viewer" />
          <CardContent>
            {typeof viewer === 'object' ?
              Object.keys(viewer).map((key) => { return <div key={key} dangerouslySetInnerHTML={{ __html: viewer[key] }} /> })
              :
              <div dangerouslySetInnerHTML={{ __html: viewer }} />
            }
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
};

export default Dashboard;
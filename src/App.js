import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import TopPanel from './components/TopPanel';
import SplitEditor from './components/SplitEditor';
import ToolTabs from './components/ToolTabs';
import { MuiThemeProvider, createMuiTheme, makeStyles, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { grey, green, amber, blue } from '@material-ui/core/colors';
import { CheckCircle, Close, Warning, Error, Info } from '@material-ui/icons';
import clsx from 'clsx';
import ToolList from './components/ToolList';

/*const pipeline = [];

function addTool(tool) {
  tool.id = pipeline.length + 1;
  pipeline.push(tool);
};

function removeTool(tool){
  pipeline.splice(pipeline.indexOf(tool), 1);
  console.log(pipeline);
}

/*addTool.propTypes = {
  tool: PropTypes.shape({
    tool: PropTypes.string.isRequired,
  })
}*/

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    type: 'dark',
  }
});

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: blue[500],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 25,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function CustomSnackbarContent(props) {
  const classes = useStyles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      message={
        <span id="message-id" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
   
          onClick={onClose}
        >
          <Close />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

CustomSnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
};

function regexEscape(regex) {
  return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function App() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState(undefined);
  const snackbarQueue = useRef([]);
  const [pipeline, setPipeline] = useState([]);

  const [editorContent, setEditorContent] = useState("");
  const [editorResult, setEditorResult] = useState("");

  const modify = useRef(false);

  const addTool = (tool) => {
    tool.id = pipeline.length + 1;
    setPipeline([...pipeline, tool]);
    modify.current = true;
    //pipeline.push(tool);
  };

  const removeTool = (tool) => {
    setPipeline(pipeline.filter(each => each.id !== tool.id));
    modify.current = true;
    //pipeline.splice(pipeline.indexOf(tool), 1);
  };

  const editText = (newValue) => {
    setEditorContent(newValue);
    modify.current = true;
  };

  const runPipeline = () => {
    var tempResult = editorContent;

    for (var i = 0; i < pipeline.length; i++) {
      switch (pipeline[i].tool) {
        case "Replace":
          tempResult = tempResult.replace(new RegExp(regexEscape(pipeline[i].find), 'g'), pipeline[i].replace);
          break;
        case "Match":
          tempResult = tempResult.match(new RegExp(".*" + regexEscape(pipeline[i].pattern) + ".*", 'g'));
          tempResult === null ? tempResult = "" : tempResult = tempResult.join('\n');
          break;
        default:
          break;
      }
    }
    setEditorResult(tempResult);
  };

  // Do dokumentace napsat proc neni async/await ale useEffect
  useEffect(() => {
    for (var i = 0; i < pipeline.length; i++){
      if (pipeline[i].id !== (i + 1))
        pipeline[i].id = (i + 1);
    }

    if (modify.current === true) {
      runPipeline();
      modify.current = false;
    }
    console.log(pipeline);
  });

  const processSnackbarQueue = () => {
    if (snackbarQueue.current.length > 0) {
      setSnackbarInfo(snackbarQueue.current.shift());
      setShowSnackbar(true);
    }
  };

  const openSnackbar = (variant, message) => {
    snackbarQueue.current.push({ variant, message, key: new Date().getTime() });

    if (showSnackbar) {
      setShowSnackbar(false);
    }
    else {
      processSnackbarQueue();
    }
  };

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  const handleExited = () => {
    processSnackbarQueue();
  };

  return (
    <MuiThemeProvider theme={theme}>
    <div className="App">
      <TopPanel />
      <SplitEditor editorContent={editorContent} editText={editText} editorResult={editorResult} />
      <ToolList tools={pipeline} removeTool={removeTool}/>
      <ToolTabs displaySnackbar={openSnackbar} addTool={addTool}/>
      <Snackbar
        key={snackbarInfo ? snackbarInfo.key : undefined}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={closeSnackbar}
        onExited={handleExited}
        ContentProps={{ 'aria-describedby': 'message-id' }} 
      >
        <CustomSnackbarContent
          message={snackbarInfo ? snackbarInfo.message : undefined}
          variant={snackbarInfo ? snackbarInfo.variant : undefined}
          onClose={closeSnackbar}
        />
      </Snackbar>
    </div>
    </MuiThemeProvider>
  );
}

export default App;

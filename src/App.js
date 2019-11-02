import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import TopPanel from './components/TopPanel';
import SplitEditor from './components/SplitEditor';
import ToolTabs from './components/ToolTabs';
import { MuiThemeProvider, createMuiTheme, makeStyles, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { grey, green, amber, blue } from '@material-ui/core/colors';
import { CheckCircle, Close, Warning, Error, Info } from '@material-ui/icons';
import clsx from 'clsx';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    type: 'dark',
  }
})

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

function App() {
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [snackbarInfo, setSnackbarInfo] = React.useState(undefined);
  const snackbarQueue = React.useRef([]);

  const processSnackbarQueue = () => {
    if (snackbarQueue.current.length > 0) {
      setSnackbarInfo(snackbarQueue.current.shift());
      setShowSnackbar(true);
    }
  };

  const openSnackbar = (message, variant) => {
    snackbarQueue.current.push({ message, variant, key: new Date().getTime() });

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
        <SplitEditor />
        <ToolTabs showSB={openSnackbar} />
        
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

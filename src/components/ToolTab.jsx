import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Tabs, Tab } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[800],
      light: lightBlue[200],
      dark: lightBlue[900],
    },
    type: 'dark',
  }
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '20px',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    color: 'white',
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="tabs"
            centered
          >
            <Tab label="Reverse" {...a11yProps(0)} />
            <Tab label="Replace" {...a11yProps(1)} />
            <Tab label="Rows" {...a11yProps(2)} />
            <Tab label="Columns" {...a11yProps(3)} />
            <Tab label="Convert" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel theme={theme} value={value} index={0}>
          TBD
        </TabPanel>
        <TabPanel value={value} index={1}>
          TBD
        </TabPanel>
        <TabPanel value={value} index={2}>
          TBD
        </TabPanel>
        <TabPanel value={value} index={3}>
          TBD
        </TabPanel>
        <TabPanel value={value} index={4}>
          TBD
        </TabPanel>
      </div>
    </MuiThemeProvider>
  );
}
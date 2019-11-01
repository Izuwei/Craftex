import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Typography, Box, Tabs, Tab, makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import { Reorder, ViewColumn, FindReplace, YoutubeSearchedFor, Transform } from '@material-ui/icons';
import RowTab from './Tabs/RowTab';

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
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '20px',
    marginBottom: '20px',
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.background.paper,
    color: 'white',
  },
  /*toolTitle: {
    marginLeft: '10px',
    color: 'orange',
    position: 'relative',
    bottom: '15px',
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingBottom: '2px',
    backgroundColor: theme.palette.background.paper,
  },*/

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
            <Tab icon={<YoutubeSearchedFor />} label="Reverse" {...a11yProps(0)} />
            <Tab icon={<FindReplace />} label="Replace" {...a11yProps(1)} />
            <Tab icon={<Reorder />} label="Rows" {...a11yProps(2)} />
            <Tab icon={<ViewColumn />} label="Columns" {...a11yProps(3)} />
            <Tab icon={<Transform />} label="Convert" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel theme={theme} value={value} index={0}>
          TBD
        </TabPanel>
        <TabPanel value={value} index={1}>
          TBD
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RowTab />
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
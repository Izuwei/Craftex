import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Typography, Box, Tabs, Tab, makeStyles, MuiThemeProvider, createMuiTheme, useMediaQuery } from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import { Edit, FindReplace, AddCircleOutline, RemoveCircleOutline, Transform } from '@material-ui/icons';
import RowTab from './Tabs/RowTab';
import ReplaceTab from './Tabs/ReplaceTab';

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
      main: lightBlue[600],
      light: lightBlue[300],
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
    backgroundColor: 'rgb(50,50,50)',
    color: 'white',
  },
  fullWidth: {
    width: "100% !important",
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

const ToolTabs = React.memo(({ showAlert, addTool }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const fullWidth = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={`${classes.root} ${fullWidth && classes.fullWidth}`}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="tabs"
            scrollButtons="auto"
            centered
          >
            <Tab icon={<FindReplace />} label="Find & replace" {...a11yProps(0)} />
            <Tab icon={<AddCircleOutline />} label="Addition" {...a11yProps(1)} />
            <Tab icon={<RemoveCircleOutline />} label="Removal" {...a11yProps(2)} />
            <Tab icon={<Edit />} label="Modify" {...a11yProps(3)} />
            <Tab icon={<Transform />} label="Convert" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel theme={theme} value={value} index={0}>
          TBD
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReplaceTab showAlert={showAlert} addTool={addTool}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RowTab showAlert={showAlert} addTool={addTool}/>
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
});

export default ToolTabs;
import React, { Component } from 'react';
import './App.css';
import TopPanel from './components/TopPanel';
import SplitEditor from './components/SplitEditor';
import ToolTab from './components/ToolTab';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    type: 'dark',
  }
})


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <TopPanel />
        <SplitEditor />
        <ToolTab />
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

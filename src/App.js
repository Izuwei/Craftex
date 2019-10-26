import React, { Component } from 'react';
import './App.css';
import TopPanel from './components/TopPanel';
import SplitEditor from './components/SplitEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopPanel />
        <SplitEditor />
      </div>
    );
  }
}

export default App;

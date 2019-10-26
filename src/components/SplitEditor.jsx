import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import './SplitEditor.css';

class SplitEditor extends Component {
    state = {  }
    render() { 
        return ( 
            <SplitPane split="vertical" defaultSize={200} onChange={ size => localStorage.setItem('splitPos', size) }>
                <div><h1>Editor1</h1></div>
                <div><h1>Editor2</h1></div>
            </SplitPane>
         );
    }
}
 
export default SplitEditor;
import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import EditorIn from './EditorIn'
import EditorOut from './EditorOut'
import './SplitEditor.css';

class SplitEditor extends Component {
    state = {  }
    render() { 
        return ( 
            <SplitPane className="SplitEditor" split="vertical" style={{height: "700px"}} minSize={200} defaultSize={"50%"} onChange={ size => localStorage.setItem('splitPos', size) }>
                <div className="Editor1">
                    <EditorIn />
                </div>
                <div className="Editor2">
                    <EditorOut />
                </div>
            </SplitPane>
         );
    }
}
 
export default SplitEditor;
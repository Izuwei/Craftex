import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import EditorIn from './EditorIn'
import EditorOut from './EditorOut'
import './SplitEditor.css';

class SplitEditor extends Component {
    state = {  }

    constructor(props) {
        super(props);
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(){
        this.aceIn.resize();
        this.aceOut.resize();
    }

    render() { 
        return ( 
            <SplitPane className="SplitEditor" split="vertical" style={{height: "700px", position: "static"}} minSize={200} maxSize={-200} defaultSize={"50%"} onChange={ () => this.handleResize() }>
                <EditorIn ref={ instance => { this.aceIn = instance; }}/>
                <EditorOut ref={ instance => { this.aceOut = instance; }}/>
            </SplitPane>
         );
    }
}
 
export default SplitEditor;
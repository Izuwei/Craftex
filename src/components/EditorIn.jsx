import React, { Component } from "react";
import AceEditor from "react-ace";

import 'ace-builds/src-noconflict/ext-searchbox';
import "ace-builds/src-noconflict/theme-idle_fingers";
 

class EditorIn extends Component {
  onChange(newValue) {
    console.log("change", newValue);
  }
  
  onSelectionChange(newValue, event) {
    const content = this.refs.ace.editor.getSelectedText();
    console.log(content);
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }
//<button onClick={()=> {this.refs.ace.editor.undo()}}>Undo</button>
  render() { 
        return ( 
        <AceEditor
            theme="idle_fingers"
            fontSize="20px"
            onChange={this.onChange}
            onSelectionChange={this.onSelectionChange}
            ref="ace"
            name="EditorIn"
            height="700px"
            width="100%"
            placeholder="Insert your input here"
            showPrintMargin={false}
            hScrollBarAlwaysVisible={true}
            editorProps={{ $blockScrolling: true }}
        />);
    }
}
 
export default EditorIn;
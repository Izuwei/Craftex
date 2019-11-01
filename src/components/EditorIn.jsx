import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/theme-idle_fingers";


class EditorIn extends Component {
  state = {  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.resize = this.resize.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
  }

  resize() {
    this.refs.aceIn.editor.resize();
  }

  onChange(newValue) {
    console.log("change", newValue);
  }
  
  onSelectionChange(newValue, event) {
    const content = this.refs.aceIn.editor.getSelectedText();
    console.log(content);
  }

//<button onClick={()=> {this.refs.aceIn.editor.undo()}}>Undo</button>
  render() { 
    return ( 
      <AceEditor
        theme="idle_fingers"
        fontSize="20px"
        onChange={this.onChange}
        onSelectionChange={this.onSelectionChange}
        ref="aceIn"
        mode="plain_text"
        name="EditorIn"
        height="100%"
        width="100%"
        placeholder="Insert your input here"
        showPrintMargin={false}
        hScrollBarAlwaysVisible={true}
        editorProps={{ $blockScrolling: true }}
      />);
  }
}
 
export default EditorIn;
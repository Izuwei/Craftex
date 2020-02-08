import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import 'ace-builds/src-noconflict/ext-searchbox';
import "ace-builds/src-noconflict/theme-idle_fingers";

//<button onClick={()=> {this.refs.AceOut.editor.find("a")}}>Undo</button>
class EditorOut extends Component {
  state = {  }
  
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
  }

  find(expression, properties) {
    this.refs.aceOut.editor.find(expression, properties);
  }

  findAll(expression, properties) {
    this.refs.aceOut.editor.findAll(expression, properties);
  }

  resize() {
    this.refs.aceOut.editor.resize();
  }

  render() { 
    return (
      <AceEditor
        theme="idle_fingers"
        fontSize="20px"
        ref="aceOut"
        value={this.props.content}
        name="EditorOut"
        height="100%"
        width="100%"
        mode="plain_text"
        readOnly={true}
        placeholder="Your output will be here"
        showPrintMargin={false}
        hScrollBarAlwaysVisible={true}
        wrapEnabled={this.props.wrap}
        editorProps={{ $blockScrolling: true }}
      />);
  }
}
 
export default EditorOut;
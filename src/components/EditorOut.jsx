import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import 'ace-builds/src-noconflict/ext-searchbox';
import "ace-builds/src-noconflict/theme-idle_fingers";
 
function onChange(newValue) {
  console.log("change", newValue);
}

//<button onClick={()=> {this.refs.AceOut.editor.find("a")}}>Undo</button>
class EditorOut extends Component {
    state = {  }
    render() { 
        return ( <div>
        <AceEditor
            theme="idle_fingers"
            fontSize="20px"
            ref="AceOut"
            onChange={onChange}
            name="EditorOut"
            height="700px"
            width="100%"
            mode="plain_text"
            readOnly={true}
            placeholder="Your output will be here"
            showPrintMargin={false}
            hScrollBarAlwaysVisible={true}
            editorProps={{ $blockScrolling: true }}
          /> </div>);
    }
}
 
export default EditorOut;
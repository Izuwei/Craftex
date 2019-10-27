import React, { Component } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-min-noconflict/theme-idle_fingers"
 
function onChange(newValue) {
  console.log("change", newValue);
}

class EditorIn extends Component {
    state = {  }
    render() { 
        return ( 
        <AceEditor
            theme="idle_fingers"
            fontSize="20px"
            onChange={onChange}
            name="EditorIn"
            height="700px"
            width="100%"
            placeholder="Insert your input here"
            showPrintMargin={false}
            hScrollBarAlwaysVisible={true}
            editorProps={{ $blockScrolling: true }}
          /> );
    }
}
 
export default EditorIn;
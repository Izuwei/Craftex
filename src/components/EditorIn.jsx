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
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  /**
   * https://ourcodeworld.com/articles/read/1052/how-to-add-toggle-breakpoints-on-the-ace-editor-gutter
  */
  componentDidMount(){
    this.refs.aceIn.editor.on("guttermousedown", function(e) {
      var target = e.domEvent.target;

      if (target.className.indexOf("ace_gutter-cell") === -1) {
          return;
      }

      /*// Pokud neni editor focusnut ignorovat nastaveni breakpointu (mozna se bude hodit).
      if (!(e.editor.isFocused())){
          return; 
      }*/

      // Misto za cislici ignorujeme pro nastaveni breakpointu
      if (e.clientX > 25 + target.getBoundingClientRect().left) {
          return;
      }

      var row = e.getDocumentPosition().row;
      var breakpoints = e.editor.session.getBreakpoints(row, 0);

      if (typeof breakpoints[row] === typeof undefined) {
        e.editor.session.setBreakpoint(row);
      }
      else {
          e.editor.session.clearBreakpoint(row);
      }

      e.stop();
      console.log(breakpoints);
    });
  }

  resize() {
    this.refs.aceIn.editor.resize();
  }

  onChange(newValue) {
    this.props.edit(newValue);
    console.log(this.refs.aceIn.editor.session.getBreakpoints());
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
        //onSelectionChange={this.onSelectionChange}
        ref="aceIn"
        value={this.props.content}
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
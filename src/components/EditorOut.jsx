/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import 'ace-builds/src-noconflict/ext-searchbox';
import "ace-builds/src-noconflict/theme-idle_fingers";

const EditorOut = React.memo(forwardRef(({ content, wrap }, ref) => {
  	const aceOut = useRef(null);
  
	/**
     * Zpristupneni instanci nadrazene komponente
     */
  	useImperativeHandle(ref, () => ({
  		find(expression, properties) {
  			aceOut.current.editor.find(expression, properties);
		},
		  
  		findAll(expression, properties) {
  		  	aceOut.current.editor.findAll(expression, properties);
  		},

  		resize() {
  		  	aceOut.current.editor.resize();
  		},
  	}));

    return (
    	<AceEditor
    	    theme="idle_fingers"
    	    fontSize="20px"
    	    ref={aceOut}
    	    value={content}
    	    name="EditorOut"
    	    height="100%"
    	    width="100%"
    	    mode="plain_text"
    	    readOnly={true}
    	    placeholder="Your output will be here"
    	    showPrintMargin={false}
    	    hScrollBarAlwaysVisible={true}
    	    wrapEnabled={wrap}
    	    editorProps={{ $blockScrolling: true }}
		/>
	);
}));
 
export default EditorOut;
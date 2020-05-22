/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { forwardRef, useImperativeHandle, useEffect, useRef, useCallback } from "react";
import AceEditor from "react-ace";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/theme-idle_fingers";


const EditorIn = React.memo(forwardRef(({ content, edit, wrap, toggleBreakpoint, onCursorChange }, ref) => {
  	const aceIn = useRef(null);

	/**
     * Zpristupneni instanci nadrazene komponente
     */
  	useImperativeHandle(ref, () => ({
    	find(expression, properties){
    	  	aceIn.current.editor.find(expression, properties);
    	},
	
    	findAll(expression, properties) {
    	  	aceIn.current.editor.findAll(expression, properties);
    	},

    	resize() {
    	  	aceIn.current.editor.resize();
    	},

    	undo()  {
    	  	aceIn.current.editor.undo();
    	},
	
    	redo  ()  {
    	  	aceIn.current.editor.redo();
    	},
	
    	clearAllBreakpoints  ()  {
    	  	aceIn.current.editor.session.clearBreakpoints();
    	},
	}));

	/**
	 * https://ourcodeworld.com/articles/read/1052/how-to-add-toggle-breakpoints-on-the-ace-editor-gutter
	 * Funkce nastavi breakpoint podle udalosti od uzivatele
     */
	useEffect(() => {
  		aceIn.current.editor.on("guttermousedown", function(e) {
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
	
    	toggleBreakpoint(breakpoints);
    	});
  	}, [toggleBreakpoint]);

  	const onChange = useCallback((newValue) => {
  	  	edit(newValue);
  	  	console.log(aceIn.current.editor.session.getBreakpoints());
  	}, [edit]);
  
    return (
    	<AceEditor
    	    theme="idle_fingers"
    	    fontSize="20px"
    	    onChange={onChange}
    	    onCursorChange={(selection, event) => onCursorChange(selection, event)}
    	    ref={aceIn}
    	    value={content}
    	    mode="plain_text"
    	    name="EditorIn"
    	    height="100%"
    	    width="100%"
    	    placeholder="Insert your input here"
    	    showPrintMargin={false}
    	    hScrollBarAlwaysVisible={true}
    	    debounceChangePeriod={1500}
    	    wrapEnabled={wrap}
    	    editorProps={{ $blockScrolling: true }}
		/>
	);
}));
 
export default EditorIn;
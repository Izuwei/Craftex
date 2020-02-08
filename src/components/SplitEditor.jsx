import React, { useRef, useState, useCallback } from "react";
import EditorToolbar from "./EditorToolbar";
import SplitPane from "react-split-pane";
import EditorIn from "./EditorIn";
import EditorOut from "./EditorOut";
import "./SplitEditor.css";

const SplitEditor = React.memo(({ editorContent, editText, editorResult, showAlert }) => {
    const aceIn = useRef();
    const aceOut = useRef();

    const [wrap, setWrap] = useState(false);

    const find = useCallback((expression, properties) => {
        aceIn.current.find(expression, properties);
        aceOut.current.find(expression, properties);
    }, []);

    const findAll = useCallback((expression, properties) => {
        aceIn.current.findAll(expression, properties);
        aceOut.current.findAll(expression, properties);
    }, []);

    const toggleWrap = useCallback(() => {
        setWrap(prev => !prev);
    }, [setWrap]);

    const handleResize = useCallback(() => {
        aceIn.current.resize();
        aceOut.current.resize();
    }, []);

    const undo = useCallback(() => {
        aceIn.current.undo();
    }, []);

    const redo = useCallback(() => {
        aceIn.current.redo();
    }, []);

    const clearAllBreakpoints = useCallback(() => {
        aceIn.current.clearAllBreakpoints();
    }, []);

    return ( 
        <React.Fragment>
            <EditorToolbar 
                setInput={editText} 
                result={editorResult} 
                undo={undo} 
                redo={redo}
                clearAllBreakpoints={clearAllBreakpoints}
                showAlert={showAlert} 
                wrap={wrap}
                toggleWrap={toggleWrap}
                find={find}
                findAll={findAll}
            />
            <SplitPane 
                className="SplitEditor" 
                split="vertical" 
                style={{height: "700px", position: "static"}} 
                minSize={200} maxSize={-200} 
                defaultSize={"50%"} 
                onChange={ () => handleResize() }
            >
                <EditorIn ref={ aceIn } content={editorContent} edit={editText} wrap={wrap} />
                <EditorOut ref={ aceOut } content={editorResult} wrap={wrap} />
            </SplitPane>
        </React.Fragment>
     );  
});
 
export default SplitEditor;
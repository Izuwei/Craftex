import React, { useRef, useCallback } from "react";
import EditorToolbar from "./EditorToolbar";
import SplitPane from "react-split-pane";
import EditorIn from "./EditorIn";
import EditorOut from "./EditorOut";
import "./SplitEditor.css";

const SplitEditor = React.memo(({ editorContent, editText, editorResult, showAlert }) => {
    const aceIn = useRef();
    const aceOut = useRef();

    const handleResize = () => {
        aceIn.current.resize();
        aceOut.current.resize();
    }

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
            />
            <SplitPane 
                className="SplitEditor" 
                split="vertical" 
                style={{height: "700px", position: "static"}} 
                minSize={200} maxSize={-200} 
                defaultSize={"50%"} 
                onChange={ () => handleResize() }
            >
                <EditorIn ref={ aceIn } content={editorContent} edit={editText}/>
                <EditorOut ref={ aceOut } content={editorResult}/>
            </SplitPane>
        </React.Fragment>
     );  
});
 
export default SplitEditor;
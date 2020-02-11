import React, { useRef, useState, useCallback } from "react";
import EditorToolbar from "./EditorToolbar";
import SplitPane from "react-split-pane";
import { Resizable } from "re-resizable";
import EditorIn from "./EditorIn";
import EditorOut from "./EditorOut";
import EditorBottomPanel from "./EditorBottomPanel";
import "./SplitEditor.css";

const SplitEditor = React.memo(({ editorContent, editText, editorResult, showAlert, toggleBreakpoint, inspectMode, toggleInspectMode }) => {
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
        toggleBreakpoint([]);
    }, [toggleBreakpoint]);

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
                inspectMode={inspectMode}
                toggleInspectMode={toggleInspectMode}
            />
            <Resizable
                defaultSize={{ width: "100%", height: "700px" }}
                minHeight={100}
                enable={{ top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
                onResize={() => handleResize()}
                style={{display: "flex", flexDirection: "column", flexWrap: "nowrap", justifyContent: "flex-start",
                    alignItems: "stretch", borderBottom: "1px solid rgb(30, 30, 30)"}}
            >
                <SplitPane 
                    className="SplitEditor" 
                    split="vertical" 
                    style={{height: "100%", position: "static"}} 
                    minSize={200} maxSize={-200} 
                    defaultSize={"50%"} 
                    onChange={() => handleResize()}
                >
                    <EditorIn ref={ aceIn } content={editorContent} edit={editText} wrap={wrap} toggleBreakpoint={toggleBreakpoint} />
                    <EditorOut ref={ aceOut } content={editorResult} wrap={wrap} />
                </SplitPane>
                    <EditorBottomPanel wrap={wrap} inspectMode={inspectMode} />
            </Resizable>
        </React.Fragment>
    );  
});
 
export default SplitEditor;
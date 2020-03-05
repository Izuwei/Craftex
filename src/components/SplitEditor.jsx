import React, { useRef, useState, useCallback } from "react";
import EditorToolbar from "./EditorToolbar";
import SplitPane from "react-split-pane";
import { Resizable } from "re-resizable";
import EditorIn from "./EditorIn";
import EditorOut from "./EditorOut";
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EditorBottomPanel from "./EditorBottomPanel";
import "./SplitEditor.css";

const ColorLinearProgress = withStyles({
    barColorPrimary: {
      backgroundColor: '#028fd4',
    },
})(LinearProgress);

const SplitEditor = React.memo(({ editorContent, editText, editorResult, showAlert, toggleBreakpoint, inspectMode, toggleInspectMode, pipeProgress, pipeline, setPipelineActivity, clearPipeline }) => {
    const aceIn = useRef();
    const aceOut = useRef();
    const bottomPanel = useRef();

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

    const initialEditorHeight = useCallback(() => {
        const height = window.innerHeight - 1047;   // 1047 celkova vyska ostatniho contentu

        return height < 480 ? "480px" : height;
    }, []);

    const onCursorChange = useCallback((selection, event) => {
        bottomPanel.current.setPosition(selection.cursor.row + 1, selection.cursor.column + 1);
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
                inspectMode={inspectMode}
                toggleInspectMode={toggleInspectMode}
                pipeline={pipeline}
                setPipelineActivity={setPipelineActivity}
                clearPipeline={clearPipeline}
            />
            <Resizable
                defaultSize={{ width: "100%", height: initialEditorHeight() }}
                minHeight={100}
                minWidth="100%"
                maxWidth="100%"
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
                    <EditorIn ref={ aceIn } content={editorContent} edit={editText} wrap={wrap} toggleBreakpoint={toggleBreakpoint} onCursorChange={onCursorChange} />
                    <EditorOut ref={ aceOut } content={editorResult} wrap={wrap} />
                </SplitPane>
                    <ColorLinearProgress variant="determinate" value={pipeProgress} />
                    <EditorBottomPanel ref={bottomPanel} wrap={wrap} inspectMode={inspectMode} />
            </Resizable>
        </React.Fragment>
    );  
});
 
export default SplitEditor;
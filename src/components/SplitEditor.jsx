import React, { useRef } from 'react';
import SplitPane from 'react-split-pane';
import EditorIn from './EditorIn';
import EditorOut from './EditorOut';
import './SplitEditor.css';

function SplitEditor(props) {
    const aceIn = useRef();
    const aceOut = useRef();

    const handleResize = () => {
        aceIn.current.resize();
        aceOut.current.resize();
    }

    return ( 
        <SplitPane className="SplitEditor" split="vertical" style={{height: "700px", position: "static"}} minSize={200} maxSize={-200} defaultSize={"50%"} onChange={ () => handleResize() }>
            <EditorIn ref={ aceIn } content={props.editorContent} edit={props.editText}/>
            <EditorOut ref={ aceOut } content={props.editorResult}/>
        </SplitPane>
     );  
};
 
export default SplitEditor;
import React, { useRef } from 'react';
import SplitPane from 'react-split-pane';
import EditorIn from './EditorIn';
import EditorOut from './EditorOut';
import './SplitEditor.css';

const SplitEditor = React.memo(({ editorContent, editText, editorResult }) => {
    const aceIn = useRef();
    const aceOut = useRef();

    const handleResize = () => {
        aceIn.current.resize();
        aceOut.current.resize();
    }

    return ( 
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
     );  
});
 
export default SplitEditor;
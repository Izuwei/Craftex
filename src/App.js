import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';
import TopPanel from './components/TopPanel';
import SplitEditor from './components/SplitEditor';
import ToolTabs from './components/ToolTabs';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ToolList from './components/ToolList';
import Alerts from './components/Alerts';
import arrayMove from 'array-move';
import newID from './scripts/generatorID';
import worker from './scripts/pipeWorker';
import WebWorker from './scripts/WebWorker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    type: 'dark',
  }
});

function App() {
  const alertRef = useRef();
  const [pipeline, setPipeline] = useState([]);

  const [editorContent, setEditorContent] = useState("");
  const [editorResult, setEditorResult] = useState("");

  const addTool = useCallback((tool) => {
    tool.id = newID();
    tool.active = true;
    setPipeline(c => [...c, tool]);
  }, [setPipeline]);

  const removeTool = useCallback((tool) => {
    setPipeline(c => c.filter(each => each.id !== tool.id));
  }, [setPipeline]);

  const updateTool = useCallback((tool) => {
    const tmp = [...pipeline];

    for (var i in tmp) {
      if (tmp[i].id === tool.id) {
        tmp[i] = tool;
        break;
      }
    }
    setPipeline(tmp);
  }, [pipeline, setPipeline]);

  const reactiveTool = useCallback((tool) => {
    const tmp = [...pipeline];

    for (var i in tmp) {
      if (tmp[i].id === tool.id) {
        tmp[i].active = !(tmp[i].active);
        break;
      }
    }
    setPipeline(tmp);
  }, [pipeline, setPipeline]);

  const onSortPipeline = useCallback(({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      setPipeline(pipeline => arrayMove(pipeline, oldIndex, newIndex));
    }
    console.log(pipeline);
  }, [pipeline, setPipeline]);

  const editText = useCallback((newValue) => {
    setEditorContent(newValue);
  }, [setEditorContent]);

  // Do dokumentace napsat proc neni async/await ale useEffect
  // Popsat WebWorkers
  useEffect(() => {
    const pipeWorker = new WebWorker(worker);

    pipeWorker.postMessage({text: editorContent, pipeline: pipeline});

    pipeWorker.onmessage = (event) => {
      setEditorResult(event.data);
    }

    return () => {  // Cleanup
      pipeWorker.terminate();
    }
  }, [editorContent, pipeline, setEditorResult]);

  const showAlert = useCallback((variant, message) => {
    alertRef.current.openSnackbar(variant, message);
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <TopPanel />
        <SplitEditor 
          editorContent={editorContent} 
          editText={editText} 
          editorResult={editorResult}
          showAlert={showAlert} 
        />
        <ToolList 
          tools={pipeline}
          removeTool={removeTool}
          reactiveTool={reactiveTool}
          updateTool={updateTool}
          sort={onSortPipeline}
        />
        <ToolTabs showAlert={showAlert} addTool={addTool}/>
        <Alerts ref={alertRef} />
      </div>
    </MuiThemeProvider>
  );
}

export default App;

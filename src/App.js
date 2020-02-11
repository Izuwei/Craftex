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
import WebWorker from './scripts/WebWorker';
import pipeWorker from './scripts/pipeWorker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    type: 'dark',
  }
});

/**
 * Funkce zkontroluje pole, zda nejsou nastavene breakpointy.
 * Kdyby byla velmi pomala, vytvorit workera.
 */
function emptyBreakpoints(breakpoints) {
  for (var i in breakpoints) {
      if (typeof breakpoints[i] !== typeof undefined) {
          return false;
      }
  }
  return true;
};

function App() {
  const alertRef = useRef();
  const [pipeline, setPipeline] = useState([]);

  const [editorContent, setEditorContent] = useState("");
  const [editorResult, setEditorResult] = useState("");
  const [inspectMode, setInspectMode] = useState({enabled: false, breakpoints: []});
  //const [inspectMode, setInspectMode] = useState(false);

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

  const toggleInspectMode = useCallback(() => {
    setInspectMode(state => ({ ...state, enabled: !state.enabled}));
  }, [setInspectMode]);

  const toggleBreakpoint = useCallback((breakpoints) => {
    setInspectMode(state => ({ ...state, enabled: !emptyBreakpoints(breakpoints), breakpoints: breakpoints}));
  }, [setInspectMode]);

  // Do dokumentace napsat proc neni async/await ale useEffect
  // Popsat WebWorkers
  useEffect(() => {
    const worker = new WebWorker(pipeWorker);

    worker.postMessage({
      text: editorContent, 
      pipeline: pipeline, 
      breakpoints: inspectMode.breakpoints, 
      inspectMode: inspectMode.enabled
    });

    worker.onmessage = (event) => {
      setEditorResult(event.data);
    }

    return () => {  // Cleanup
      worker.terminate();
    }
  }, [editorContent, pipeline, inspectMode, setEditorResult]);
  
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
          toggleBreakpoint={toggleBreakpoint}
          inspectMode={inspectMode.enabled}
          toggleInspectMode={toggleInspectMode}
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

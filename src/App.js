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

//-------------------------------DEBUG------------------------------------
/*
function cutLinesTool(text, tool) {
  text = text.split('\n');

  switch (tool.variant) {
      case "head":
          text = text.slice(0, tool.count);
          return text.join('\n');
      case "tail":
          text = text.slice(text.length - tool.count);
          return text.join('\n');
      default:
          return text.join('\n');
  }
}

function cutLinesInspectTool(text, tool) {
  var count = 0;

  switch (tool.variant) {
      case "head":
          for (let i = 0; i < text.length; i++) {
              if (text[i].data === null) {
                  continue;
              }
              else {
                  count++;
              }
              if (count === parseInt(tool.count)) {
                  for (i++; i < text.length; i++) {
                      text[i].data = null;
                  }
                  return text;
              }
          }
          return text;
      case "tail":
          for (let i = text.length - 1; 0 <= i; i--) {
              if (text[i].data === null) {
                  continue;
              }
              else {
                  count++;
              }
              if (count === parseInt(tool.count)) {
                  for (i--; i >= 0; i--) {
                      text[i].data = null;
                  }
                  return text;
              }
          }
          return text;
      default:
          return text;
  }
}
function insertColumnTool(text, tool) {
  text = text.split('\n');
  const givenColumn = tool.content.split('\n');
  var lineNumber = 0;
  var columns = "";

  while (lineNumber < text.length) {
      columns = text[lineNumber].split(tool.delimiter);

      if (columns.length < tool.position) {
          columns = columns.concat(Array(tool.position - columns.length - 1).fill(""));
      }
      columns.splice(tool.position - 1, 0, givenColumn[lineNumber]);
      text[lineNumber] = columns.join(tool.delimiter);
      lineNumber++;
  }
  while(lineNumber < givenColumn.length) {
      text.push(Array(tool.position - 1).fill(""));
      text[lineNumber].splice(tool.position - 1, 0, givenColumn[lineNumber]);
      text[lineNumber] = text[lineNumber].join(tool.delimiter);
      lineNumber++;
  }
  return text.join('\n');
}
function insertColumnInspectTool(text, tool) {
  const givenColumn = tool.content.split('\n');
  var lineNumber = 0;
  var columns = "";

  while (lineNumber < text.length) {
      if (text[lineNumber].data === null) {
        lineNumber++;
          continue;
      }
      columns = text[lineNumber].data.split(tool.delimiter);

      if (columns.length < tool.position) {
          columns = columns.concat(Array(tool.position - columns.length - 1).fill(""));
      }
      columns.splice(tool.position - 1, 0, givenColumn[lineNumber]);
      text[lineNumber].data = columns.join(tool.delimiter);
      lineNumber++;
  }
  while(lineNumber < givenColumn.length) {
      if (text[lineNumber] === null) {
        lineNumber++;
          continue;
      }
      text.push({number: lineNumber + 1, data: Array(tool.position - 1).fill("")});
      //text.push(Array(tool.position - 1).fill(""));
      text[lineNumber].data.splice(tool.position - 1, 0, givenColumn[lineNumber]);
      text[lineNumber].data = text[lineNumber].data.join(tool.delimiter);
      lineNumber++;
  }
  return text;
}

function processTool(text, tool) {
  var result;

  switch (tool.toolname) {
    case "cutLines":
        result = cutLinesTool(text, tool);
        break;
    case "insertColumn":
        result = insertColumnTool(text, tool);
        break;
    default:
      break;
  }
  
  return result;
};

function processInspectTool(text, tool) {
  var result;

  switch (tool.toolname) {
    case "cutLines":
        result = cutLinesInspectTool(text, tool);
        break;
    case "insertColumn":
        result = insertColumnInspectTool(text, tool);
        break;
    default:
      break;
  }
  
  return result;
};

function proc(data) { // eslint-disable-line no-restricted-globals
  const pipeline = data.pipeline;
  var processData = "";

  if (data.inspectMode === false) {
    processData = data.text;
  }
  else {
      let lines = data.text.split('\n');
      processData = Array(lines.length);

      for (let index = 0; index < processData.length; index++) {
          processData[index] = {number: index + 1, data: lines[index]};
      }
  }
  
  for (var i = 0; i < pipeline.length; i++) {
    if (pipeline[i].active === false)
      continue;

      if (data.inspectMode === false) {
        processData = processTool(processData, pipeline[i]);
      }
      else {
        processData = processInspectTool(processData, pipeline[i]);
      }
  }

  if (data.inspectMode === true) {
    let lines = [];
    let tempData = [];

    for (var breakpoint in data.breakpoints) {
        lines.push(parseInt(breakpoint) + 1);
    }

    for (let index = 0; index < processData.length; index++) {
        if (lines.includes(processData[index].number) && processData[index].data !== null) {
            tempData.push(processData[index].data);
        }
    }

    processData = tempData.join('\n');
}

  return processData;
};
*/
//------------------------------------------------------------------------

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
  const [pipeProgress, setPipeProgress] = useState(100);
  //const [inspectMode, setInspectMode] = useState(false);

  const addTool = useCallback((tool) => {
    tool.id = newID();
    tool.active = true;
    setPipeline(c => [...c, tool]);
  }, [setPipeline]);

  const removeTool = useCallback((tool) => {
    setPipeline(c => c.filter(each => each.id !== tool.id));
  }, [setPipeline]);

  const updateTool = useCallback((tool) => {  // TODO: opravit jen na set
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
    setPipeline(state => state.map(each => {
      if (each.id === tool.id) {
        return {...each, active: !each.active}
      }
      else return each}));
  }, [setPipeline]);

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

  const setPipelineActivity = useCallback((value) => {
    setPipeline(state => state.map(tool => {return {...tool, active: value}}));
  }, [setPipeline]);

  const clearPipeline = useCallback(() => {
    setPipeline([]);
  }, [setPipeline]);

  // Do dokumentace napsat proc neni async/await ale useEffect
  // Popsat WebWorkers
  useEffect(() => {
    //---------------DEBUG---------------------
    /*
    setEditorResult(proc({
      text: editorContent, 
      pipeline: pipeline, 
      breakpoints: inspectMode.breakpoints, 
      inspectMode: inspectMode.enabled
    }));
    */
    //-----------------------------------------
    const worker = new WebWorker(pipeWorker);

    worker.postMessage({
      text: editorContent, 
      pipeline: pipeline, 
      breakpoints: inspectMode.breakpoints, 
      inspectMode: inspectMode.enabled
    });

    worker.onmessage = (event) => {
      if (event.data.type === "progress")
        setPipeProgress(event.data.data);
      else
        setEditorResult(event.data.data);
    };

    return () => {  // Cleanup
      worker.terminate();
    };
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
          pipeProgress={pipeProgress}
          pipeline={pipeline}
          setPipelineActivity={setPipelineActivity}
          clearPipeline={clearPipeline}
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

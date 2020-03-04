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

function uniqueTool(text, tool) {
        var lines = text;
        if (tool.casesensitive === false) {
            lines = lines.toUpperCase();
        }
        lines = lines.split('\n');
        text = text.split('\n');
        var result = [];
        var count = 1;

        switch (tool.variant) {
            case "merge":
                if (tool.countPrefix === true) {
                    for (let i = lines.length - 1; i > 0; i--) {
                        if (lines[i] !== lines[i - 1]) {
                            result.unshift(count + " " + text[i]);
                            count = 1;
                        }
                        else {
                            count++;
                        }
                    }
                    result.unshift(count + " " + text[0]);
                    return result.join('\n');
                }
                else {
                    for (let i = lines.length - 1; i > 0; i--) {
                        if (lines[i] !== lines[i - 1]) {
                            result.unshift(text[i]);
                        }
                    }
                    result.unshift(text[0]);
                    return result.join('\n');
                }
            case "unique":
                if (lines[0] !== lines[1]) {
                    result.push(text[0]);
                }
                for (let i = 1; i < lines.length - 1; i++) {
                    if (lines[i] !== lines[i - 1] && lines[i] !== lines[i + 1]) {
                        result.push(text[i]);
                    }
                }
                if (lines[lines.length - 1] !== lines[lines.length - 2]) {
                    result.push(text[lines.length - 1]);
                }
                return result.join('\n');
            case "duplicate":
                if (lines[0] === lines[1]) {
                    result.push(text[0]);
                }
                for (let i = 1; i < lines.length - 1; i++) {
                    if (lines[i] === lines[i - 1] || lines[i] === lines[i + 1]) {
                        result.push(text[i]);
                    }
                }
                if (lines[lines.length - 1] === lines[lines.length - 2]) {
                    result.push(text[lines.length - 1]);
                }
                return result.join('\n');
            default:
                return text.join('\n');
        }
    }

    function findNextLine(text, index) {
      for (let i = index + 1; i < text.length; i++) {
        if (text[i].data === null) {
          continue;
        }
        return {index: i, line: text[i]};
      }
      return null;
    }

    function findPrevLine(text, index) {
      for (let i = index - 1; i >= 0; i--) {
        if (text[i].data === null) {
          continue;
        }
        return {index: i, line: text[i]};
      }
      return null;
    }

    function uniqueInspectTool(text, tool) {
        var nextLine = null;
        var prevLine = null;
        var count = 1;

        switch (tool.variant) {
            case "merge":
                if (tool.countPrefix === true) {
                    for (let i = text.length - 1; i >= 0; i--) {
                        if (text[i].data === null) {
                            continue;
                        }
                        prevLine = findPrevLine(text, i);
                        if (prevLine === null) {
                          text[i].data = count + " " + text[i].data;
                          return text;
                        }

                        if ((tool.casesensitive === true && text[i].data !== prevLine.line.data) || (tool.casesensitive === false && text[i].data.toUpperCase() !== prevLine.line.data.toUpperCase())) {
                            text[i].data = count + " " + text[i].data;
                            count = 1;
                        }
                        else {
                            text[i].data = null;
                            count++;
                        }
                        i = prevLine.index + 1;  
                    }
                    return text;
                }
                else {
                  for (let i = text.length - 1; i >= 0; i--) {
                      if (text[i].data === null) {
                          continue;
                      }
                      prevLine = findPrevLine(text, i);
                      if (prevLine === null) {
                        return text;
                      }

                      if ((tool.casesensitive === true && text[i].data === prevLine.line.data) || (tool.casesensitive === false && text[i].data.toUpperCase() === prevLine.line.data.toUpperCase())) {
                          text[i].data = null;
                      }
                      i = prevLine.index + 1;  
                  }
                  return text;
                }
            case "unique":
                for (let i = 0; i < text.length - 1; i++) {
                    if (text[i].data === null) {
                      continue;
                    }
                    nextLine = findNextLine(text, i);
                    if (nextLine === null) {
                      return text;
                    }

                    if ((tool.casesensitive === true && text[i].data === nextLine.line.data) || (tool.casesensitive === false && text[i].data.toUpperCase() === nextLine.line.data.toUpperCase())) {
                      text[nextLine.index].data = null;

                      while ((nextLine = findNextLine(text, i)) !== null) {
                        if ((tool.casesensitive === true && text[i].data === nextLine.line.data) || (tool.casesensitive === false && text[i].data.toUpperCase() === nextLine.line.data.toUpperCase())) {
                          text[nextLine.index].data = null;
                        }
                        else {
                          break;
                        }
                      }
                      text[i].data = null;
                    }
                }
                return text;
            case "duplicate":
                for (let i = 0; i < text.length; i++) {
                  if (text[i].data === null) {
                    continue;
                  }
                  nextLine = findNextLine(text, i);
                  if (nextLine === null) {
                    text[i].data = null;
                    continue;
                  }
                  if ((tool.casesensitive === true && text[i].data === nextLine.line.data) || (tool.casesensitive === false && text[i].data.toUpperCase() === nextLine.line.data.toUpperCase())) {
                    for (var j = i; (nextLine = findNextLine(text, nextLine.index)) !== null; j++) {
                      if ((tool.casesensitive === true && text[i].data !== nextLine.line.data) || (tool.casesensitive === false && text[i].data.toUpperCase() !== nextLine.line.data.toUpperCase())) {
                        i = nextLine.index - 1;
                        break;
                      }
                    }
                    i = j + 1;
                  }
                  else {
                    text[i].data = null;
                  }
              }
              return text;
            default:
                return text;
            }
        }

function processTool(text, tool) {
  var result;

  switch (tool.toolname) {
    case "unique":
        result = uniqueTool(text, tool);
        break;
    case "cutLines":
      result = cutLinesTool(text, tool);
      break;
    default:
      break;
  }
  
  return result;
};

function processInspectTool(text, tool) {
  var result;

  switch (tool.toolname) {
    case "unique":
        result = uniqueInspectTool(text, tool);
        break;
    case "cutLines":
      result = cutLinesInspectTool(text, tool);
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

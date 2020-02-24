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
function regexEscape(regex) {
  return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

function replaceGetOpts(tool) {
if (tool.occurrence === "all") {
    return tool.casesensitive === true ? "g" : "gi";
}
else {
    return tool.casesensitive === true ? "" : "i";
}
}

function replaceTool(text, tool) {
const option = replaceGetOpts(tool);

if (tool.inColumn === "") {     // Bez sloupcu -> globalne
    return text.replace(new RegExp(regexEscape(tool.find), option), tool.replace);
}
else {      // Ve sloupci
  var splitedText = text.split('\n');
  var columns = "";

    if (tool.occurrence === "all") {
      for (var i = 0; i < splitedText.length; i++) {
      columns = splitedText[i].split(tool.delimiter);
    
      if (tool.inColumn <= columns.length) {
          columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
          splitedText[i] = columns.join(tool.delimiter);
      }
      }
      return splitedText.join('\n');
    }
    else { 
      for (var z = 0; z < splitedText.length; z++) {
        columns = splitedText[z].split(tool.delimiter);
      
        if (tool.inColumn <= columns.length) {
            if (columns[tool.inColumn - 1].match(new RegExp(tool.find, option)) !== null) {
                columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                splitedText[z] = columns.join(tool.delimiter);
                return splitedText.join('\n');
            }
        }
      }
      return text;
    }
}
};

function replaceInspectTool(text, tool) {
  const option = replaceGetOpts(tool);

  if (tool.inColumn === "") {     // Bez sloupcu -> globalne
      if (tool.occurrence === "all") {    // Vsechno
          for (var i = 0; i < text.length; i++) {
              text[i] = text[i].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
          }
          return text;
      }
      else {          // Prvni vyskyt
          for (var x = 0; x < text.length; x++) {
              if (text[x].match(new RegExp(tool.find, option)) !== null) {
                  text[x] = text[x].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                  break;
              }
          }
          return text;
      }
  }
  else {      // Ve sloupci
      var columns = "";

      if (tool.occurrence === "all") {    // Vsechno
          for (var j = 0; j < text.length; j++) {
              columns = text[j].split(tool.delimiter);
      
              if (tool.inColumn <= columns.length) {
                  columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                  text[j] = columns.join(tool.delimiter);
              }
          }
          return text;
      }
      else {      // Prvni vyskyt
          for (var z = 0; z < text.length; z++) {
              columns = text[z].split(tool.delimiter);
          
              if (tool.inColumn <= columns.length) {
                  if (columns[tool.inColumn - 1].match(new RegExp(regexEscape(tool.find), option)) !== null) {
                      columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                      text[z] = columns.join(tool.delimiter);
                      return text;
                  }
              }
          }
          return text;
      }
  }
}

function processTool(text, tool) {
  var result;

  switch (tool.toolname) {
    case "replace":
      result = replaceTool(text, tool);
      break;
    case "Match":
      result = text.match(new RegExp(".*" + regexEscape(tool.pattern) + ".*", 'g'));
      result === null ? result = "" : result = result.join('\n');
      break;
    default:
      break;
  }
  
  return result;
};

function processInspectTool(text, tool) {
  var result;

  switch (tool.toolname) {
    case "replace":
      result = replaceInspectTool(text, tool);
      break;
    case "Match":
      result = text.match(new RegExp(".*" + regexEscape(tool.pattern) + ".*", 'g'));
      result === null ? result = "" : result = result.join('\n');
      break;
    default:
      break;
  }
  
  return result;
};

function proc(data) { // eslint-disable-line no-restricted-globals
  const pipeline = data.pipeline;

  var processData = data.inspectMode === true ? data.text.split('\n') : data.text;
  
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
    var temp = [];

    for (var breakpoint in data.breakpoints) {
        temp.push(processData[breakpoint]);
    }
    processData = temp.join('\n');
}

  return processData;
};*/

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
    /*setEditorResult(proc({
      text: editorContent, 
      pipeline: pipeline, 
      breakpoints: inspectMode.breakpoints, 
      inspectMode: inspectMode.enabled
    }));*/
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

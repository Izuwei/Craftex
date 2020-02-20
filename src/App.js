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

function replaceFirstInColumn(text, tool, option) {
var lines = text.split('\n');
var columns = "";
var result = "";

for (var z = 0; z < lines.length; z++) {
  columns = lines[z].split(tool.delimiter);

  if (tool.inColumn <= columns.length) {
      if (columns[tool.inColumn - 1].match(new RegExp(tool.find), 'g') !== null) {
          columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
          result += columns.join(tool.delimiter) + '\n';
          lines = lines.slice(z + 1);
          lines = lines.join('\n');
          result += lines;
          return result;
      }
  }
  result += columns.join(tool.delimiter) + '\n';
}
return text;
}

function replaceAllInColumn(text, tool, option) {
  var lines = text.split('\n');
  var result = "";
  var columns = "";

  for (var i = 0; i < lines.length; i++) {
  columns = lines[i].split(tool.delimiter);

  if (tool.inColumn <= columns.length) {
      columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
  }
  result += columns.join(tool.delimiter) + '\n';
  }
  return result.slice(0, -1);
}

function replaceTool(text, tool) {
const option = replaceGetOpts(tool);

if (tool.inColumn === "") {     // Bez sloupcu -> globalne
    return text.replace(new RegExp(regexEscape(tool.find), option), tool.replace);
}
else {      // Ve sloupci
    if (tool.occurrence === "all") {
        return replaceAllInColumn(text, tool, option);
    }
    else {
        return replaceFirstInColumn(text, tool, option);
    }
}
};

function replaceInspectTool(text, originalText, tool, breakpoints) {
  const option = replaceGetOpts(tool);
  var lines = "";

  if (tool.inColumn === "") {     // Bez sloupcu -> globalne
      if (tool.occurrence === "all") {
          return text.replace(new RegExp(regexEscape(tool.find), option), tool.replace);
      }
      else {
          lines = originalText.split('\n');
          for (var x = 0; x < originalText.length; x++) {
              if (lines[x].match(new RegExp(tool.find), 'g') !== null) {
                  if (typeof breakpoints[x] === typeof undefined) {
                      break;
                  }
                  else {
                      return text.replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                  }
              }
          }
          return text;
      }
  }
  else {      // Ve sloupci
      var columns = "";

      if (tool.occurrence === "all") {
          return replaceAllInColumn(text, tool, option);
      }
      else {
          lines = originalText.split('\n');

          for (var z = 0; z < lines.length; z++) {
              columns = lines[z].split(tool.delimiter);
          
              if (tool.inColumn <= columns.length) {
                  if (columns[tool.inColumn - 1].match(new RegExp(tool.find), 'g') !== null) {
                      if (typeof breakpoints[z] === typeof undefined) {
                          return text;
                      }
                      else {
                          return replaceFirstInColumn(text, tool, option);
                      }
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

function processInspectTool(text, originalText, tool, breakpoints) {
  var result;

  switch (tool.toolname) {
    case "replace":
      result = replaceInspectTool(text, originalText, tool, breakpoints);
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
  var processData = [];
  
  if (data.inspectMode) {
      var splitedText = data.text.split('\n');

      for (var each in data.breakpoints) {
          processData.push(splitedText[each]);
      }
      processData = processData.join('\n');
  }
  else {
      processData = data.text;
  }
  
  const pipeline = data.pipeline;
  var tempResult = processData;
  
  for (var i = 0; i < pipeline.length; i++) {
    if (pipeline[i].active === false)
      continue;

      if (data.inspectMode === false) {
          tempResult = processTool(tempResult, pipeline[i]);
      }
      else {
          tempResult = processInspectTool(tempResult, data.text, pipeline[i], data.breakpoints);
      }
  }

  return tempResult;
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

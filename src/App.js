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
import newID from './scripts/newID.js';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[50],
    },
    type: 'dark',
  }
});

// https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
function regexEscape(regex) {
  return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function App() {
  const alertRef = useRef();
  const [pipeline, setPipeline] = useState([]);

  const [editorContent, setEditorContent] = useState("");
  const [editorResult, setEditorResult] = useState("");

  const modify = useRef(false);

  const addTool = useCallback((tool) => {
    tool.id = newID();
    tool.active = true;
    setPipeline(c => [...c, tool]);
    modify.current = true;
    //pipeline.push(tool);
  }, [setPipeline]);

  const removeTool = useCallback((tool) => {
    setPipeline(c => c.filter(each => each.id !== tool.id));
    modify.current = true;
    //pipeline.splice(pipeline.indexOf(tool), 1);
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
    modify.current = true;
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
    modify.current = true;
  }, [pipeline, setPipeline]);

  const onSortPipeline = useCallback(({ oldIndex, newIndex }) => {
    console.log(pipeline);
    setPipeline(pipeline => arrayMove(pipeline, oldIndex, newIndex));
    if (oldIndex !== newIndex)
      modify.current = true;
  }, [pipeline, setPipeline]);

  const editText = useCallback((newValue) => {
    setEditorContent(newValue);
    modify.current = true;
  }, [setEditorContent]);

  const runPipeline = () => {
    var tempResult = editorContent;

    for (var i = 0; i < pipeline.length; i++) {
      if (pipeline[i].active === false)
        continue;

      switch (pipeline[i].tool) {
        case "Replace":
          tempResult = tempResult.replace(new RegExp(regexEscape(pipeline[i].find), 'g'), pipeline[i].replace);
          break;
        case "Match":
          tempResult = tempResult.match(new RegExp(".*" + regexEscape(pipeline[i].pattern) + ".*", 'g'));
          tempResult === null ? tempResult = "" : tempResult = tempResult.join('\n');
          break;
        default:
          break;
      }
    }
    setEditorResult(tempResult);
  };

  // Do dokumentace napsat proc neni async/await ale useEffect
  useEffect(() => {
    /*for (var i = 0; i < pipeline.length; i++){  // Nejspis nebude potreba
      if (pipeline[i].id !== (i + 1))
        pipeline[i].id = (i + 1);
    }*/

    if (modify.current === true) {
      runPipeline();
      modify.current = false;
    }
    
    console.log(pipeline);
  });

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

export default () => {

    // https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
    function regexEscape(regex) {
        return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
      
    /**
     * Replace nastroj
     */
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

    /**
     * Ridici funkce
     */
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

    self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        var processData = [];
        
        if (event.data.inspectMode) {
            var splitedText = event.data.text.split('\n');

            for (var each in event.data.breakpoints) {
                processData.push(splitedText[each]);
            }
            processData = processData.join('\n');
        }
        else {
            processData = event.data.text;
        }
        
        const pipeline = event.data.pipeline;
        const unit = Math.ceil(100 / pipeline.length);
        var tempResult = processData;
        
        for (var i = 0; i < pipeline.length; i++) {
        	if (pipeline[i].active === false)
        		continue;

            if (event.data.inspectMode === false) {
                tempResult = processTool(tempResult, pipeline[i]);
            }
            else {
                tempResult = processInspectTool(tempResult, event.data.text, pipeline[i], event.data.breakpoints);
            }
            
            postMessage({type: "progress", data: (i + 1) === pipeline.length ? 100 : (i + 1) * unit});
        }

        postMessage({type: "result", data: tempResult});
    });
}
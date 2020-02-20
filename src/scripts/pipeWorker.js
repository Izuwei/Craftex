export default () => {

    // https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
    function regexEscape(regex) {
        return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };

    function replaceTool(text, tool) {
        if (tool.inColumn === "") {     // Bez sloupcu -> globalne
            if (tool.occurrence === "all") {    // All
                if (tool.casesensitive === true) {
                    return text.replace(new RegExp(regexEscape(tool.find), 'g'), tool.replace);
                }
                else {
                    return text.replace(new RegExp(regexEscape(tool.find), 'gi'), tool.replace);
                }
            }
            else {                              // First
                if (tool.casesensitive === true) {
                    return text.replace(new RegExp(regexEscape(tool.find), ''), tool.replace);
                }
                else {
                    return text.replace(new RegExp(regexEscape(tool.find), 'i'), tool.replace);
                }
            }
        }
        else {      // Ve sloupci
            var lines = text.split('\n');
            var result = "";
            var columns = "";
            var option = "";
            
            if (tool.occurrence === "all") {
                tool.casesensitive === true ? option = "g" : option = "gi";
            }
            else {
                tool.casesensitive === true ? option = "" : option = "i";
            }
      
            for (var i = 0; i < lines.length; i++) {
                columns = lines[i].split(tool.delimiter);

                if (tool.inColumn <= columns.length) {
                    columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                }
                result += columns.join(tool.delimiter) + '\n';
            }
            return result.slice(0, -1);
        }
    };

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

            tempResult = processTool(tempResult, pipeline[i]);
            
            postMessage({type: "progress", data: (i + 1) === pipeline.length ? 100 : (i + 1) * unit});
        }

        postMessage({type: "result", data: tempResult});
    });
}
export default () => {

    // https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
    function regexEscape(regex) {
        return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };

    function processTool(text, tool) {
        var result;

        switch (tool.toolname) {
        	case "replace":
        		result = text.replace(new RegExp(regexEscape(tool.find), 'g'), tool.replace);
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
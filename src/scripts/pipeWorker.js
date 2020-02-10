export default () => {

    // https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
    function regexEscape(regex) {
        return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };

    function run(text, pipeline) {
        var tempResult = text;
    
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

        return tempResult;
    };

    self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals

        postMessage(run(event.data.text, event.data.pipeline));
    });
}
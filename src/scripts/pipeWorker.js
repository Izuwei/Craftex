
export default () => {

    // https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
    function regexEscape(regex) {
        return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    };
      
    /**
     * Replace nastroj
     * TODO: dodelat osetreni na undefined
     */
    function getMatchOptions(tool) {
      if (tool.occurrence === "all") {
          return tool.casesensitive === true ? "g" : "gi";
      }
      else {
          return tool.casesensitive === true ? "" : "i";
      }
    }
    
    function replaceTool(text, tool) {
        const option = getMatchOptions(tool);
        
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
                        if (columns[tool.inColumn - 1].match(new RegExp(regexEscape(tool.find), option)) !== null) {
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
        const option = getMatchOptions(tool);
      
        if (tool.inColumn === "") {     // Bez sloupcu -> globalne
            if (tool.occurrence === "all") {    // Vsechno
                for (var i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }

                    text[i] = text[i].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                }
                return text;
            }
            else {          // Prvni vyskyt
                for (var x = 0; x < text.length; x++) {
                    if (text[x] === null) {
                        continue;
                    }

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
                    if (text[j] === null) {
                        continue;
                    }
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
                    if (text[z] === null) {
                        continue;
                    }
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

    function regexReplaceAll(lines, tool) {
        var option = tool.casesensitive ? "g" : "gi";
        var tmp = "";

        for (let i = 0; i < lines.length; i++) {
            tmp = lines[i].match(new RegExp(tool.find, option));

            if (tmp === null) {
                continue;
            }

            var specificMatch = true;
            for (let j = 0; j < tmp.length; j++) {
              if (tmp[j] === "") {
                specificMatch = false;
                break;
              }
            }

            if (specificMatch === true) {
                lines[i] = lines[i].replace(new RegExp(tool.find, option), tool.replace);
                continue;
            }
            
            var fullMatch = tmp[0].length === lines[i].length ? true : false;
            if (fullMatch === true) {
              lines[i] = tool.replace;
            }
            else {
                lines[i] = lines[i].split(new RegExp(tool.find, option));
                var firstChar = lines[i][0] === "" ? "" : tool.replace;
                var lastChar = lines[i][lines[i].length - 1] === "" ? "" : tool.replace;
                lines[i] = firstChar + lines[i].join(tool.replace) + lastChar;
            }
        }
        return lines;
    }

    /**
     * Regex replace nastroj
     */
    function regexReplaceTool(text, tool) {
        const option = getMatchOptions(tool);
        var splitedText = text.split('\n');
        
        if (tool.inColumn === "") {     // Bez sloupcu -> globalne
            if (tool.occurrence === "all") {    // Vsechno
                /*for (var y = 0; y < splitedText.length; y++) {  // TODO: otestovat na fullmatch
                    splitedText[y] = splitedText[y].replace(new RegExp(tool.find, option), tool.replace);
                }
                return splitedText.join('\n');*/
                return regexReplaceAll(splitedText, tool).join('\n');
            }
            else {                              // Pouze prvni vyskyt
                for (let i = 0; i < splitedText.length; i++) {
                    if (splitedText[i].match(new RegExp(tool.find, option)) !== null) {
                        splitedText[i] = splitedText[i].replace(new RegExp(tool.find, option), tool.replace);
                        return splitedText.join('\n');
                    }
                }
                return text;
            }
        }
        else {      // Ve sloupci
            var columns = "";
        
            if (tool.occurrence === "all") {    // Vsechno
                for (let i = 0; i < splitedText.length; i++) {
                    columns = splitedText[i].split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        columns[tool.inColumn - 1] = regexReplaceAll([columns[tool.inColumn - 1]], tool);
                        splitedText[i] = columns.join(tool.delimiter);
                    }
                }
                return splitedText.join('\n');
            }
            else {                              // Prvni vyskyt
                for (let z = 0; z < splitedText.length; z++) {
                    columns = splitedText[z].split(tool.delimiter);
              
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(tool.find, option)) !== null) {
                            columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(tool.find, option), tool.replace);
                            splitedText[z] = columns.join(tool.delimiter);
                            return splitedText.join('\n');
                        }
                    }
                }
                return text;
            }
        }
    };
    
    function regexReplaceInspectTool(text, tool) {
        const option = getMatchOptions(tool);
      
        if (tool.inColumn === "") {     // Bez sloupcu -> globalne
            if (tool.occurrence === "all") {    // Vsechno
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }
                    text[i] = regexReplaceAll([text[i]], tool)[0];
                    //text[i] = text[i].replace(new RegExp(tool.find, option), tool.replace);
                }
                return text;
            }
            else {          // Prvni vyskyt
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }

                    if (text[i].match(new RegExp(tool.find, option)) !== null) {
                        text[i] = text[i].replace(new RegExp(tool.find, option), tool.replace);
                        break;
                    }
                }
                return text;
            }
        }
        else {      // Ve sloupci
            var columns = "";
      
            if (tool.occurrence === "all") {    // Vsechno
                for (let j = 0; j < text.length; j++) {
                    if (text[j] === null) {
                        continue;
                    }

                    columns = text[j].split(tool.delimiter);
            
                    if (tool.inColumn <= columns.length) {
                        columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(tool.find, option), tool.replace);
                        text[j] = columns.join(tool.delimiter);
                    }
                }
                return text;
            }
            else {      // Prvni vyskyt
                for (let z = 0; z < text.length; z++) {
                    if (text[z] === null) {
                        continue;
                    }

                    columns = text[z].split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(tool.find, option)) !== null) {
                            columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(tool.find, option), tool.replace);
                            text[z] = columns.join(tool.delimiter);
                            return text;
                        }
                    }
                }
                return text;
            }
        }
    }

    /**
     * Match nastroj
     */
    function matchTool(text, tool) {    // TODO: tady pokracovat
        const option = getMatchOptions(tool);
        
        if (tool.inColumn === "") {     // Bez sloupcu -> globalne
            text = text.match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option));
            return text === null ? "" : text.join('\n');
        }
        else {      // Ve sloupci
            var splitedText = text.split('\n');
            var columns = "";
            var result = "";
        
            if (tool.occurrence === "all") {    // Vsechno
                for (let i = 0; i < splitedText.length; i++) {
                    columns = splitedText[i].split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        if (null !== columns[tool.inColumn - 1].match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option))) {
                            result += splitedText[i] + '\n';
                        }
                    }
                }
                return result.slice(0, -1);
            }
            else { 
                for (let z = 0; z < splitedText.length; z++) {
                    columns = splitedText[z].split(tool.delimiter);
              
                    if (tool.inColumn <= columns.length) {
                        if (null !== columns[tool.inColumn - 1].match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option))) {
                            return splitedText[z];
                        }
                    }
                }
                return "";
            }
        }
    };

    function matchInspectTool(text, tool) {
        const option = getMatchOptions(tool);
        
        if (tool.inColumn === "") {     // Bez sloupcu -> globalne
            if (tool.occurrence === "all") {        // Vsechny radky
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }
                    if (text[i].match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option)) === null) {
                        text[i] = null;
                    }
                }
                return text;
            }
            else {  // Prvni vyskyt
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }
                    if (text[i].match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option)) === null) {
                        text[i] = null;
                    }
                    else {
                        for (let j = i + 1; j < text.length; j++) {
                            text[j] = null;
                        }
                        return text;
                    }
                }
                return text;
            }
        }
        else {      // Ve sloupci
            var columns = "";
        
            if (tool.occurrence === "all") {    // Vsechno
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }
                    columns = text[i].split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        if (null === columns[tool.inColumn - 1].match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option))) {
                            text[i] = null;
                        }
                    }
                    else {
                        text[i] = null;
                    }
                }
                return text;
            }
            else {          // Prvni vyskyt
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }
                    columns = text[i].split(tool.delimiter);
              
                    if (tool.inColumn <= columns.length) {
                        if (null === columns[tool.inColumn - 1].match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option))) {
                            text[i] = null;
                        }
                        else {
                            for (let j = i + 1; j < text.length; j++) {
                                text[j] = null;
                            }
                            return text;
                        }
                    }
                    else {
                        text[i] = null;
                    }
                }
                return text;
            }
        }
    }

    /**
     * Regex match nastroj
     */
    function regexMatchTool(text, tool) {    // TODO: tady pokracovat
        const option = getMatchOptions(tool);
        var lines = text.split('\n');
        var result = "";
        
        if (tool.inColumn === "") {     // Bez sloupcu -> globalne
            if (tool.occurrence === "all") {    // Vsechny vyskyty
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].match(new RegExp(tool.expression, option)) !== null) {
                        result += lines[i] + '\n';
                    }
                }
                return result.slice(0, -1);
            }
            else {
                for (let i = 0; i < lines.length; i++) {
                    if (lines[i].match(new RegExp(tool.expression, option)) !== null) {
                        return lines[i];
                    }
                }
                return "";
            }
        }
        else {      // Ve sloupci
            var columns = "";
        
            if (tool.occurrence === "all") {    // Vsechno
                for (let i = 0; i < lines.length; i++) {
                    columns = lines[i].split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(tool.expression, option)) !== null) {
                            result += lines[i] + '\n';
                        }
                    }
                }
                return result.slice(0, -1);
            }
            else { 
                for (let i = 0; i < lines.length; i++) {
                    columns = lines[i].split(tool.delimiter);
              
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(tool.expression, option)) !== null) {
                            return lines[i];
                        }
                    }
                }
                return "";
            }
        }
    };

    function regexMatchInspectTool(text, tool) {    // TODO: osetreni na null
        const option = getMatchOptions(tool);
        
        if (tool.inColumn === "") {     // Bez sloupcu -> globalne
            if (tool.occurrence === "all") {    // Vsechny vyskyty
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }

                    if (text[i].match(new RegExp(tool.expression, option)) === null) {
                        text[i] = null;
                    }
                }
                return text;
            }
            else {
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }

                    if (text[i].match(new RegExp(tool.expression, option)) !== null) {
                        for (let j = i + 1; j < text.length; j++) {
                            text[j] = null;
                        }
                        return text;
                    }
                }
                return text;
            }
        }
        else {      // Ve sloupci
            var columns = "";
        
            if (tool.occurrence === "all") {    // Vsechno
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }
                    columns = text[i].split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(tool.expression, option)) === null) {
                            text[i] = null;
                        }
                    }
                    else {
                        text[i] = null;
                    }
                }
                return text;
            }
            else { 
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === null) {
                        continue;
                    }
                    columns = text[i].split(tool.delimiter);
              
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(tool.expression, option)) !== null) {
                            for (let j = i + 1; j < text.length; j++) {
                                text[j] = null;
                            }
                        }
                        else {
                            text[i] = null;
                        }
                    }
                    else {
                        text[i] = null;
                    }
                }
                return text;
            }
        }
    };

    function removeColumnTool(text, tool) {
        text = text.split('\n');
        var columns = "";

        for (let i = 0; i < text.length; i++) {
            columns = text[i].split(tool.delimiter);

            if (tool.position <= columns.length) {
                columns.splice(tool.position - 1, 1);
                text[i] = columns.join(tool.delimiter);
            }
        }
        return text.join('\n');
    };

    function removeColumnInspectTool(text, tool) {
        var columns = "";

        for (let i = 0; i < text.length; i++) {
            if (text[i] === null) {
                continue;
            }
            columns = text[i].split(tool.delimiter);

            if (tool.position <= columns.length) {
                columns.splice(tool.position - 1, 1);
                text[i] = columns.join(tool.delimiter);
            }
        }
        return text;
    };

    /**
     * Compare nastroj
     */
    function compareTool(text, tool) {
        var lines = text.split('\n');
        var result = "";
        var columns = "";

        switch (tool.comparator) {
            case "gt":
                if (tool.inColumn === "") {
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i] > tool.value) {
                            result += lines[i] + '\n';
                        }
                    }
                }
                else {
                    for (let i = 0; i < lines.length; i++) {
                        columns = lines[i].split(tool.delimiter);

                        if (tool.inColumn <= columns.length) {
                            if (columns[tool.inColumn - 1] > tool.value) {
                                result += lines[i] + '\n';
                            }
                        }
                    }
                }
                return result.slice(0, -1);
            case "ge":
                if (tool.inColumn === "") {
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i] >= tool.value) {
                            result += lines[i] + '\n';
                        }
                    }
                }
                else {
                    for (let i = 0; i < lines.length; i++) {
                        columns = lines[i].split(tool.delimiter);

                        if (tool.inColumn <= columns.length) {
                            if (columns[tool.inColumn - 1] >= tool.value) {
                                result += lines[i] + '\n';
                            }
                        }
                    }
                }
                return result.slice(0, -1);
            case "lt":
                if (tool.inColumn === "") {
                    for (let i = 0; i < lines.length; i++) {
                        if (lines[i] < tool.value) {
                            result += lines[i] + '\n';
                        }
                    }
                }
                else {
                    for (let i = 0; i < lines.length; i++) {
                        columns = lines[i].split(tool.delimiter);

                        if (tool.inColumn <= columns.length) {
                            if (columns[tool.inColumn - 1] < tool.value) {
                                result += lines[i] + '\n';
                            }
                        }
                    }
                }
                return result.slice(0, -1);
                case "le":
                    if (tool.inColumn === "") {
                        for (let i = 0; i < lines.length; i++) {
                            if (lines[i] <= tool.value) {
                                result += lines[i] + '\n';
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < lines.length; i++) {
                            columns = lines[i].split(tool.delimiter);
    
                            if (tool.inColumn <= columns.length) {
                                if (columns[tool.inColumn - 1] <= tool.value) {
                                    result += lines[i] + '\n';
                                }
                            }
                        }
                    }
                    return result.slice(0, -1);
                case "eq":
                        if (tool.inColumn === "") {
                            for (let i = 0; i < lines.length; i++) {
                                if (lines[i] === tool.value) {
                                    result += lines[i] + '\n';
                                }
                            }
                        }
                        else {
                            for (let i = 0; i < lines.length; i++) {
                                columns = lines[i].split(tool.delimiter);
        
                                if (tool.inColumn <= columns.length) {
                                    if (columns[tool.inColumn - 1] === tool.value) {
                                        result += lines[i] + '\n';
                                    }
                                }
                            }
                        }
                        return result.slice(0, -1);
            default:
                return text;
        }
    }

    function compareInspectTool(text, tool) {
        var columns = "";

        switch (tool.comparator) {
            case "gt":
                if (tool.inColumn === "") {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === null) {
                            continue;
                        }
                        if (!(text[i] > tool.value)) {
                            text[i] = null;
                        }
                    }
                }
                else {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === null) {
                            continue;
                        }
                        columns = text[i].split(tool.delimiter);

                        if (tool.inColumn <= columns.length) {
                            if (!(columns[tool.inColumn - 1] > tool.value)) {
                                text[i] = null;
                            }
                        }
                        else {
                            text[i] = null;
                        }
                    }
                }
                return text;
            case "ge":
                if (tool.inColumn === "") {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === null) {
                            continue;
                        }
                        if (!(text[i] >= tool.value)) {
                            text[i] = null;
                        }
                    }
                }
                else {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === null) {
                            continue;
                        }
                        columns = text[i].split(tool.delimiter);

                        if (tool.inColumn <= columns.length) {
                            if (!(columns[tool.inColumn - 1] >= tool.value)) {
                                text[i] = null;
                            }
                        }
                        else {
                            text[i] = null;
                        }
                    }
                }
                return text;
            case "lt":
                if (tool.inColumn === "") {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === null) {
                            continue;
                        }
                        if (!(text[i] < tool.value)) {
                            text[i] = null;
                        }
                    }
                }
                else {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === null) {
                            continue;
                        }
                        columns = text[i].split(tool.delimiter);

                        if (tool.inColumn <= columns.length) {
                            if (!(columns[tool.inColumn - 1] < tool.value)) {
                                text[i] = null;
                            }
                        }
                        else {
                            text[i] = null;
                        }
                    }
                }
                return text;
                case "le":
                    if (tool.inColumn === "") {
                        for (let i = 0; i < text.length; i++) {
                            if (text[i] === null) {
                                continue;
                            }
                            if (!(text[i] <= tool.value)) {
                                text[i] = null;
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < text.length; i++) {
                            if (text[i] === null) {
                                continue;
                            }
                            columns = text[i].split(tool.delimiter);
    
                            if (tool.inColumn <= columns.length) {
                                if (!(columns[tool.inColumn - 1] <= tool.value)) {
                                    text[i] = null;
                                }
                            }
                            else {
                                text[i] = null;
                            }
                        }
                    }
                    return text;
                case "eq":
                        if (tool.inColumn === "") {
                            for (let i = 0; i < text.length; i++) {
                                if (text[i] === null) {
                                    continue;
                                }
                                if (!(text[i] === tool.value)) {
                                    text[i] = null;
                                }
                            }
                        }
                        else {
                            for (let i = 0; i < text.length; i++) {
                                if (text[i] === null) {
                                    continue;
                                }
                                columns = text[i].split(tool.delimiter);
        
                                if (tool.inColumn <= columns.length) {
                                    if (!(columns[tool.inColumn - 1] === tool.value)) {
                                        text[i] = null;
                                    }
                                }
                                else {
                                    text[i] = null;
                                }
                            }
                        }
                        return text;
            default:
                return text;
        }
    }

    /**
     * RemoveLines nastroj
     */
    function removeLinesTool(text, tool) {
        switch (tool.content) {
            case "empty":
                text = text.replace(/\n+/g, '\n');
                break;
            case "whiteSpaces":
                text = text.replace(/^\s*[\r\n]/gm, '');
                break;
            default:
                return text;
        }
        if (text.charAt(0) === '\n') {
            text = text.slice(1)
        }
        if (text.charAt(text.length - 1) === '\n') {
            text = text.slice(0, -1);
        }
        return text;
    }

    function removeLinesInspectTool(text, tool) {
        switch (tool.content) {
            case "empty":
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === "") {
                        text[i] = null;
                    }
                }
                return text;
            case "whiteSpaces":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].trim() === "") {
                        text[i] = null;
                    }
                }
                return text;
            default:
                return text;
        }
    }

    /**
     * Ridici funkce
     */
    function processTool(text, tool) {
        var result = "";

        switch (tool.toolname) {
            case "match":
                result = matchTool(text, tool);
                break;
            case "regexMatch":
                result = regexMatchTool(text, tool);
                break;
        	case "replace":
        		result = replaceTool(text, tool);
                break;
            case "regexReplace":
                result = regexReplaceTool(text, tool);
                break;
            case "compare":
                result = compareTool(text, tool);
                break;
            case "removeColumn":
                result = removeColumnTool(text, tool);
                break;
            case "removeLines":
                result = removeLinesTool(text, tool);
                break;
        	default:
        		break;
        }
        
        return result;
    };

    function processInspectTool(text, tool) {
        var result = "";
      
        switch (tool.toolname) {
            case "match":
                result = matchInspectTool(text, tool);
                break;
            case "regexMatch":
                result = regexMatchInspectTool(text, tool);
                break;
            case "replace":
                result = replaceInspectTool(text, tool);
                break;
            case "regexReplace":
                result = regexReplaceInspectTool(text, tool);
                break;
            case "compare":
                result = compareInspectTool(text, tool);
                break;
            case "removeColumn":
                result = removeColumnInspectTool(text, tool);
                break;
            case "removeLines":
                result = removeLinesInspectTool(text, tool);
                break;
            default:
                break;
        }
        return result;
    };

    self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        var processData = event.data.inspectMode === true ? event.data.text.split('\n') : event.data.text;

        const pipeline = event.data.pipeline;
        const unit = Math.ceil(100 / pipeline.length);

        if (pipeline.length > 0) {
            postMessage({type: "progress", data: 0});
        }
        
        for (var i = 0; i < pipeline.length; i++) {
        	if (pipeline[i].active === true) {
                if (event.data.inspectMode === false) {
                    processData = processTool(processData, pipeline[i]);
                }
                else {
                    processData = processInspectTool(processData, pipeline[i]);
                }
            }

            postMessage({type: "progress", data: (i + 1) === pipeline.length ? 100 : (i + 1) * unit});
        }

        if (event.data.inspectMode === true) {
            var temp = [];
            console.log(processData);
            for (var breakpoint in event.data.breakpoints) {
                if (processData[breakpoint] !== null) {
                    temp.push(processData[breakpoint]);
                }
            }
            processData = temp.join('\n');
        }

        postMessage({type: "result", data: processData});
    });
}
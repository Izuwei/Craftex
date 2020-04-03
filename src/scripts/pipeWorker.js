
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
                    if (text[i].data === null) {
                        continue;
                    }

                    text[i].data = text[i].data.replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                }
                return text;
            }
            else {          // Prvni vyskyt
                for (var x = 0; x < text.length; x++) {
                    if (text[x].data === null) {
                        continue;
                    }

                    if (text[x].data.match(new RegExp(tool.find, option)) !== null) {
                        text[x].data = text[x].data.replace(new RegExp(regexEscape(tool.find), option), tool.replace);
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
                    if (text[j].data === null) {
                        continue;
                    }
                    columns = text[j].data.split(tool.delimiter);
            
                    if (tool.inColumn <= columns.length) {
                        columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                        text[j].data = columns.join(tool.delimiter);
                    }
                }
                return text;
            }
            else {      // Prvni vyskyt
                for (var z = 0; z < text.length; z++) {
                    if (text[z].data === null) {
                        continue;
                    }
                    columns = text[z].data.split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(regexEscape(tool.find), option)) !== null) {
                            columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(regexEscape(tool.find), option), tool.replace);
                            text[z].data = columns.join(tool.delimiter);
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
              if (tmp[j] === "" && tmp.length > 1) {
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
                    if (text[i].data === null) {
                        continue;
                    }
                    text[i].data = regexReplaceAll([text[i].data], tool)[0];
                    //text[i] = text[i].replace(new RegExp(tool.find, option), tool.replace);
                }
                return text;
            }
            else {          // Prvni vyskyt
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }

                    if (text[i].data.match(new RegExp(tool.find, option)) !== null) {
                        text[i].data = text[i].data.replace(new RegExp(tool.find, option), tool.replace);
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
                    if (text[j].data === null) {
                        continue;
                    }

                    columns = text[j].data.split(tool.delimiter);
            
                    if (tool.inColumn <= columns.length) {
                        columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(tool.find, option), tool.replace);
                        text[j].data = columns.join(tool.delimiter);
                    }
                }
                return text;
            }
            else {      // Prvni vyskyt
                for (let z = 0; z < text.length; z++) {
                    if (text[z].data === null) {
                        continue;
                    }

                    columns = text[z].data.split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(tool.find, option)) !== null) {
                            columns[tool.inColumn - 1] = columns[tool.inColumn - 1].replace(new RegExp(tool.find, option), tool.replace);
                            text[z].data = columns.join(tool.delimiter);
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
    function matchTool(text, tool) {
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
                    if (text[i].data === null) {
                        continue;
                    }
                    if (text[i].data.match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option)) === null) {
                        text[i].data = null;
                    }
                }
                return text;
            }
            else {  // Prvni vyskyt
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    if (text[i].data.match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option)) === null) {
                        text[i].data = null;
                    }
                    else {
                        for (let j = i + 1; j < text.length; j++) {
                            text[j].data = null;
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
                    if (text[i].data === null) {
                        continue;
                    }
                    columns = text[i].data.split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        if (null === columns[tool.inColumn - 1].match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option))) {
                            text[i].data = null;
                        }
                    }
                    else {
                        text[i].data = null;
                    }
                }
                return text;
            }
            else {          // Prvni vyskyt
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    columns = text[i].data.split(tool.delimiter);
              
                    if (tool.inColumn <= columns.length) {
                        if (null === columns[tool.inColumn - 1].match(new RegExp(".*" + regexEscape(tool.expression) + ".*", option))) {
                            text[i].data = null;
                        }
                        else {
                            for (let j = i + 1; j < text.length; j++) {
                                text[j].data = null;
                            }
                            return text;
                        }
                    }
                    else {
                        text[i].data = null;
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
                    if (text[i].data === null) {
                        continue;
                    }

                    if (text[i].data.match(new RegExp(tool.expression, option)) === null) {
                        text[i].data = null;
                    }
                }
                return text;
            }
            else {
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }

                    if (text[i].data.match(new RegExp(tool.expression, option)) !== null) {
                        for (let j = i + 1; j < text.length; j++) {
                            text[j].data = null;
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
                    if (text[i].data === null) {
                        continue;
                    }
                    columns = text[i].data.split(tool.delimiter);
                
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(tool.expression, option)) === null) {
                            text[i].data = null;
                        }
                    }
                    else {
                        text[i].data = null;
                    }
                }
                return text;
            }
            else { 
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    columns = text[i].data.split(tool.delimiter);
              
                    if (tool.inColumn <= columns.length) {
                        if (columns[tool.inColumn - 1].match(new RegExp(tool.expression, option)) !== null) {
                            for (let j = i + 1; j < text.length; j++) {
                                text[j].data = null;
                            }
                        }
                        else {
                            text[i].data = null;
                        }
                    }
                    else {
                        text[i].data = null;
                    }
                }
                return text;
            }
        }
    };

    function filterColumnsTool(text, tool) {
        text = text.split('\n');
        var columns = "";

        switch (tool.variant) {
            case "remove":
                for (let i = 0; i < text.length; i++) {
                    columns = text[i].split(tool.delimiter);

                    if (tool.position <= columns.length) {
                        columns.splice(tool.position - 1, 1);
                        text[i] = columns.join(tool.delimiter);
                    }
                }
                return text.join('\n');
            case "cut":
                for (let i = 0; i < text.length; i++) {
                    columns = text[i].split(tool.delimiter);

                    if (tool.position <= columns.length) {
                        text[i] = columns[tool.position - 1];
                    }
                    else {
                        text[i] = "";
                    }
                }
                return text.join('\n');
            default:
                return text.join('\n');
        }
    };

    function filterColumnsInspectTool(text, tool) {
        var columns = "";

        switch (tool.variant) {
            case "remove":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    columns = text[i].data.split(tool.delimiter);

                    if (tool.position <= columns.length) {
                        columns.splice(tool.position - 1, 1);
                        text[i].data = columns.join(tool.delimiter);
                    }
                }
                return text;
            case "cut":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    columns = text[i].data.split(tool.delimiter);

                    if (tool.position <= columns.length) {
                        text[i].data = columns[tool.position - 1];
                    }
                    else {
                        text[i].data = "";
                    }
                }
                return text;
            default:
                return text;
        }
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
                        if (text[i].data === null) {
                            continue;
                        }
                        if (!(text[i].data > tool.value)) {
                            text[i].data = null;
                        }
                    }
                }
                else {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].data === null) {
                            continue;
                        }
                        columns = text[i].data.split(tool.delimiter);

                        if (tool.inColumn <= columns.length) {
                            if (!(columns[tool.inColumn - 1] > tool.value)) {
                                text[i].data = null;
                            }
                        }
                        else {
                            text[i].data = null;
                        }
                    }
                }
                return text;
            case "ge":
                if (tool.inColumn === "") {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].data === null) {
                            continue;
                        }
                        if (!(text[i].data >= tool.value)) {
                            text[i].data = null;
                        }
                    }
                }
                else {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].data === null) {
                            continue;
                        }
                        columns = text[i].data.split(tool.delimiter);

                        if (tool.inColumn <= columns.length) {
                            if (!(columns[tool.inColumn - 1] >= tool.value)) {
                                text[i].data = null;
                            }
                        }
                        else {
                            text[i].data = null;
                        }
                    }
                }
                return text;
            case "lt":
                if (tool.inColumn === "") {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].data === null) {
                            continue;
                        }
                        if (!(text[i] < tool.value)) {
                            text[i].data = null;
                        }
                    }
                }
                else {
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].data === null) {
                            continue;
                        }
                        columns = text[i].data.split(tool.delimiter);

                        if (tool.inColumn <= columns.length) {
                            if (!(columns[tool.inColumn - 1] < tool.value)) {
                                text[i].data = null;
                            }
                        }
                        else {
                            text[i].data = null;
                        }
                    }
                }
                return text;
                case "le":
                    if (tool.inColumn === "") {
                        for (let i = 0; i < text.length; i++) {
                            if (text[i].data === null) {
                                continue;
                            }
                            if (!(text[i].data <= tool.value)) {
                                text[i].data = null;
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < text.length; i++) {
                            if (text[i].data === null) {
                                continue;
                            }
                            columns = text[i].data.split(tool.delimiter);
    
                            if (tool.inColumn <= columns.length) {
                                if (!(columns[tool.inColumn - 1] <= tool.value)) {
                                    text[i].data = null;
                                }
                            }
                            else {
                                text[i].data = null;
                            }
                        }
                    }
                    return text;
                case "eq":
                        if (tool.inColumn === "") {
                            for (let i = 0; i < text.length; i++) {
                                if (text[i].data === null) {
                                    continue;
                                }
                                if (!(text[i].data === tool.value)) {
                                    text[i].data = null;
                                }
                            }
                        }
                        else {
                            for (let i = 0; i < text.length; i++) {
                                if (text[i].data === null) {
                                    continue;
                                }
                                columns = text[i].data.split(tool.delimiter);
        
                                if (tool.inColumn <= columns.length) {
                                    if (!(columns[tool.inColumn - 1] === tool.value)) {
                                        text[i].data = null;
                                    }
                                }
                                else {
                                    text[i].data = null;
                                }
                            }
                        }
                        return text;
            default:
                return text;
        }
    }

    /**
     * FilterLines nastroj
     */
    function filterLinesTool(text, tool) {
        switch (tool.content) {
            case "empty":
                text = text.replace(/\n+/g, '\n');
                break;
            case "whiteChars":
                text = text.replace(/^\s*[\r\n]/gm, '');
                text = text.replace(/[\r\n]\s*$/g, '');
                break;
            case "custom":
                text = text.split('\n');
                var option = tool.casesensitive === true ? "g" : "gi";

                if (tool.column === "") {   // Cele radky
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].match(new RegExp(".*" + regexEscape(tool.customContent) + ".*", option)) !== null) {
                            text.splice(i, 1);
                            i--;
                        }
                    }
                }
                else {      // Ve sloupci
                    var column = "";
                    for (let i = 0; i < text.length; i++) {
                        column = text[i].split(tool.delimiter);
                        if (column.length < tool.column) {
                            continue;
                        }
                        if (column[tool.column - 1].match(new RegExp(".*" + regexEscape(tool.customContent) + ".*", option)) !== null) {
                            text.splice(i, 1);
                            i--;
                        }
                    }
                }
                return text.join('\n');
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

    function filterLinesInspectTool(text, tool) {
        switch (tool.content) {
            case "empty":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === "") {
                        text[i].data = null;
                    }
                }
                return text;
            case "whiteChars":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    if (text[i].data.trim() === "") {
                        text[i].data = null;
                    }
                }
                return text;
            case "custom":
                var option = tool.casesensitive === true ? "g" : "gi";

                if (tool.column === "") {   // Cele radky
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].data === null) {
                            continue;
                        }
                        if (text[i].data.match(new RegExp(".*" + regexEscape(tool.customContent) + ".*", option)) !== null) {
                            text[i].data = null;
                        }
                    }
                }
                else {      // Ve sloupci
                    var column = "";
                    for (let i = 0; i < text.length; i++) {
                        if (text[i].data === null) {
                            continue;
                        }
                        column = text[i].data.split(tool.delimiter);
                        if (column.length < tool.column) {
                            continue;
                        }
                        if (column[tool.column - 1].match(new RegExp(".*" + regexEscape(tool.customContent) + ".*", option)) !== null) {
                            text[i].data = null;
                        }
                    }
                }
                return text;
            default:
                return text;
        }
    }

    /**
     * Regex filter lines nastroj
     */
    function regexFilterLinesTool(text, tool) {
        text = text.split('\n');
        var option = tool.casesensitive === true ? "g" : "gi";

        if (tool.column === "") {   // Cele radky
            for (let i = 0; i < text.length; i++) {
                if (text[i].match(new RegExp(tool.expression, option)) !== null) {
                    text.splice(i, 1);
                    i--;
                }
            }
        }
        else {      // Ve sloupci
            var column = "";
            for (let i = 0; i < text.length; i++) {
                column = text[i].split(tool.delimiter);
                if (column.length < tool.column) {
                    continue;
                }
                if (column[tool.column - 1].match(new RegExp(tool.expression, option)) !== null) {
                    text.splice(i, 1);
                    i--;
                }
            }
        }
        return text.join('\n');
    }

    function regexFilterLinesInspectTool(text, tool) {
        var option = tool.casesensitive === true ? "g" : "gi";

        if (tool.column === "") {   // Cele radky
            for (let i = 0; i < text.length; i++) {
                if (text[i].data === null) {
                    continue;
                }
                if (text[i].data.match(new RegExp(tool.expression, option)) !== null) {
                    text[i].data = null;
                }
            }
        }
        else {      // Ve sloupci
            var column = "";
            for (let i = 0; i < text.length; i++) {
                if (text[i].data === null) {
                    continue;
                }
                column = text[i].data.split(tool.delimiter);
                if (column.length < tool.column) {
                    continue;
                }
                if (column[tool.column - 1].match(new RegExp(tool.expression, option)) !== null) {
                    text[i].data = null;
                }
            }
        }
        return text;
    }

    /**
     * Cut lines nastroj
     */
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

    /**
     * Insert column nastroj
     */
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
            if (parseInt(tool.position) === 1) {
                text[lineNumber] += tool.delimiter;
            }
            lineNumber++;
        }
        return text.join('\n');
    }

    function insertColumnInspectTool(text, tool) {
        const givenColumn = tool.content.split('\n');
        var givenColumnLine = 0;
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
            columns.splice(tool.position - 1, 0, givenColumn[givenColumnLine]);
            text[lineNumber].data = columns.join(tool.delimiter);
            givenColumnLine++;
            lineNumber++;
        }
        while(givenColumnLine < givenColumn.length) {
            text.push({number: lineNumber + 1, data: Array(tool.position - 1).fill("")});
            //text.push(Array(tool.position - 1).fill(""));
            text[lineNumber].data.splice(tool.position - 1, 0, givenColumn[givenColumnLine]);
            text[lineNumber].data = text[lineNumber].data.join(tool.delimiter);
            if (parseInt(tool.position) === 1) {
                text[lineNumber].data += tool.delimiter;
            }
            givenColumnLine++;
            lineNumber++;
        }
        return text;
    }

    /**
     * Swap columns nastroj
     */
    function swapColumnsTool(text, tool) {
        text = text.split('\n');
        const width = tool.first > tool.second ? tool.first : tool.second;
        var column = "";
        var temp;

        for (let i = 0; i < text.length; i++) {
            column = text[i].split(tool.delimiter);

            if (column.length < width) {
                column = column.concat(Array(width - column.length - 1).fill(""));
            }
            temp = column[tool.first - 1];
            column[tool.first - 1] = column[tool.second - 1];
            column[tool.second - 1] = temp;
            text[i] = column.join(tool.delimiter);
        }
        return text.join('\n');
    }

    function swapColumnsInspectTool(text, tool) {
        const width = tool.first > tool.second ? tool.first : tool.second;
        var column = "";
        var temp;

        for (let i = 0; i < text.length; i++) {
            if (text[i].data === null) {
                continue;
            }
            column = text[i].data.split(tool.delimiter);

            if (column.length < width) {
                column = column.concat(Array(width - column.length - 1).fill(""));
            }
            temp = column[tool.first - 1];
            column[tool.first - 1] = column[tool.second - 1];
            column[tool.second - 1] = temp;
            text[i].data = column.join(tool.delimiter);
        }
        return text;
    }

    /**
     * Convert case nastroj
     */
    function convertCaseTool(text, tool) {
        switch (tool.textCase) {
            case "uppercase":
                return text.toUpperCase();
            case "lowercase":
                return text.toLowerCase();
            default:
                return text;
        }
    }

    function convertCaseInspectTool(text, tool) {
        switch (tool.textCase) {
            case "uppercase":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    text[i].data = text[i].data.toUpperCase();
                }
                return text;
            case "lowercase":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    text[i].data = text[i].data.toLowerCase();
                }
                return text;
            default:
                return text;
        }
    }

    /**
     * Trim nastroj
     */
    function trimTool(text) {
        var lines = text.split('\n');

        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trim();
        }

        return lines.join('\n');
    }

    function trimInspectTool(text) {
        for (let i = 0; i < text.length; i++) {
            if (text[i].data === null) {
                continue;
            }
            text[i].data = text[i].data.trim();
        }
        return text;
    }

    /**
     * Remove extra spaces nastroj
     */
    function removeExtraSpacesTool(text) {
        var lines = text.split('\n');

        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/\s+/g, ' ');
        }

        return lines.join('\n');
    }

    function removeExtraSpacesInspectTool(text) {
        for (let i = 0; i < text.length; i++) {
            if (text[i].data === null) {
                continue;
            }
            text[i].data = text[i].data.replace(/\s+/g, ' ');
        }
        return text;
    }

    /**
     * Sort nastroj
     * TODO: Mozna optimalizace porovnavaci funkce
     */
    function sortTool(text, tool) {
        const compare = (a, b) => {
            if (tool.casesensitive === false) {
                a = a.toUpperCase();
                b = b.toUpperCase();
            }
            if (tool.ignoreLeadingBlanks === true) {
                a = a.trim();
                b = b.trim();
            }
            if (tool.order === "ascending") {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                return 0;
            }
            else {
                if (a > b) {
                    return -1;
                }
                if (a < b) {
                    return 1;
                }
                return 0;
            }
        }

        text = text.split('\n');
        text.sort(compare);
        return text.join('\n');
    }

    function sortInspectTool(text, tool) {
        const compareData = (a, b) => {
            if (a.data === null) {
                return 1;
            }
            if (b.data === null) {
                return -1;
            }
            if (tool.casesensitive === false) {
                a.data = a.data.toUpperCase();
                b.data = b.data.toUpperCase();
            }
            if (tool.ignoreLeadingBlanks === true) {
                a.data = a.data.trim();
                b.data = b.data.trim();
            }
            if (tool.order === "ascending") {
                if (a.data < b.data) {
                    return -1;
                }
                if (a.data > b.data) {
                    return 1;
                }
                return 0;
            }
            else {
                if (a.data > b.data) {
                    return -1;
                }
                if (a.data < b.data) {
                    return 1;
                }
                return 0;
            }
        }
        text =text.sort(compareData);
        return text;
    }

    /**
     * Reverse nastroj
     */
    function reverseTool(text, tool) {
        text = text.split('\n');

        switch (tool.direction) {
            case "horizontal":
                for (let i = 0; i < text.length; i++) {
                    text[i] = text[i].split('');
                    text[i] = text[i].reverse();
                    text[i] = text[i].join('');
                }
                return text.join('\n');
            case "vertical":
                text = text.reverse();
                return text.join('\n');
            default:
                return text.join('\n');
        }
    }

    function reverseInspectTool(text, tool) {
        switch (tool.direction) {
            case "horizontal":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    text[i].data = text[i].data.split('');
                    text[i].data = text[i].data.reverse();
                    text[i].data = text[i].data.join('');
                }
                return text;
            case "vertical":
                text = text.reverse();
                return text;
            default:
                return text;
        }
    }

    /**
     * Unique nastroj
     */
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
                if (lines.length === 1) {
                    return text[0];
                }
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
                if (lines.length === 1) {
                    return text[0];
                }
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
                        for (var lastIndex = nextLine.index; (nextLine = findNextLine(text, nextLine.index)) !== null; lastIndex = nextLine.index) {
                            if ((tool.casesensitive === true && text[i].data !== nextLine.line.data) || (tool.casesensitive === false && text[i].data.toUpperCase() !== nextLine.line.data.toUpperCase())) {
                                i = nextLine.index - 1;
                                break;
                            }
                        }
                        i = lastIndex;
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

    /**
     * Line numbers nastroj
     */
    function lineNumbersTool(text, tool) {
        text = text.split('\n');
        var lineNumber = parseInt(tool.startingNumber);

        switch (tool.variant) {
            case "all":
                for (let i = 0; i < text.length; i++) {
                    text[i] = lineNumber + tool.delimiter + text[i];
                    lineNumber++;
                }
                return text.join('\n');
            case "nonempty":
                for (let i = 0; i < text.length; i++) {
                    if (text[i] === "") {
                        continue;
                    }
                    text[i] = lineNumber + tool.delimiter + text[i];
                    lineNumber++;
                }
                return text.join('\n');
            default:
                return text.join('\n');
        }
    }

    function lineNumbersInspectTool(text, tool) {
        var lineNumber = parseInt(tool.startingNumber);

        switch (tool.variant) {
            case "all":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null) {
                        continue;
                    }
                    text[i].data = lineNumber + tool.delimiter + text[i].data;
                    lineNumber++;
                }
                return text;
            case "nonempty":
                for (let i = 0; i < text.length; i++) {
                    if (text[i].data === null || text[i].data === "") {
                        continue;
                    }
                    text[i].data = lineNumber + tool.delimiter + text[i].data;
                    lineNumber++;
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
            case "filterColumns":
                result = filterColumnsTool(text, tool);
                break;
            case "filterLines":
                result = filterLinesTool(text, tool);
                break;
            case "regexFilterLines":
                result = regexFilterLinesTool(text, tool);
                break;
            case "cutLines":
                result = cutLinesTool(text, tool);
                break;
            case "insertColumn":
                result = insertColumnTool(text, tool);
                break;
            case "swapColumns":
                result = swapColumnsTool(text, tool);
                break;
            case "convertCase":
                result = convertCaseTool(text, tool);
                break;
            case "trim":
                result = trimTool(text);
                break;
            case "removeExtraSpaces":
                result = removeExtraSpacesTool(text);
                break;
            case "sort":
                result = sortTool(text, tool);
                break;
            case "reverse":
                result = reverseTool(text, tool);
                break;
            case "unique":
                result = uniqueTool(text, tool);
                break;
            case "lineNumbers":
                result = lineNumbersTool(text, tool);
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
            case "filterColumns":
                result = filterColumnsInspectTool(text, tool);
                break;
            case "filterLines":
                result = filterLinesInspectTool(text, tool);
                break;
            case "regexFilterLines":
                result = regexFilterLinesInspectTool(text, tool);
                break;
            case "cutLines":
                result = cutLinesInspectTool(text, tool);
                break;
            case "insertColumn":
                result = insertColumnInspectTool(text, tool);
                break;
            case "swapColumns":
                result = swapColumnsInspectTool(text, tool);
                break;
            case "convertCase":
                result = convertCaseInspectTool(text, tool);
                break;
            case "trim":
                result = trimInspectTool(text);
                break;
            case "removeExtraSpaces":
                result = removeExtraSpacesInspectTool(text);
                break;
            case "sort":
                result = sortInspectTool(text, tool);
                break;
            case "reverse":
                result = reverseInspectTool(text, tool);
                break;
            case "unique":
                result = uniqueInspectTool(text, tool);
                break;
            case "lineNumbers":
                result = lineNumbersInspectTool(text, tool);
                break;
            default:
                break;
        }
        return result;
    };

    self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        //var processData = event.data.inspectMode === true ? event.data.text.split('\n') : event.data.text;
        var processData = "";

        if (event.data.inspectMode === false) {
            processData = event.data.text;
        }
        else {
            let lines = event.data.text.split('\n');
            processData = Array(lines.length);

            for (let index = 0; index < processData.length; index++) {
                processData[index] = {number: index + 1, data: lines[index]};
            }
        }

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
            let lines = [];
            let tempData = [];
            console.log(processData);

            for (var breakpoint in event.data.breakpoints) {
                lines.push(parseInt(breakpoint) + 1);
            }

            for (let index = 0; index < processData.length; index++) {
                if (lines.includes(processData[index].number) && processData[index].data !== null) {
                    tempData.push(processData[index].data);
                }
            }

            processData = tempData.join('\n');
        }
        /*if (event.data.inspectMode === true) {
            var temp = [];
            console.log(processData);
            for (var breakpoint in event.data.breakpoints) {
                if (processData[breakpoint] !== null) {
                    temp.push(processData[breakpoint]);
                }
            }
            processData = temp.join('\n');
        }*/

        postMessage({type: "result", data: processData});
    });
}
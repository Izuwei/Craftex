
function regexEscape(regex) {
    return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

function awkRegexEscape(regex) {
    return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\\\\\$&");
};

function awkDelimiter(delimiter) {
    if (delimiter === ' ') {
        return "[ ]";
    }
    else {
        return delimiter;
    }
}

function replaceCommand(tool) {
    if (tool.inColumn === "")  {    // globalne
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "sed -E 's/" + regexEscape(tool.find) + "/" + tool.replace + "/g'";
            }
            else {  // case isensitive
                return "sed -E 's/" + regexEscape(tool.find) + "/" + tool.replace + "/gI'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "sed -E '0,/" + regexEscape(tool.find) + "/s//" + tool.replace + "/'";
            }
            else {  // case isensitive
                return "sed -E '0,/" + regexEscape(tool.find) + "/Is//" + tool.replace + "/'";
            }
        }
    }
    else {  // ve sloupci
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{gsub(\"" + awkRegexEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
            else {  // case isensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}{gsub(\"" + awkRegexEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '!x{x=sub(\"" + awkRegexEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
            }
            else {  // case isensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}!x{x=sub(\"" + awkRegexEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
            }
        }
    }
}

function awkSlashEscape(regex) {
    return regex.replace(/[\\]/g, "\\$&");
}

function regexReplaceCommand(tool) {
    if (tool.inColumn === "")  {    // globalne
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "sed -E 's/" + tool.find + "/" + tool.replace + "/g'";
            }
            else {  // case isensitive
                return "sed -E 's/" + tool.find + "/" + tool.replace + "/gI'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "sed -E '0,/" + tool.find + "/s//" + tool.replace + "/'";
            }
            else {  // case isensitive
                return "sed -E '0,/" + tool.find + "/Is//" + tool.replace + "/'";
            }
        }
    }
    else {  // ve sloupci
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{gsub(\"" + awkSlashEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
            else {  // case isensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}{gsub(\"" + awkSlashEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '!x{x=sub(\"" + awkSlashEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
            }
            else {  // case isensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}!x{x=sub(\"" + awkSlashEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
            }
        }
    }
}

function matchCommand(tool) {
    if (tool.inColumn === "") {     // globalne
        if (tool.casesensitive === true) {  // case-sensitive
            if (tool.occurrence === "all") {    //
                return "grep -E '" + regexEscape(tool.expression) + "'";
            }
            else {
                return "grep -E -m 1 '" + regexEscape(tool.expression) + "'";
            }
        }
        else {
            if (tool.occurrence === "all") {
                return "grep -E -i '" + regexEscape(tool.expression) + "'";
            }
            else {
                return "grep -E -i -m 1 '" + regexEscape(tool.expression) + "'";
            }
        }
    }
    else {      // ve sloupci
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '$" + tool.inColumn + "~/" + regexEscape(tool.expression) + "/'";
            }
            else {
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1} $" + tool.inColumn + "~/" + regexEscape(tool.expression) + "/'";
            }
        }
        else {  // pouze prvni vyskyt
            if (tool.casesensitive === true) {
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '$" + tool.inColumn + "~/" + regexEscape(tool.expression) + "/ {print; exit}'";
            }
            else {
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1} $" + tool.inColumn + "~/" + regexEscape(tool.expression) + "/ {print; exit}'";
            }
        }
    }
}

function regexMatchCommand(tool) {
    if (tool.inColumn === "") {     // globalne
        if (tool.casesensitive === true) {  // case-sensitive
            if (tool.occurrence === "all") {    //
                return "grep -E '" + tool.expression + "'";
            }
            else {
                return "grep -E -m 1 '" + tool.expression + "'";
            }
        }
        else {
            if (tool.occurrence === "all") {
                return "grep -E -i '" + tool.expression + "'";
            }
            else {
                return "grep -E -i -m 1 '" + tool.expression + "'";
            }
        }
    }
    else {      // ve sloupci
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '$" + tool.inColumn + "~/" + tool.expression + "/'";
            }
            else {
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1} $" + tool.inColumn + "~/" + tool.expression + "/'";
            }
        }
        else {  // pouze prvni vyskyt
            if (tool.casesensitive === true) {
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '$" + tool.inColumn + "~/" + tool.expression + "/ {print; exit}'";
            }
            else {
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1} $" + tool.inColumn + "~/" + tool.expression + "/ {print; exit}'";
            }
        }
    }
}

function compareCommand(tool) {
    var separator = tool.inColumn === "" ? "\\n" : tool.delimiter;
    var column = tool.inColumn === "" ? "1" : tool.inColumn;
    var comparator = "";

    switch (tool.comparator) {
        case "gt":
            comparator = ">";
            break;
        case "ge":
            comparator = ">=";
            break;
        case "lt":
            comparator = "<";
            break;
        case "le":
            comparator = "<=";
            break;
        case "eq":
            comparator = "==";
            break;
        default:
            comparator = "";
    }
    return "awk -F '" + awkDelimiter(separator) + "' '$" + column + " " + comparator + " \"" + awkSlashEscape(tool.value) + "\"'";
}

function filterColumnsCommand(tool) {
    var start = "";

    switch (tool.variant) {
        case "remove":
            if (parseInt(tool.position) !== 1) {
                start = "-" + parseInt(tool.position - 1) + ",";
            }

            return "cut -d '" + tool.delimiter + "' -f " + start + (parseInt(tool.position) + 1) + "-";
        case "cut":
            return "awk -F '" + awkDelimiter(tool.delimiter) + "' '{print $" + tool.position + "}'"; 
        default:
            return "";
    }
}

function filterLinesCommand(tool) {
    switch (tool.content) {
        case "empty":
            return "sed '/^$/d'";
        case "whiteChars":
            return "awk 'NF > 0'";
        default:
            return "";
    }
}

function insertColumnCommand(tool) {
    const colBubble = (position) => {
        if (parseInt(position) === 1) {
            return "";
        }
        var res = "t=$1;";

        for (let i = 1; i < position; i++) {
            res += "$" + i + "=$" + (parseInt(i) + 1) + ";";
        }
        return " | awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{" + res + "$" + tool.position + "=t;print;}'";
    }

    return "paste -d '" + tool.delimiter + "' $COLUMN_FILE /dev/stdin" + colBubble(tool.position);
}

function swapColumnsCommand(tool) {
    return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{t=$" + tool.first + ";$" + tool.first + "=$" + tool.second + ";$" + tool.second + "=t;print;}'";
}

function convertCaseCommand(tool) {
    switch (tool.textCase) {
        case "uppercase":
            return "tr '[:lower:]' '[:upper:]'";
        case "lowercase":
            return "tr '[:upper:]' '[:lower:]'";
        default:
            return "";
    }
}

// https://unix.stackexchange.com/questions/102008/how-do-i-trim-leading-and-trailing-whitespace-from-each-line-of-some-output
function trimCommand() {
    return "sed 's/^[[:blank:]]*//;s/[[:blank:]]*$//'";
}

function removeExtraSpacesCommand() {
    return "tr -s ' '";
}

function cutLinesCommand(tool) {
    switch (tool.variant) {
        case "head":
            return "head -n " + tool.count;
        case "tail":
            return "tail -n " + tool.count;
        default:
            return "";
    }
}

function sortCommand(tool) {
    var command = "LC_ALL=C sort -s";
    
    if (tool.order === "descending") {
        command += "r";
    }
    if (tool.casesensitive === false) {
        command += "f";
    }
    if (tool.ignoreLeadingBlanks === true) {
        command += "b";
    }
    return command;
}

function reverseCommand(tool) {
    switch (tool.direction) {
        case "horizontal":
            return "rev";
        case "vertical":
            return "tac";
        default:
            return "";
    }
}

function uniqueCommand(tool) {
    var command = "uniq";

    if (tool.casesensitive === false) {
        command += " -i";
    }
    switch (tool.variant) {
        case "merge":
            if (tool.countPrefix === true) {
                return command += " -c | sed 's/^[[:blank:]]*//'";
            }
            return command;
        case "unique":
            return command + " -u";
        case "duplicate":
            return command + " -D";
        default:
            return "";
    }
}

function getToolCommand(tool) {
    var command = "";

    switch (tool.toolname) {
        case "match":
            command = matchCommand(tool);
            break;
        case "regexMatch":
            command = regexMatchCommand(tool);
            break;
        case "replace":
            command = replaceCommand(tool);
            break;
        case "regexReplace":
            command = regexReplaceCommand(tool);
            break;
        case "compare":
            command = compareCommand(tool);
            break;
        case "filterColumns":
            command = filterColumnsCommand(tool);
            break;
        case "filterLines":
            command = filterLinesCommand(tool);
            break;
        case "insertColumn":
            command = insertColumnCommand(tool);
            break;
        case "swapColumns":
            command = swapColumnsCommand(tool);
            break;
        case "convertCase":
            command = convertCaseCommand(tool);
            break;
        case "trim":
            command = trimCommand();
            break;
        case "removeExtraSpaces":
            command = removeExtraSpacesCommand();
            break;
        case "cutLines":
            command = cutLinesCommand(tool);
            break;
        case "sort":
            command = sortCommand(tool);
            break;
        case "reverse":
            command = reverseCommand(tool);
            break;
        case "unique":
            command = uniqueCommand(tool);
            break;
        default:
            return;
    }
    return " | " + command;
}

export default function (pipeline) {
    var result = "cat $FILENAME";

    for (var i = 0; i < pipeline.length; i++) {
        if (pipeline[i].active === true) {
            result += getToolCommand(pipeline[i]);
        }
    }

    return result;
}
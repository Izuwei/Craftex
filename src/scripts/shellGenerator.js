
function regexEscape(regex) {
    return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

function awkRegexEscape(regex) {
    return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\\\\\$&");
};

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
    return "awk -F '" + separator + "' '$" + column + " " + comparator + " \"" + awkSlashEscape(tool.value) + "\"'";
}

function removeColumnCommand(tool) {
    var start = "";

    if (parseInt(tool.position) !== 1) {
        start = "-" + parseInt(tool.position - 1) + ",";
    }

    return "cut -d '" + tool.delimiter + "' -f " + start + (parseInt(tool.position) + 1) + "-";
}

function removeLinesCommand(tool) {
    switch (tool.content) {
        case "empty":
            return "sed '/^$/d'";
        case "whiteSpaces":
            return "awk 'NF > 0'";
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
        case "removeColumn":
            command = removeColumnCommand(tool);
            break;
        case "removeLines":
            command = removeLinesCommand(tool);
            break;
        default:
            return;
    }
    return " | " + command;
}

export default function (pipeline) {
    var result = "cat FILENAME";

    for (var i = 0; i < pipeline.length; i++) {
        if (pipeline[i].active === true) {
            result += getToolCommand(pipeline[i]);
        }
    }

    return result;
}
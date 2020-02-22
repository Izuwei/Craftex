
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

function getToolCommand(tool) {
    var command = "";

    switch (tool.toolname) {
        case "replace":
            command = replaceCommand(tool);
            break;
        case "regexReplace":
            command = regexReplaceCommand(tool);
            break;
        default:
            return;
    }

    return " | " + command;
}

export default function(pipeline) {
    var result = "cat FILENAME";

    for (var i = 0; i < pipeline.length; i++) {
        if (pipeline[i].active === true) {
            result += getToolCommand(pipeline[i]);
        }
    }

    return result;
}
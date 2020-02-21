
function regexEscape(regex) {
    return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

function replaceCommand(tool) {
    if (tool.inColumn === "")  {    // globalne
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "sed 's/" + regexEscape(tool.find) + "/" + tool.replace + "/g'";
            }
            else {  // case isensitive
                return "sed 's/" + regexEscape(tool.find) + "/" + tool.replace + "/gI'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "sed '0,/" + regexEscape(tool.find) + "/s//" + tool.replace + "/'";
            }
            else {  // case isensitive
                return "sed '0,/" + regexEscape(tool.find) + "/Is//" + tool.replace + "/'";
            }
        }
    }
    else {  // ve sloupci
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{gsub(\"" + regexEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
            else {  // case isensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}{gsub(\"" + regexEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '!x{x=sub(\"" + regexEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
            }
            else {  // case isensitive
                return "awk -F '" + tool.delimiter + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}!x{x=sub(\"" + regexEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
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
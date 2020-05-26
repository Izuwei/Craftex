/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

/**
 * Funkce escapuje specialni znaky v regularnim vyrazu.
 * 
 * Prevzato z: https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
 * Autor: Mathias Bynens
 * Datum zverejneni: 16.2.2012
 * 
 * @param regex string s regularnim vyrazem
 * @returns string s escapovanym regularnim vyrazem
 */
function regexEscape(regex) {
    return regex.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

/**
 * Funkce ecapuje ve stringu zpetna lomitka.
 * @param regex vstupni retezec
 * @returns retezec s escapovanymi zpetnymi lomitky
 */
function awkRegexEscape(regex) {
    regex = regexEscape(regex);
    return regex.replace(/\\/g, "\\$&");
};

/**
 * Funkce ecapuje ve stringu dopredna lomitka.
 * @param regex vstupni retezec
 * @returns retezec s escapovanymi doprednymi lomitky
 */
function escapeForwardSlash(pattern) {
    return pattern.replace(/\//g, "\\$&");
}

/**
 * Funkce obali vstupni retezec do hranatych zavorek v pripade ze se jedna o mezeru.
 * @param vstupni retezec
 * @returns v pripade mezery obali string do hranatych zavorek, jinak vraci puvodni retezec.
 */
function awkDelimiter(delimiter) {
    if (delimiter === ' ') {
        return "[ ]";
    }
    else {
        return delimiter;
    }
}

/**
 * Funkce vytvori shell command pro nastroj replace.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
function replaceCommand(tool) {
    if (tool.inColumn === "")  {    // globalne
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "sed -E 's/" + escapeForwardSlash(regexEscape(tool.find)) + "/" + escapeForwardSlash(regexEscape(tool.replace)) + "/g'";
            }
            else {  // case isensitive
                return "sed -E 's/" + escapeForwardSlash(regexEscape(tool.find)) + "/" + escapeForwardSlash(regexEscape(tool.replace)) + "/gI'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "sed -E '0,/" + escapeForwardSlash(regexEscape(tool.find)) + "/s//" + escapeForwardSlash(regexEscape(tool.replace)) + "/'";
            }
            else {  // case isensitive
                return "sed -E '0,/" + escapeForwardSlash(regexEscape(tool.find)) + "/Is//" + escapeForwardSlash(regexEscape(tool.replace)) + "/'";
            }
        }
    }
    else {  // ve sloupci
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{gsub(\"" + awkRegexEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
            else {  // case isensitive
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}{gsub(\"" + awkRegexEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '!x{x=sub(\"" + awkRegexEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
            }
            else {  // case isensitive
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}!x{x=sub(\"" + awkRegexEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
            }
        }
    }
}

function awkSlashEscape(regex) {
    return regex.replace(/[\\]/g, "\\$&");
}

/**
 * Funkce vytvori shell command pro nastroj regex replace.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
function regexReplaceCommand(tool) {
    if (tool.inColumn === "")  {    // globalne
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "sed -E 's/" + escapeForwardSlash(tool.find) + "/" + escapeForwardSlash(regexEscape(tool.replace)) + "/g'";
            }
            else {  // case isensitive
                return "sed -E 's/" + escapeForwardSlash(tool.find) + "/" + escapeForwardSlash(regexEscape(tool.replace)) + "/gI'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "sed -E '0,/" + escapeForwardSlash(tool.find) + "/s//" + escapeForwardSlash(regexEscape(tool.replace)) + "/'";
            }
            else {  // case isensitive
                return "sed -E '0,/" + escapeForwardSlash(tool.find) + "/Is//" + escapeForwardSlash(regexEscape(tool.replace)) + "/'";
            }
        }
    }
    else {  // ve sloupci
        if (tool.occurrence === "all") {    // vsechny vyskyty
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{gsub(\"" + awkSlashEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
            else {  // case isensitive
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}{gsub(\"" + awkSlashEscape(tool.find) + "\", \"" + tool.replace + "\", $" + tool.inColumn + "); print }'";
            }
        }
        else {  // prvni vyskyt
            if (tool.casesensitive === true) {  // case sensitive
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '!x{x=sub(\"" + awkSlashEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
            }
            else {  // case isensitive
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1}!x{x=sub(\"" + awkSlashEscape(tool.find) + "\",\"" + tool.replace + "\", $" + tool.inColumn + ")}1'";
            }
        }
    }
}

/**
 * Funkce vytvori shell command pro nastroj match.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
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
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '$" + tool.inColumn + "~/" + regexEscape(tool.expression) + "/'";
            }
            else {
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1} $" + tool.inColumn + "~/" + regexEscape(tool.expression) + "/'";
            }
        }
        else {  // pouze prvni vyskyt
            if (tool.casesensitive === true) {
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '$" + tool.inColumn + "~/" + regexEscape(tool.expression) + "/ {print; exit}'";
            }
            else {
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1} $" + tool.inColumn + "~/" + regexEscape(tool.expression) + "/ {print; exit}'";
            }
        }
    }
}

/**
 * Funkce vytvori shell command pro nastroj regex match.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
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
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '$" + tool.inColumn + "~/" + tool.expression + "/'";
            }
            else {
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1} $" + tool.inColumn + "~/" + tool.expression + "/'";
            }
        }
        else {  // pouze prvni vyskyt
            if (tool.casesensitive === true) {
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '$" + tool.inColumn + "~/" + tool.expression + "/ {print; exit}'";
            }
            else {
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{IGNORECASE=1} $" + tool.inColumn + "~/" + tool.expression + "/ {print; exit}'";
            }
        }
    }
}

/**
 * Funkce vytvori shell command pro nastroj compare.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
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

/**
 * Funkce vytvori shell command pro nastroj filter columns.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
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

/**
 * Funkce vytvori shell command pro nastroj filter lines.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
function filterLinesCommand(tool) {
    switch (tool.content) {
        case "empty":
            return "sed '/^$/d'";
        case "whiteChars":
            return "awk 'NF > 0'";
        case "custom":
            if (tool.column === "") {
                let ignoreCase = tool.casesensitive === false ? "I" : "";
                return "sed -E '/" + escapeForwardSlash(regexEscape(tool.customContent)) + "/" + ignoreCase + "d'";
            }
            else {
                let ignoreCase = tool.casesensitive === false ? "{IGNORECASE=1}" : "";
                return "awk -F '" + awkDelimiter(tool.delimiter) + "' '" + ignoreCase + "$" + tool.column + " !~ \"" + regexEscape(tool.customContent) + "\" {print}'";
            }
        default:
            return "";
    }
}

/**
 * Funkce vytvori shell command pro nastroj regex filter lines.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
function regexFilterLinesCommand(tool) {
    if (tool.column === "") {
        var ignoreCase = tool.casesensitive === false ? "I" : "";
        return "sed -E '/" + escapeForwardSlash(tool.expression) + "/" + ignoreCase + "d'";
    }
    else {
        let ignoreCase = tool.casesensitive === false ? "{IGNORECASE=1}" : "";
        return "awk -F '" + awkDelimiter(tool.delimiter) + "' '" + ignoreCase + "$" + tool.column + " !~ /" + tool.expression + "/'";
    }
}

/**
 * Funkce vytvori shell command pro nastroj insert column.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
function insertColumnCommand(tool) {
    const colBubble = (position) => {
        if (parseInt(position) === 1) {
            return "";
        }
        var res = "t=$1;";

        for (let i = 1; i < position; i++) {
            res += "$" + i + "=$" + (parseInt(i) + 1) + ";";
        }
        return " | awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{" + res + "$" + tool.position + "=t;print;}'";
    }

    return "pr -mts'" + tool.delimiter + "' $COLUMN_FILE /dev/stdin" + colBubble(tool.position);
}

/**
 * Funkce vytvori shell command pro nastroj swap columns.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
function swapColumnsCommand(tool) {
    return "awk -F '" + awkDelimiter(tool.delimiter) + "' -v OFS='" + tool.delimiter + "' '{t=$" + tool.first + ";$" + tool.first + "=$" + tool.second + ";$" + tool.second + "=t;print;}'";
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

/**
 * Funkce vytvori shell command pro nastroj trim.
 * 
 * Prevzato z: https://unix.stackexchange.com/questions/102008/how-do-i-trim-leading-and-trailing-whitespace-from-each-line-of-some-output
 * Autor: slm
 * Editovano od: cuonglm
 * Datum zverejneni: 21.11.2013
 * 
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
function trimCommand() {
    return "sed 's/^[[:blank:]]*//;s/[[:blank:]]*$//'";
}

/**
 * Funkce vytvori shell command pro nastroj remove extra spaces.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
function removeExtraSpacesCommand() {
    return "tr -s ' '";
}

/**
 * Funkce vytvori shell command pro nastroj cut lines.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
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

/**
 * Funkce vytvori shell command pro nastroj sort.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
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

/**
 * Funkce vytvori shell command pro nastroj reverse.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
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

/**
 * Funkce vytvori shell command pro nastroj unique.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
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

/**
 * Funkce vytvori shell command pro nastroj line numbers.
 * @param tool konfigurace nastroje
 * @returns string s prikazem
 */
function lineNumbersCommand(tool) {
    var command = "nl -s '" + tool.delimiter + "' -v " + tool.startingNumber;

    switch (tool.variant) {
        case "all":
            return command + " -b a | sed 's/^[[:blank:]]*//'";
        case "nonempty":
            return command + " -b t | sed 's/^[[:blank:]]*//'";
        default:
            return "";
    }
}

/**
 * Funcke slouzi jako rozbocovac pro zadany nastroj. Podle nazvu nastroje vrati jeho odpovidajici prikaz.
 * @param tool zadany nastroj
 * @returns string s shell prikazem
 */
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
        case "regexFilterLines":
            command = regexFilterLinesCommand(tool);
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
        case "lineNumbers":
            command = lineNumbersCommand(tool);
            break;
        default:
            return;
    }
    return " | " + command;
}

/**
 * Funkce generuje shell skript realizujici transformaci podle aktivnich nastroju v pipeline.
 * @param pipeline seznam nastroju
 * @returns retezec ekvivalentniho shell skriptu
 */
export default function (pipeline) {
    var result = "cat $FILENAME";

    for (var i = 0; i < pipeline.length; i++) {
        if (pipeline[i].active === true) {
            result += getToolCommand(pipeline[i]);
        }
    }

    return result;
}
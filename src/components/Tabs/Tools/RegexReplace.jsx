/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState } from 'react';
import { Button, makeStyles, InputLabel, MenuItem, FormControl, Select, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "5px",
    },
    button: {
        margin: "8px 0px 8px 8px",
    },
    textField: {
        flex: 1,
        marginRight: "5px",
    },
    flexCenter: {
        marginTop: "8px",
        display: "flex",
        alignItems: "center",
    },
    flexStart: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    opts: {
        width: "100px",
        marginRight: "10px",
    },
}));

function RegexReplaceTool(props) {
    const classes = useStyles();

    const [regexReplaceFind, setRegexReplaceFind] = useState("");
    const [regexReplaceReplace, setRegexReplaceReplace] = useState("");
    const [regexReplaceCaseSensitive, setRegexReplaceCaseSensitive] = useState(false);
    const [occurrence, setOccurrence] = useState("all");
    const [regexReplaceInColumn, setRegexReplaceInColumn] = useState("");
    const [regexReplaceColumnDelimiter, setRegexReplaceColumnDelimiter] = useState("");

    const [regexReplaceFindError, setRegexReplaceFindError] = useState(false);
    const [regexReplaceColumnError, setRegexReplaceColumnError] = useState(false);
    const [regexReplaceDelimiterError, setRegexReplaceDelimiterError] = useState(false);

    const handleRegexReplace = () => {
        var validExpression = true;

        try {
            new RegExp(regexReplaceFind);
        } 
        catch (e) {
            setRegexReplaceFindError(true);
            validExpression = false;
        }

        if (regexReplaceFind === ""){
            setRegexReplaceFindError(true);
        }

        if (regexReplaceInColumn !== "" && regexReplaceColumnDelimiter === "") {
            setRegexReplaceDelimiterError(true);
        }

        if (regexReplaceInColumn !== "" && regexReplaceInColumn <= 0) {
            setRegexReplaceColumnError(true);
        }

        if (validExpression === true && regexReplaceFind !== "" && (regexReplaceInColumn === "" || (regexReplaceInColumn > 0 && regexReplaceColumnDelimiter !== ""))) {
            props.addTool({toolname: "regexReplace", find: regexReplaceFind, replace: regexReplaceReplace, occurrence: occurrence, casesensitive: regexReplaceCaseSensitive, inColumn: regexReplaceInColumn, delimiter: regexReplaceColumnDelimiter});
            props.showAlert("success", "Success: Regex replace added into the pipeline.");
            setRegexReplaceFind("");
            setRegexReplaceReplace("");
            setRegexReplaceInColumn("");
            setRegexReplaceColumnDelimiter("");
            setRegexReplaceDelimiterError(false);
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding regex replace into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="regex-replace-occurence-label">Occurrence</InputLabel>
                    <Select
                      labelId="regex-replace-occurence-label"
                      id="regex-replace-occurrence"
                      className={classes.opts}
                      value={occurrence}
                      onChange={(event) => setOccurrence(event.target.value)}
                    >
                        <MenuItem value={"first"}>First</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="regex-replace-case-label">Case</InputLabel>
                    <Select
                      labelId="regex-replace-case-label"
                      id="regex-replace-case"
                      className={classes.opts}
                      value={regexReplaceCaseSensitive}
                      onChange={(event) => setRegexReplaceCaseSensitive(event.target.value)}
                    >
                        <MenuItem value={true}>Sensitive</MenuItem>
                        <MenuItem value={false}>Isensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="regex-replace-in-column"
                    label="Column"
                    placeholder="All"
                    value={regexReplaceInColumn}
                    onChange={event => `${setRegexReplaceInColumn(event.target.value)} ${setRegexReplaceColumnError(false)}`}
                    type="number"
                    className={classes.opts}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={regexReplaceColumnError === true}
                    helperText={regexReplaceColumnError === true ? "Number must be greater than zero!" : ""}
                />
                <TextField
                    id="regex-replace-column-delimiter"
                    label="Delimiter"
                    value={regexReplaceColumnDelimiter}
                    onChange={event => `${setRegexReplaceColumnDelimiter(event.target.value)} ${setRegexReplaceDelimiterError(false)}`}
                    className={classes.opts}
                    required={regexReplaceInColumn === "" ? false : true}
                    error={regexReplaceDelimiterError === true}
                    helperText={regexReplaceDelimiterError === true ? "Field cannot be empty!" : ""}
                />
            </div>
            <div className={classes.flexCenter}>
                <TextField
                    id="regex-replace-find"
                    label="Regular expression"
                    value={regexReplaceFind}
                    required={true}
                    onChange={event => `${setRegexReplaceFind(event.target.value)} ${setRegexReplaceFindError(false)}`}
                    className={classes.textField}
                    error={regexReplaceFindError === true}
                    helperText={regexReplaceFindError === true ? "Invalid or empty regular expression!" : ""}
                />
                <TextField
                    id="regex-replace-replace"
                    label="Replace"
                    value={regexReplaceReplace}
                    onChange={event => setRegexReplaceReplace(event.target.value)}
                    className={classes.textField}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    id="add-regex-replace"
                    className={classes.button}
                    onClick={() => handleRegexReplace()}
                    startIcon={<Add />}
                >Add</Button>
            </div>
        </div>
    );
};

export default RegexReplaceTool;
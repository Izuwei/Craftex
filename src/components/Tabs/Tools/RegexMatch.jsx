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
        width: "120px",
        marginRight: "10px",
    },
}));

function RegexMatchTool(props) {
    const classes = useStyles();

    const [regexMatchFind, setRegexMatchFind] = useState("");
    const [regexMatchCaseSensitive, setRegexMatchCaseSensitive] = useState(false);
    const [occurrence, setOccurrence] = useState("all");
    const [regexMatchInColumn, setRegexMatchInColumn] = useState("");
    const [regexMatchColumnDelimiter, setRegexMatchColumnDelimiter] = useState("");

    const [regexMatchFindError, setRegexMatchFindError] = useState(false);
    const [regexMatchColumnError, setRegexMatchColumnError] = useState(false);
    const [regexMatchDelimiterError, setRegexMatchDelimiterError] = useState(false);

    const handleRegexMatch = () => {
        var validExpression = true;

        try {
            new RegExp(regexMatchFind);
        } 
        catch (e) {
            setRegexMatchFindError(true);
            validExpression = false;
        }

        if (regexMatchFind === ""){
            setRegexMatchFindError(true);
        }

        if (regexMatchInColumn !== "" && regexMatchColumnDelimiter === "") {
            setRegexMatchDelimiterError(true);
        }

        if (regexMatchInColumn !== "" && regexMatchInColumn <= 0) {
            setRegexMatchColumnError(true);
        }

        if (validExpression === true && regexMatchFind !== "" && (regexMatchInColumn === "" || (regexMatchInColumn > 0 && regexMatchColumnDelimiter !== ""))) {
            props.addTool({toolname: "regexMatch", expression: regexMatchFind, occurrence: occurrence, casesensitive: regexMatchCaseSensitive, inColumn: regexMatchInColumn, delimiter: regexMatchColumnDelimiter});
            props.showAlert("success", "Success: Regex match added into the pipeline.");
            setRegexMatchFind("");
            setRegexMatchInColumn("");
            setRegexMatchColumnDelimiter("");
            setRegexMatchDelimiterError(false);
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding regex match into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="regex-match-occurence-label">Occurrence</InputLabel>
                    <Select
                      labelId="regex-match-occurence-label"
                      id="regex-match-occurrence"
                      className={classes.opts}
                      value={occurrence}
                      onChange={(event) => setOccurrence(event.target.value)}
                    >
                        <MenuItem id="regex-match-occurence-first" value={"first"}>First</MenuItem>
                        <MenuItem id="regex-match-occurence-all" value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="regex-match-case-label">Case</InputLabel>
                    <Select
                      labelId="regex-match-case-label"
                      id="regex-match-case"
                      className={classes.opts}
                      value={regexMatchCaseSensitive}
                      onChange={(event) => setRegexMatchCaseSensitive(event.target.value)}
                    >
                        <MenuItem id="regex-match-case-sensitive" value={true}>Sensitive</MenuItem>
                        <MenuItem id="regex-match-case-isensitive" value={false}>Insensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="regex-match-in-column"
                    label="Column"
                    placeholder="All"
                    value={regexMatchInColumn}
                    onChange={event => `${setRegexMatchInColumn(event.target.value)} ${setRegexMatchColumnError(false)}`}
                    type="number"
                    className={classes.opts}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={regexMatchColumnError === true}
                    helperText={regexMatchColumnError === true ? "Number must be greater than zero!" : ""}
                />
                <TextField
                    id="regex-match-column-delimiter"
                    label="Delimiter"
                    value={regexMatchColumnDelimiter}
                    onChange={event => `${setRegexMatchColumnDelimiter(event.target.value)} ${setRegexMatchDelimiterError(false)}`}
                    className={classes.opts}
                    required={regexMatchInColumn === "" ? false : true}
                    error={regexMatchDelimiterError === true}
                    helperText={regexMatchDelimiterError === true ? "This field is required!" : ""}
                />
            </div>
            <div className={classes.flexCenter}>
                <TextField
                    id="regex-match-expression"
                    label="Regular expression"
                    value={regexMatchFind}
                    required={true}
                    onChange={event => `${setRegexMatchFind(event.target.value)} ${setRegexMatchFindError(false)}`}
                    className={classes.textField}
                    error={regexMatchFindError === true}
                    helperText={regexMatchFindError === true ? "Invalid or empty regular expression!" : ""}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    id="add-regex-match"
                    className={classes.button}
                    onClick={() => handleRegexMatch()}
                    startIcon={<Add />}
                >Add</Button>
            </div>
        </div>
    );
};

export default RegexMatchTool;
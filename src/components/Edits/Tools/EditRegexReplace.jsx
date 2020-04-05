/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, InputLabel, MenuItem, FormControl, Select, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
    textField: {
        margin: "5px 0px",
    },
}));

const EditRegexReplace = forwardRef((props, ref) => {
    const classes = useStyles();

    const [regexReplaceFind, setRegexReplaceFind] = useState(props.tool.find);
    const [regexReplaceReplace, setRegexReplaceReplace] = useState(props.tool.replace);
    const [regexReplaceCaseSensitive, setRegexReplaceCaseSensitive] = useState(props.tool.casesensitive);
    const [occurrence, setOccurrence] = useState(props.tool.occurrence);
    const [regexReplaceInColumn, setRegexReplaceInColumn] = useState(props.tool.inColumn);
    const [regexReplaceColumnDelimiter, setRegexReplaceColumnDelimiter] = useState(props.tool.delimiter);

    const [regexReplaceFindError, setRegexReplaceFindError] = useState(false);
    const [regexReplaceColumnError, setRegexReplaceColumnError] = useState(false);
    const [regexReplaceDelimiterError, setRegexReplaceDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
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
                props.updateTool({...props.tool, find: regexReplaceFind, replace: regexReplaceReplace, occurrence: occurrence, casesensitive: regexReplaceCaseSensitive, inColumn: regexReplaceInColumn, delimiter: regexReplaceColumnDelimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="edit-regex-replace-occurence-label">Occurrence</InputLabel>
                    <Select
                      labelId="edit-regex-replace-occurence-label"
                      id="edit-regex-replace-occurrence"
                      className={classes.opts}
                      value={occurrence}
                      onChange={(event) => setOccurrence(event.target.value)}
                    >
                        <MenuItem value={"first"}>First</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="edit-regex-replace-case-label">Case</InputLabel>
                    <Select
                      labelId="edit-regex-replace-case-label"
                      id="edit-regex-replace-case"
                      className={classes.opts}
                      value={regexReplaceCaseSensitive}
                      onChange={(event) => setRegexReplaceCaseSensitive(event.target.value)}
                    >
                        <MenuItem value={true}>Sensitive</MenuItem>
                        <MenuItem value={false}>Isensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="edit-regex-replace-in-column"
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
                    helperText={regexReplaceColumnError === true ? "Number must be greater than zero." : ""}
                />
                <TextField
                    id="edit-regex-replace-column-delimiter"
                    label="Delimiter"
                    value={regexReplaceColumnDelimiter}
                    onChange={event => `${setRegexReplaceColumnDelimiter(event.target.value)} ${setRegexReplaceDelimiterError(false)}`}
                    className={classes.opts}
                    required={regexReplaceInColumn === "" ? false : true}
                    error={regexReplaceDelimiterError === true}
                    helperText={regexReplaceDelimiterError === true ? "Required and must be different than find expression." : ""}
                />
            </div>
            <TextField
                id="edit-regex-replace-find"
                label="Find"
                className={classes.textField}
                value={regexReplaceFind}
                required={true}
                onChange={event => `${setRegexReplaceFind(event.target.value)} ${setRegexReplaceFindError(false)}`}
                error={regexReplaceFindError === true}
                helperText={regexReplaceFindError === true ? "Invalid or empty regular expression!" : ""}
                fullWidth
            />
            <TextField
                id="edit-regex-replace-replace"
                label="Replace"
                className={classes.textField}
                value={regexReplaceReplace}
                onChange={event => setRegexReplaceReplace(event.target.value)}
                fullWidth
            />
        </React.Fragment>
    );
});

export default EditRegexReplace;
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
        width: "120px",
        marginRight: "10px",
    },
    textField: {
        margin: "5px 0px",
    },
}));

const EditRegexMatch = forwardRef((props, ref) => {
    const classes = useStyles();

    const [regexMatchFind, setRegexMatchFind] = useState(props.tool.expression);
    const [regexMatchCaseSensitive, setRegexMatchCaseSensitive] = useState(props.tool.casesensitive);
    const [occurrence, setOccurrence] = useState(props.tool.occurrence);
    const [regexMatchInColumn, setRegexMatchInColumn] = useState(props.tool.inColumn);
    const [regexMatchColumnDelimiter, setRegexMatchColumnDelimiter] = useState(props.tool.delimiter);

    const [regexMatchFindError, setRegexMatchFindError] = useState(false);
    const [regexMatchColumnError, setRegexMatchColumnError] = useState(false);
    const [regexMatchDelimiterError, setRegexMatchDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
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
                props.updateTool({...props.tool, expression: regexMatchFind, occurrence: occurrence, casesensitive: regexMatchCaseSensitive, inColumn: regexMatchInColumn, delimiter: regexMatchColumnDelimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="edit-regex-match-occurence-label">Occurrence</InputLabel>
                    <Select
                      labelId="edit-regex-match-occurence-label"
                      id="edit-regex-match-occurrence"
                      className={classes.opts}
                      value={occurrence}
                      onChange={(event) => setOccurrence(event.target.value)}
                    >
                        <MenuItem id="edit-regex-match-occurence-first" value={"first"}>First</MenuItem>
                        <MenuItem id="edit-regex-match-occurence-all" value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="edit-regex-match-case-label">Case</InputLabel>
                    <Select
                      labelId="edit-regex-match-case-label"
                      id="edit-regex-match-case"
                      className={classes.opts}
                      value={regexMatchCaseSensitive}
                      onChange={(event) => setRegexMatchCaseSensitive(event.target.value)}
                    >
                        <MenuItem id="edit-regex-match-case-sensitive" value={true}>Sensitive</MenuItem>
                        <MenuItem id="edit-regex-match-case-isensitive" value={false}>Insensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="edit-regex-match-in-column"
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
                    id="edit-regex-match-column-delimiter"
                    label="Delimiter"
                    value={regexMatchColumnDelimiter}
                    onChange={event => `${setRegexMatchColumnDelimiter(event.target.value)} ${setRegexMatchDelimiterError(false)}`}
                    className={classes.opts}
                    required={regexMatchInColumn === "" ? false : true}
                    error={regexMatchDelimiterError === true}
                    helperText={regexMatchDelimiterError === true ? "This field is required!" : ""}
                />
            </div>
            <TextField
                id="edit-regex-match-find"
                label="Regular expression"
                className={classes.textField}
                value={regexMatchFind}
                required={true}
                onChange={event => `${setRegexMatchFind(event.target.value)} ${setRegexMatchFindError(false)}`}
                error={regexMatchFindError === true}
                helperText={regexMatchFindError === true ? "Field cannot be empty!" : ""}
                fullWidth
            />
        </React.Fragment>
    );
});

export default EditRegexMatch;
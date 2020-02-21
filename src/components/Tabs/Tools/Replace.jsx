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

function ReplaceTool(props) {
    const classes = useStyles();

    const [replaceFind, setReplaceFind] = useState("");
    const [replaceReplace, setReplaceReplace] = useState("");
    const [replaceCaseSensitive, setReplaceCaseSensitive] = useState(false);
    const [occurrence, setOccurrence] = useState("all");
    const [replaceInColumn, setReplaceInColumn] = useState("");
    const [replaceColumnDelimiter, setReplaceColumnDelimiter] = useState("");

    const [replaceFindError, setReplaceFindError] = useState(false);
    const [replaceReplaceError, setReplaceReplaceError] = useState(false);
    const [replaceColumnError, setReplaceColumnError] = useState(false);
    const [replaceDelimiterError, setReplaceDelimiterError] = useState(false);

    const handleReplace = () => {
        if (replaceFind === ""){
            setReplaceFindError(true);
        }

        if (replaceFind === replaceReplace && replaceFind !== "") {
            setReplaceReplaceError(true);
        }

        if ((replaceInColumn !== "" && replaceColumnDelimiter === "") || (replaceColumnDelimiter === replaceFind && replaceFind !== "")) {
            setReplaceDelimiterError(true);
        }

        if (replaceInColumn !== "" && replaceInColumn <= 0) {
            setReplaceColumnError(true);
        }

        if (replaceFind !== "" && replaceFind !== replaceReplace && (replaceInColumn === "" || (replaceInColumn > 0 && replaceColumnDelimiter !== "" && replaceColumnDelimiter !== replaceFind))) {
            setReplaceFindError(false);
            props.addTool({toolname: "replace", find: replaceFind, replace: replaceReplace, occurrence: occurrence, casesensitive: replaceCaseSensitive, inColumn: replaceInColumn, delimiter: replaceColumnDelimiter});
            props.showAlert("success", "Success: Replace added into the pipeline.");
            setReplaceFind("");
            setReplaceReplace("");
            setReplaceInColumn("");
            setReplaceColumnDelimiter("");
            setReplaceDelimiterError(false);
        }
        else {
            props.showAlert("error", "Error: Error occurred while adding replace into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="replace-occurence-label">Occurrence</InputLabel>
                    <Select
                      labelId="replace-occurence-label"
                      id="replace-occurrence"
                      className={classes.opts}
                      value={occurrence}
                      onChange={(event) => setOccurrence(event.target.value)}
                    >
                        <MenuItem value={"first"}>First</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="replace-case-label">Case</InputLabel>
                    <Select
                      labelId="replace-case-label"
                      id="replace-case"
                      className={classes.opts}
                      value={replaceCaseSensitive}
                      onChange={(event) => setReplaceCaseSensitive(event.target.value)}
                    >
                        <MenuItem value={true}>Sensitive</MenuItem>
                        <MenuItem value={false}>Isensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="replace-in-column"
                    label="Column"
                    placeholder="All"
                    value={replaceInColumn}
                    onChange={event => `${setReplaceInColumn(event.target.value)} ${setReplaceColumnError(false)}`}
                    type="number"
                    className={classes.opts}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={replaceColumnError === true}
                    helperText={replaceColumnError === true ? "Number must be greater than zero." : ""}
                />
                <TextField
                    id="replace-column-delimiter"
                    label="Delimiter"
                    value={replaceColumnDelimiter}
                    onChange={event => `${setReplaceColumnDelimiter(event.target.value)} ${setReplaceDelimiterError(false)}`}
                    className={classes.opts}
                    required={replaceInColumn === "" ? false : true}
                    error={replaceDelimiterError === true}
                    helperText={replaceDelimiterError === true ? "Required and must be different than find expression." : ""}
                />
            </div>
            <div className={classes.flexCenter}>
                <TextField
                    id="replace-find"
                    label="Find"
                    value={replaceFind}
                    required={true}
                    onChange={event => `${setReplaceFind(event.target.value)} ${setReplaceFindError(false)}`}
                    className={classes.textField}
                    error={replaceFindError === true}
                    helperText={replaceFindError === true ? "Field cannot be empty!" : ""}
                />
                <TextField
                    id="replace-replace"
                    label="Replace"
                    value={replaceReplace}
                    onChange={event => `${setReplaceReplace(event.target.value)} ${setReplaceReplaceError(false)}`}
                    className={classes.textField}
                    error={replaceReplaceError === true}
                    helperText={replaceReplaceError === true ? "Expression cannot be the same as find expression!" : ""}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    id="add-replace"
                    className={classes.button}
                    onClick={() => handleReplace()}
                    startIcon={<Add />}
                >Add</Button>
            </div>
        </div>
    );
};

export default ReplaceTool;
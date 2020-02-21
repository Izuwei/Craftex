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

const EditReplace = forwardRef((props, ref) => {    // TODO: dodelat callbacky
    const classes = useStyles();

    const [replaceFind, setReplaceFind] = useState(props.tool.find);
    const [replaceReplace, setReplaceReplace] = useState(props.tool.replace);
    const [replaceCaseSensitive, setReplaceCaseSensitive] = useState(props.tool.casesensitive);
    const [occurrence, setOccurrence] = useState(props.tool.occurrence);
    const [replaceInColumn, setReplaceInColumn] = useState(props.tool.inColumn);
    const [replaceColumnDelimiter, setReplaceColumnDelimiter] = useState(props.tool.delimiter);

    const [replaceFindError, setReplaceFindError] = useState(false);
    const [replaceReplaceError, setReplaceReplaceError] = useState(false);
    const [replaceColumnError, setReplaceColumnError] = useState(false);
    const [replaceDelimiterError, setReplaceDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
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
                props.updateTool({...props.tool, find: replaceFind, replace: replaceReplace, occurrence: occurrence, casesensitive: replaceCaseSensitive, inColumn: replaceInColumn, delimiter: replaceColumnDelimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="edit-replace-occurence-label">Occurrence</InputLabel>
                    <Select
                      labelId="edit-replace-occurence-label"
                      id="edit-replace-occurrence"
                      className={classes.opts}
                      value={occurrence}
                      onChange={(event) => setOccurrence(event.target.value)}
                    >
                        <MenuItem value={"first"}>First</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="edit-replace-case-label">Case</InputLabel>
                    <Select
                      labelId="edit-replace-case-label"
                      id="edit-replace-case"
                      className={classes.opts}
                      value={replaceCaseSensitive}
                      onChange={(event) => setReplaceCaseSensitive(event.target.value)}
                    >
                        <MenuItem value={true}>Sensitive</MenuItem>
                        <MenuItem value={false}>Isensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="edit-replace-in-column"
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
                    id="edit-replace-column-delimiter"
                    label="Delimiter"
                    value={replaceColumnDelimiter}
                    onChange={event => `${setReplaceColumnDelimiter(event.target.value)} ${setReplaceDelimiterError(false)}`}
                    className={classes.opts}
                    required={replaceInColumn === "" ? false : true}
                    error={replaceDelimiterError === true}
                    helperText={replaceDelimiterError === true ? "Required and must be different than find expression." : ""}
                />
            </div>
            <TextField
                id="edit-replace-find"
                label="Find"
                className={classes.textField}
                value={replaceFind}
                required={true}
                onChange={event => `${setReplaceFind(event.target.value)} ${setReplaceFindError(false)}`}
                error={replaceFindError === true}
                helperText={replaceFindError === true ? "Field cannot be empty!" : ""}
                fullWidth
            />
            <TextField
                id="edit-replace-replace"
                label="Replace"
                className={classes.textField}
                value={replaceReplace}
                onChange={event => `${setReplaceReplace(event.target.value)} ${setReplaceReplaceError(false)}`}
                error={replaceReplaceError === true}
                helperText={replaceReplaceError === true ? "Expression cannot be the same as find expression!" : ""}
                fullWidth
            />
        </React.Fragment>
    );
});

export default EditReplace;
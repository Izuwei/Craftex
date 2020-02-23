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

const EditMatch = forwardRef((props, ref) => {    // TODO: dodelat callbacky
    const classes = useStyles();

    const [matchFind, setMatchFind] = useState(props.tool.expression);
    const [matchCaseSensitive, setMatchCaseSensitive] = useState(props.tool.casesensitive);
    const [occurrence, setOccurrence] = useState(props.tool.occurrence);
    const [matchInColumn, setMatchInColumn] = useState(props.tool.inColumn);
    const [matchColumnDelimiter, setMatchColumnDelimiter] = useState(props.tool.delimiter);

    const [matchFindError, setMatchFindError] = useState(false);
    const [matchColumnError, setMatchColumnError] = useState(false);
    const [matchDelimiterError, setMatchDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            if (matchFind === ""){
                setMatchFindError(true);
            }
    
            if ((matchInColumn !== "" && matchColumnDelimiter === "") || (matchColumnDelimiter === matchFind && matchFind !== "")) {
                console.log('IM IN');
                setMatchDelimiterError(true);
            }
    
            if (matchInColumn !== "" && matchInColumn <= 0) {
                setMatchColumnError(true);
            }
            
            if (matchFind !== "" && (matchInColumn === "" || (matchInColumn > 0 && matchColumnDelimiter !== "" && matchColumnDelimiter !== matchFind))) {
                props.updateTool({...props.tool, expression: matchFind, occurrence: occurrence, casesensitive: matchCaseSensitive, inColumn: matchInColumn, delimiter: matchColumnDelimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="edit-match-occurence-label">Occurrence</InputLabel>
                    <Select
                      labelId="edit-match-occurence-label"
                      id="edit-match-occurrence"
                      className={classes.opts}
                      value={occurrence}
                      onChange={(event) => setOccurrence(event.target.value)}
                    >
                        <MenuItem value={"first"}>First</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="edit-match-case-label">Case</InputLabel>
                    <Select
                      labelId="edit-match-case-label"
                      id="edit-match-case"
                      className={classes.opts}
                      value={matchCaseSensitive}
                      onChange={(event) => setMatchCaseSensitive(event.target.value)}
                    >
                        <MenuItem value={true}>Sensitive</MenuItem>
                        <MenuItem value={false}>Isensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="edit-match-in-column"
                    label="Column"
                    placeholder="All"
                    value={matchInColumn}
                    onChange={event => `${setMatchInColumn(event.target.value)} ${setMatchColumnError(false)}`}
                    type="number"
                    className={classes.opts}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={matchColumnError === true}
                    helperText={matchColumnError === true ? "Number must be greater than zero." : ""}
                />
                <TextField
                    id="edit-match-column-delimiter"
                    label="Delimiter"
                    value={matchColumnDelimiter}
                    onChange={event => `${setMatchColumnDelimiter(event.target.value)} ${setMatchDelimiterError(false)}`}
                    className={classes.opts}
                    required={matchInColumn === "" ? false : true}
                    error={matchDelimiterError === true}
                    helperText={matchDelimiterError === true ? "Required and must be different than find expression." : ""}
                />
            </div>
            <TextField
                id="edit-match-find"
                label="Find"
                className={classes.textField}
                value={matchFind}
                required={true}
                onChange={event => `${setMatchFind(event.target.value)} ${setMatchFindError(false)}`}
                error={matchFindError === true}
                helperText={matchFindError === true ? "Field cannot be empty!" : ""}
                fullWidth
            />
        </React.Fragment>
    );
});

export default EditMatch;
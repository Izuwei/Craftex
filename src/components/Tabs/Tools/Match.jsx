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

function MatchTool(props) {
    const classes = useStyles();

    const [matchFind, setMatchFind] = useState("");
    const [matchCaseSensitive, setMatchCaseSensitive] = useState(false);
    const [occurrence, setOccurrence] = useState("all");
    const [matchInColumn, setMatchInColumn] = useState("");
    const [matchColumnDelimiter, setMatchColumnDelimiter] = useState("");

    const [matchFindError, setMatchFindError] = useState(false);
    const [matchColumnError, setMatchColumnError] = useState(false);
    const [matchDelimiterError, setMatchDelimiterError] = useState(false);

    const handleMatch = () => {
        if (matchFind === ""){
            setMatchFindError(true);
        }

        if ((matchInColumn !== "" && matchColumnDelimiter === "") || (matchColumnDelimiter === matchFind && matchFind !== "")) {
            setMatchDelimiterError(true);
        }

        if (matchInColumn !== "" && matchInColumn <= 0) {
            setMatchColumnError(true);
        }

        if (matchFind !== "" && (matchInColumn === "" || (matchInColumn > 0 && matchColumnDelimiter !== "" && matchColumnDelimiter !== matchFind))) {
            props.addTool({toolname: "match", expression: matchFind, occurrence: occurrence, casesensitive: matchCaseSensitive, inColumn: matchInColumn, delimiter: matchColumnDelimiter});
            props.showAlert("success", "Success: Match added into the pipeline.");
            setMatchFind("");
            setMatchInColumn("");
            setMatchColumnDelimiter("");
            setMatchDelimiterError(false);
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding match into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="match-occurence-label">Occurrence</InputLabel>
                    <Select
                      labelId="match-occurence-label"
                      id="match-occurrence"
                      className={classes.opts}
                      value={occurrence}
                      onChange={(event) => setOccurrence(event.target.value)}
                    >
                        <MenuItem value={"first"}>First</MenuItem>
                        <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="match-case-label">Case</InputLabel>
                    <Select
                      labelId="match-case-label"
                      id="match-case"
                      className={classes.opts}
                      value={matchCaseSensitive}
                      onChange={(event) => setMatchCaseSensitive(event.target.value)}
                    >
                        <MenuItem value={true}>Sensitive</MenuItem>
                        <MenuItem value={false}>Isensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="match-in-column"
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
                    id="match-column-delimiter"
                    label="Delimiter"
                    value={matchColumnDelimiter}
                    onChange={event => `${setMatchColumnDelimiter(event.target.value)} ${setMatchDelimiterError(false)}`}
                    className={classes.opts}
                    required={matchInColumn === "" ? false : true}
                    error={matchDelimiterError === true}
                    helperText={matchDelimiterError === true ? "Required and must be different than find expression." : ""}
                />
            </div>
            <div className={classes.flexCenter}>
                <TextField
                    id="match-expression"
                    label="Find"
                    value={matchFind}
                    required={true}
                    onChange={event => `${setMatchFind(event.target.value)} ${setMatchFindError(false)}`}
                    className={classes.textField}
                    error={matchFindError === true}
                    helperText={matchFindError === true ? "Field cannot be empty!" : ""}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    id="add-match"
                    className={classes.button}
                    onClick={() => handleMatch()}
                    startIcon={<Add />}
                >Add</Button>
            </div>
        </div>
    );
};

export default MatchTool;
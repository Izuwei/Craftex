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

function RegexFilterLinesTool(props) {
    const classes = useStyles();

    const [expression, setExpression] = useState("");
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [column, setColumn] = useState("");
    const [delimiter, setDelimiter] = useState("");

    const [expressionError, setExpressionError] = useState(false);
    const [columnError, setColumnError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    const handleRegexFilterLines = () => {
        var validExpression = true;

        try {
            new RegExp(expression);
        } 
        catch (e) {
            setExpressionError(true);
            validExpression = false;
        }

        if (expression === ""){
            setExpressionError(true);
        }

        if (column !== "" && delimiter === "") {
            setDelimiterError(true);
        }

        if (column !== "" && column <= 0) {
            setColumnError(true);
        }

        if (validExpression === true && expression !== "" && (column === "" || (column > 0 && delimiter !== ""))) {
            props.addTool({toolname: "regexFilterLines", expression: expression, casesensitive: caseSensitive, column: column, delimiter: delimiter});
            props.showAlert("success", "Success: Regex filter lines added into the pipeline.");
            setExpression("");
            setColumn("");
            setDelimiter("");
            setDelimiterError(false);
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding regex filter lines into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="regex-filter-lines-case-label">Case</InputLabel>
                    <Select
                      labelId="regex-filter-lines-case-label"
                      id="regex-filter-lines-case"
                      className={classes.opts}
                      value={caseSensitive}
                      onChange={(event) => setCaseSensitive(event.target.value)}
                    >
                        <MenuItem value={true}>Sensitive</MenuItem>
                        <MenuItem value={false}>Isensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="regex-filter-lines-in-column"
                    label="Column"
                    value={column}
                    onChange={event => `${setColumn(event.target.value)} ${setColumnError(false)}`}
                    type="number"
                    className={classes.opts}
                    error={columnError === true}
                    helperText={columnError === true ? "Number must be greater than zero!" : ""}
                />
                <TextField
                    id="regex-filter-lines-column-delimiter"
                    label="Delimiter"
                    value={delimiter}
                    onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                    className={classes.opts}
                    required={column === "" ? false : true}
                    error={delimiterError === true}
                    helperText={delimiterError === true ? "This field is required!" : ""}
                />
            </div>
            <div className={classes.flexCenter}>
                <TextField
                    id="regex-filter-lines-expression"
                    label="Regular expression"
                    value={expression}
                    required={true}
                    onChange={event => `${setExpression(event.target.value)} ${setExpressionError(false)}`}
                    className={classes.textField}
                    error={expressionError === true}
                    helperText={expressionError === true ? "Invalid or empty regular expression!" : ""}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    id="add-regex-filter-lines"
                    className={classes.button}
                    onClick={() => handleRegexFilterLines()}
                    startIcon={<Add />}
                >Add</Button>
            </div>
        </div>
    );
};

export default RegexFilterLinesTool;
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
        margin: "8px 0px 8px auto",
    },
    opts: {
        width: "150px",
        marginRight: "10px",
    },
    textField: {
        width: "100px",
        marginRight: "10px",
    },
    textFieldFW: {
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
}));

function FilterLinesTool(props) {
    const classes = useStyles();

    const [content, setContent] = useState("empty");
    const [caseSensitive, setCaseSensitive] = useState(false);
    const [column, setColumn] = useState("");
    const [delimiter, setDelimiter] = useState("");
    const [customContent, setCustomContent] = useState("");

    const [columnError, setColumnError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);
    const [customContentError, setCustomContentError] = useState(false);

    const handleRemoveLines = () => {
        if (content === "custom" && customContent === ""){
            setCustomContentError(true);
        }

        if (content === "custom" && (column !== "" && delimiter === "")) {
            setDelimiterError(true);
        }

        if (content === "custom" && column !== "" && column <= 0) {
            setColumnError(true);
        }

        if (content === "empty" || content === "whiteChars" || (content === "custom" && customContent !== "" && (column === "" || (column > 0 && delimiter !== "")))) {
            props.addTool({toolname: "filterLines", content: content, casesensitive: caseSensitive, column: column, delimiter: delimiter, customContent: customContent});
            props.showAlert("success", "Success: Filter lines added into the pipeline.");
            setColumn("");
            setDelimiter("");
            setCustomContent("");
            setDelimiterError(false);
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding filter lines into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="filter-lines-content-label">Content</InputLabel>
                    <Select
                      labelId="filter-lines-content-label"
                      id="filter-lines-content"
                      className={classes.opts}
                      value={content}
                      onChange={(event) => `${setContent(event.target.value)} ${setColumnError(false)} ${setDelimiterError(false)} ${setCustomContentError(false)}`}
                    >
                        <MenuItem value={"empty"}>Empty</MenuItem>
                        <MenuItem value={"whiteChars"}>White characters</MenuItem>
                        <MenuItem value={"custom"}>Custom</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="filter-lines-case-label">Case</InputLabel>
                    <Select
                      labelId="filter-lines-case-label"
                      id="filter-lines-case"
                      disabled={content !== "custom"}
                      className={classes.opts}
                      value={caseSensitive}
                      onChange={(event) => setCaseSensitive(event.target.value)}
                    >
                        <MenuItem value={true}>Sensitive</MenuItem>
                        <MenuItem value={false}>Isensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="filter-lines-column"
                    label="Column"
                    disabled={content !== "custom"}
                    value={column}
                    onChange={event => `${setColumn(event.target.value)} ${setColumnError(false)}`}
                    type="number"
                    className={classes.textField}
                    error={columnError === true}
                    helperText={columnError === true ? "Number must be greater than zero!" : ""}
                />
                <TextField
                        id="filter-lines-delimiter"
                        label="Delimiter"
                        disabled={content !== "custom"}
                        value={delimiter}
                        onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                        className={classes.textField}
                        required={column === "" ? false : true}
                        error={delimiterError === true}
                        helperText={delimiterError === true ? "Delimiter is required!" : ""}
                />
            </div>
            <div className={classes.flexCenter}>
                <TextField
                    id="filter-lines-custom-content"
                    label="Custom content"
                    disabled={content !== "custom"}
                    value={customContent}
                    required={content === "custom"}
                    onChange={event => `${setCustomContent(event.target.value)} ${setCustomContentError(false)}`}
                    className={classes.textFieldFW}
                    error={customContentError === true}
                    helperText={customContentError === true ? "Field cannot be empty!" : ""}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    id="add-filter-lines"
                    className={classes.button}
                    onClick={() => handleRemoveLines()}
                    startIcon={<Add />}
                >Add</Button>
            </div>
        </div>
    );
};

export default FilterLinesTool;
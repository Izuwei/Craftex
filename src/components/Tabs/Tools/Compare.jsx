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

function CompareTool(props) {
    const classes = useStyles();

    const [compareValue, setCompareValue] = useState("");
    const [comparator, setComparator] = useState("gt")
    const [inColumn, setInColumn] = useState("");
    const [delimiter, setDelimiter] = useState("");

    const [valueError, setValueError] = useState(false);
    const [inColumnError, setInColumnError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    const handleCompare = () => {
        if (compareValue === ""){
            setValueError(true);
        }

        if ((inColumn !== "" && delimiter === "") || (delimiter === compareValue && compareValue !== "")) {
            setDelimiterError(true);
        }

        if (inColumn !== "" && inColumn <= 0) {
            setInColumnError(true);
        }

        if (compareValue !== "" && (inColumn === "" || (inColumn > 0 && delimiter !== "" && delimiter !== compareValue))) {
            props.addTool({toolname: "compare", value: compareValue, comparator: comparator, inColumn: inColumn, delimiter: delimiter});
            props.showAlert("success", "Success: Compare added into the pipeline.");
            setCompareValue("");
            setInColumn("");
            setDelimiter("");
            setDelimiterError(false);
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding compare into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="compare-comparator-label">Comparator</InputLabel>
                    <Select
                      labelId="compare-comparator-label"
                      id="compare-comparator"
                      style={{ width: "150px", marginRight: "10px" }}
                      value={comparator}
                      onChange={(event) => setComparator(event.target.value)}
                    >
                        <MenuItem id="compare-comparator-gt" value={"gt"}>Greater than</MenuItem>
                        <MenuItem id="compare-comparator-ge" value={"ge"}>Greater equal</MenuItem>
                        <MenuItem id="compare-comparator-lt" value={"lt"}>Less than</MenuItem>
                        <MenuItem id="compare-comparator-le" value={"le"}>Less equal</MenuItem>
                        <MenuItem id="compare-comparator-eq" value={"eq"}>Equal</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="compare-in-column"
                    label="Column"
                    placeholder="All"
                    value={inColumn}
                    onChange={event => `${setInColumn(event.target.value)} ${setInColumnError(false)}`}
                    type="number"
                    className={classes.opts}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={inColumnError === true}
                    helperText={inColumnError === true ? "Number must be greater than zero." : ""}
                />
                <TextField
                    id="compare-column-delimiter"
                    label="Delimiter"
                    value={delimiter}
                    onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                    className={classes.opts}
                    required={inColumn === "" ? false : true}
                    error={delimiterError === true}
                    helperText={delimiterError === true ? "Required and must be different than compare value." : ""}
                />
            </div>
            <div className={classes.flexCenter}>
                <TextField
                    id="compare-value"
                    label="Compare value"
                    value={compareValue}
                    required={true}
                    onChange={event => `${setCompareValue(event.target.value)} ${setValueError(false)}`}
                    className={classes.textField}
                    error={valueError === true}
                    helperText={valueError === true ? "Value cannot be empty!" : ""}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    id="add-compare"
                    className={classes.button}
                    onClick={() => handleCompare()}
                    startIcon={<Add />}
                >Add</Button>
            </div>
        </div>
    );
};

export default CompareTool;
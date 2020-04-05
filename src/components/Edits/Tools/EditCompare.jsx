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

const EditCompare = forwardRef((props, ref) => {
    const classes = useStyles();

    const [compareValue, setCompareValue] = useState(props.tool.value);
    const [comparator, setComparator] = useState(props.tool.comparator)
    const [inColumn, setInColumn] = useState(props.tool.inColumn);
    const [delimiter, setDelimiter] = useState(props.tool.delimiter);

    const [valueError, setValueError] = useState(false);
    const [inColumnError, setInColumnError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {      
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
                props.updateTool({...props.tool, value: compareValue, comparator: comparator, inColumn: inColumn, delimiter: delimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="edit-compare-comparator-label">Comparator</InputLabel>
                    <Select
                      labelId="edit-compare-comparator-label"
                      id="edit-compare-comparator"
                      style={{ width: "150px", marginRight: "10px" }}
                      value={comparator}
                      onChange={(event) => setComparator(event.target.value)}
                    >
                        <MenuItem value={"gt"}>Greater than</MenuItem>
                        <MenuItem value={"ge"}>Greater equal</MenuItem>
                        <MenuItem value={"lt"}>Less than</MenuItem>
                        <MenuItem value={"le"}>Less equal</MenuItem>
                        <MenuItem value={"eq"}>Equal</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="edit-compare-in-column"
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
                    id="edit-compare-column-delimiter"
                    label="Delimiter"
                    value={delimiter}
                    onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                    className={classes.opts}
                    required={inColumn === "" ? false : true}
                    error={delimiterError === true}
                    helperText={delimiterError === true ? "Required and must be different than compare value." : ""}
                />
            </div>
            <TextField
                id="edit-compare-value"
                label="Compare value"
                value={compareValue}
                required={true}
                onChange={event => `${setCompareValue(event.target.value)} ${setValueError(false)}`}
                className={classes.textField}
                error={valueError === true}
                helperText={valueError === true ? "Value cannot be empty!" : ""}
                fullWidth
            />
        </React.Fragment>
    );
});

export default EditCompare;
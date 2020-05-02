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

const EditRegexFilterLines = forwardRef((props, ref) => {
    const classes = useStyles();

    const [expression, setExpression] = useState(props.tool.expression);
    const [caseSensitive, setCaseSensitive] = useState(props.tool.casesensitive);
    const [column, setColumn] = useState(props.tool.column);
    const [delimiter, setDelimiter] = useState(props.tool.delimiter);

    const [expressionError, setExpressionError] = useState(false);
    const [columnError, setColumnError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
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
                props.updateTool({...props.tool, expression: expression, casesensitive: caseSensitive, column: column, delimiter: delimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="edit-regex-filter-lines-case-label">Case</InputLabel>
                    <Select
                      labelId="edit-regex-filter-lines-case-label"
                      id="edit-regex-filter-lines-case"
                      className={classes.opts}
                      value={caseSensitive}
                      onChange={(event) => setCaseSensitive(event.target.value)}
                    >
                        <MenuItem id="edit-regex-filter-lines-case-sensitive" value={true}>Sensitive</MenuItem>
                        <MenuItem id="edit-regex-filter-lines-case-isensitive" value={false}>Insensitive</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="edit-regex-filter-lines-in-column"
                    label="Column"
                    value={column}
                    onChange={event => `${setColumn(event.target.value)} ${setColumnError(false)}`}
                    type="number"
                    className={classes.opts}
                    error={columnError === true}
                    helperText={columnError === true ? "Number must be greater than zero!" : ""}
                />
                <TextField
                    id="edit-regex-filter-lines-column-delimiter"
                    label="Delimiter"
                    value={delimiter}
                    onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                    className={classes.opts}
                    required={column === "" ? false : true}
                    error={delimiterError === true}
                    helperText={delimiterError === true ? "This field is required!" : ""}
                />
            </div>
            <TextField
                id="edit-regex-filter-lines-expression"
                label="Regular expression"
                value={expression}
                required={true}
                onChange={event => `${setExpression(event.target.value)} ${setExpressionError(false)}`}
                className={classes.textField}
                error={expressionError === true}
                helperText={expressionError === true ? "Invalid or empty regular expression!" : ""}
                fullWidth
            />
        </React.Fragment>
    );
});

export default EditRegexFilterLines;
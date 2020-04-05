/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, FormControl, InputLabel, Select, MenuItem, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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

const EditFilterLines = forwardRef((props, ref) => {
    const classes = useStyles();

    const [content, setContent] = useState(props.tool.content);
    const [caseSensitive, setCaseSensitive] = useState(props.tool.casesensitive);
    const [column, setColumn] = useState(props.tool.column);
    const [delimiter, setDelimiter] = useState(props.tool.delimiter);
    const [customContent, setCustomContent] = useState(props.tool.customContent);

    const [columnError, setColumnError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);
    const [customContentError, setCustomContentError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
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
                props.updateTool({...props.tool, content: content, casesensitive: caseSensitive, column: column, delimiter: delimiter, customContent: customContent});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <div className={classes.flexStart}>
                <FormControl>
                    <InputLabel id="edit-filter-lines-content-label">Content</InputLabel>
                    <Select
                      labelId="edit-filter-lines-content-label"
                      id="edit-filter-lines-content"
                      className={classes.opts}
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                    >
                        <MenuItem value={"empty"}>Empty</MenuItem>
                        <MenuItem value={"whiteChars"}>White characters</MenuItem>
                        <MenuItem value={"custom"}>Custom</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="edit-filter-lines-case-label">Case</InputLabel>
                    <Select
                      labelId="edit-filter-lines-case-label"
                      id="edit-filter-lines-case"
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
                    id="edit-filter-lines-column"
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
                    id="edit-filter-lines-delimiter"
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
                    id="edit-filter-lines-custom-content"
                    label="Custom content"
                    disabled={content !== "custom"}
                    value={customContent}
                    required={content === "custom"}
                    onChange={event => `${setCustomContent(event.target.value)} ${setCustomContentError(false)}`}
                    className={classes.textFieldFW}
                    error={customContentError === true}
                    helperText={customContentError === true ? "Field cannot be empty!" : ""}
                />
            </div>
        </React.Fragment>
    );
});

export default EditFilterLines;
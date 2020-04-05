/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "100px",
        marginRight: "10px",
    },
    textField: {
        margin: "5px 0px",
    },
}));

const EditInsertColumn = forwardRef((props, ref) => {
    const classes = useStyles();

    const [content, setContent] = useState(props.tool.content);
    const [position, setPosition] = useState(props.tool.position);
    const [delimiter, setDelimiter] = useState(props.tool.delimiter);

    const [contentError, setContentError] = useState(false);
    const [positionError, setPositionError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            if (content === ""){
                setContentError(true);
            }
    
            if (position === "" || position <= 0) {
                setPositionError(true);
            }
    
            if (delimiter === "") {
                setDelimiterError(true);
            }
    
            if (content !== "" && position !== "" && position > 0 && delimiter !== "") {
                props.updateTool({...props.tool, content: content, position: position, delimiter: delimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <TextField
                id="edit-insert-column-position"
                label="Position"
                value={position}
                onChange={event => `${setPosition(event.target.value)} ${setPositionError(false)}`}
                type="number"
                className={classes.opts}
                error={positionError === true}
                helperText={positionError === true ? "Number must be greater than zero!" : ""}
            />
            <TextField
                id="edit-insert-column-delimiter"
                label="Delimiter"
                value={delimiter}
                onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                className={classes.opts}
                required={position === "" ? false : true}
                error={delimiterError === true}
                helperText={delimiterError === true ? "Delimiter is required!" : ""}
            />
            <TextField
                id="edit-insert-column-content"
                label="Content"
                value={content}
                required={true}
                variant="filled"
                onChange={event => `${setContent(event.target.value)} ${setContentError(false)}`}
                className={classes.textField}
                style={{width: "100%", marginTop: "16px"}}
                error={contentError === true}
                helperText={contentError === true ? "Content cannot be empty!" : ""}
                multiline={true}
                rows={10}
            />
        </React.Fragment>
    );
});

export default EditInsertColumn;
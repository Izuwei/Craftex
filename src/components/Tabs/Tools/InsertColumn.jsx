import React, { useState } from 'react';
import { Button, makeStyles, TextField, Collapse } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({    // TODO: Nejspis predelat na sdileny styly pro tento tab
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
    flexEnd: {
        marginTop: "16px",
        display: "flex",
        alignItems: "flex-end",
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
    collapse: {
        width: "100%",
        flex: 1,
    },
}));

function InsertColumnTool(props) {
    const classes = useStyles();

    const [focused, setFocused] = useState(false);
    const [content, setContent] = useState("");
    const [position, setPosition] = useState("");
    const [delimiter, setDelimiter] = useState("");

    const [contentError, setContentError] = useState(false);
    const [positionError, setPositionError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    const handleInsertColumn = () => {
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
            props.addTool({toolname: "insertColumn", content: content, position: position, delimiter: delimiter});
            props.showAlert("success", "Success: Insert column added into the pipeline.");
            setContent("");
            setPosition("");
            setDelimiter("");
            setFocused(false);
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding insert column into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.flexStart}>
                <TextField
                    id="insert-column-position"
                    label="Position"
                    value={position}
                    onChange={event => `${setPosition(event.target.value)} ${setPositionError(false)}`}
                    type="number"
                    className={classes.opts}
                    required={true}
                    error={positionError === true}
                    helperText={positionError === true ? "Number must be greater than zero!" : ""}
                />
                <TextField
                    id="insert-column-delimiter"
                    label="Delimiter"
                    value={delimiter}
                    onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                    className={classes.opts}
                    required={true}
                    error={delimiterError === true}
                    helperText={delimiterError === true ? "Delimiter is required!" : ""}
                />
            </div>
            <div className={classes.flexEnd}>
                <Collapse className={classes.collapse} in={focused} collapsedHeight={"50px"} >
                    <TextField
                        id="insert-column-content"
                        label="Content"
                        value={content}
                        required={true}
                        variant="filled"
                        onChange={event => `${setContent(event.target.value)} ${setContentError(false)}`}
                        className={classes.textField}
                        style={{width: "100%"}}
                        error={contentError === true}
                        helperText={contentError === true ? "Content cannot be empty!" : ""}
                        multiline={true}
                        rows={10}
                        onFocus={() => setFocused(true)}
                        onBlur={() => content === "" ? setFocused(false) : null}
                    />
                </Collapse>
                <Button
                    color="secondary"
                    variant="contained"
                    id="add-insert-column"
                    className={classes.button}
                    onClick={() => handleInsertColumn()}
                    startIcon={<Add />}
                >Add</Button>
            </div>
        </div>
    );
};

export default InsertColumnTool;
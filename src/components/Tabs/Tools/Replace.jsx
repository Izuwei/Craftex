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
        display: "flex",
        alignItems: "center",
    },
    select: {
        width: "120px",
    },
}));

function ReplaceTool(props) {
    const classes = useStyles();

    const [replaceFind, setReplaceFind] = useState("");
    const [replaceFindError, setReplaceFindError] = useState(false);
    const [replaceReplace, setReplaceReplace] = useState("");
    const [occurrence, setOccurrence] = useState("all");

    const handleReplace = () => {
        if (replaceFind === ""){
            setReplaceFindError(true);
            props.showAlert("error", "Error: Find expression cannot be empty!");
        }
        else {
            setReplaceFindError(false);
            props.addTool({toolname: "replace", find: replaceFind, replace: replaceReplace});
            props.showAlert("success", "Success: Replace added into the pipeline.");
            setReplaceFind("");
            setReplaceReplace("");
        }
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="replace-occurence-label">Occurrence</InputLabel>
                <Select
                  labelId="replace-occurence-label"
                  id="replace-occurrence"
                  className={classes.select}
                  value={occurrence}
                  onChange={(event) => setOccurrence(event.target.value)}
                >
                    <MenuItem value={"first"}>First</MenuItem>
                    <MenuItem value={"all"}>All</MenuItem>
                </Select>
            </FormControl>
            <div className={classes.flexCenter}>
                <TextField
                    id="replace-find"
                    label="Find"
                    value={replaceFind}
                    onChange={event => `${setReplaceFind(event.target.value)} ${setReplaceFindError(false)}`}
                    className={classes.textField}
                    error={replaceFindError === true}
                    helperText={replaceFindError === true ? 'Field cannot be empty!' : ''}
                />
                <TextField
                    id="replace-replace"
                    label="Replace"
                    value={replaceReplace}
                    onChange={event => setReplaceReplace(event.target.value)}
                    className={classes.textField}
                />
                <Button
                    color="secondary"
                    variant="contained"
                    id="add-replace"
                    className={classes.button}
                    onClick={() => handleReplace()}
                    startIcon={<Add />}
                >Add</Button>
            </div>
        </div>
    );
};

export default ReplaceTool;
import React, { useState } from 'react';
import { Button, makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "5px",
    },
    button: {
        margin: "8px 0px 8px 8px",
    },
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

function RemoveLinesTool(props) {
    const classes = useStyles();

    const [content, setContent] = useState("empty");

    const handleRemoveLines = () => {
        props.addTool({toolname: "removeLines", content: content});
        props.showAlert("success", "Success: Remove lines added into the pipeline.");
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="remove-lines-content-label">Content</InputLabel>
                <Select
                  labelId="remove-lines-content-label"
                  id="remove-lines-content"
                  className={classes.opts}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                >
                    <MenuItem value={"empty"}>Empty</MenuItem>
                    <MenuItem value={"whiteSpaces"}>White spaces</MenuItem>
                </Select>
            </FormControl>
            <Button
                color="secondary"
                variant="contained"
                id="add-reverse"
                className={classes.button}
                onClick={() => handleRemoveLines()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default RemoveLinesTool;
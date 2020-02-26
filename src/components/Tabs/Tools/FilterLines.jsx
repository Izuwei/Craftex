import React, { useState } from 'react';
import { Button, makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "5px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    button: {
        margin: "8px 0px 8px 8px",
    },
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

function FilterLinesTool(props) {
    const classes = useStyles();

    const [content, setContent] = useState("empty");

    const handleRemoveLines = () => {
        props.addTool({toolname: "filterLines", content: content});
        props.showAlert("success", "Success: Filter lines added into the pipeline.");
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="filter-lines-content-label">Content</InputLabel>
                <Select
                  labelId="filter-lines-content-label"
                  id="filter-lines-content"
                  className={classes.opts}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                >
                    <MenuItem value={"empty"}>Empty</MenuItem>
                    <MenuItem value={"whiteChars"}>White characters</MenuItem>
                </Select>
            </FormControl>
            <Button
                color="secondary"
                variant="contained"
                id="add-filter-lines"
                className={classes.button}
                onClick={() => handleRemoveLines()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default FilterLinesTool;
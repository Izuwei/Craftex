/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

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
        margin: "8px 0px 8px auto",
    },
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

function ReverseTool(props) {
    const classes = useStyles();

    const [direction, setDirection] = useState("vertical");

    const handleReverse = () => {
        props.addTool({toolname: "reverse", direction: direction});
        props.showAlert("success", "Success: Reverse added into the pipeline.");
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="reverse-direction-label">Direction</InputLabel>
                <Select
                  labelId="reverse-direction-label"
                  id="reverse-direction"
                  className={classes.opts}
                  value={direction}
                  onChange={(event) => setDirection(event.target.value)}
                >
                    <MenuItem id="reverse-direction-horizontal" value={"horizontal"}>Horizontal</MenuItem>
                    <MenuItem id="reverse-direction-vertical" value={"vertical"}>Vertical</MenuItem>
                </Select>
            </FormControl>
            <Button
                color="secondary"
                variant="contained"
                id="add-reverse"
                className={classes.button}
                onClick={() => handleReverse()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default ReverseTool;
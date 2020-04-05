/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

const EditReverse = forwardRef((props, ref) => {
    const classes = useStyles();

    const [direction, setDirection] = useState(props.tool.direction);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            props.updateTool({...props.tool, direction: direction});
            props.close();
        }
    }));

    return (
        <React.Fragment>
            <FormControl>
                <InputLabel id="edit-reverse-direction-label">Direction</InputLabel>
                <Select
                  labelId="edit-reverse-direction-label"
                  id="edit-reverse-direction"
                  className={classes.opts}
                  value={direction}
                  onChange={(event) => setDirection(event.target.value)}
                >
                    <MenuItem value={"horizontal"}>Horizontal</MenuItem>
                    <MenuItem value={"vertical"}>Vertical</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    );
});

export default EditReverse;
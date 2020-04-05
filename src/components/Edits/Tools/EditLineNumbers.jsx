/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

const EditLineNumbers = forwardRef((props, ref) => {
    const classes = useStyles();

    const [startingNumber, setStartingNumber] = useState(props.tool.startingNumber);
    const [variant, setVariant] = useState(props.tool.variant);
    const [delimiter, setDelimiter] = useState(props.tool.delimiter);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            props.updateTool({...props.tool, variant: variant, startingNumber: startingNumber === "" ? "1" : startingNumber, delimiter: delimiter === "" ? " " : delimiter});
            props.close();
        }
    }));

    return (
        <React.Fragment>
            <FormControl>
                <InputLabel id="edit-line-numbers-variant-label">Variant</InputLabel>
                <Select
                  labelId="edit-line-numbers-variant-label"
                  id="edit-line-numbers-variant"
                  className={classes.opts}
                  value={variant}
                  onChange={(event) => setVariant(event.target.value)}
                >
                    <MenuItem id="edit-line-numbers-variant-all" value={"all"}>All lines</MenuItem>
                    <MenuItem id="edit-line-numbers-variant-nonempty" value={"nonempty"}>Nonempty lines</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="line-numbers-starting-number"
                label="Starting number"
                placeholder="Default 1"
                value={startingNumber}
                onChange={event => setStartingNumber(event.target.value)}
                type="number"
                className={classes.opts}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="edit-line-numbers-delimiter"
                label="Delimiter"
                placeholder="Default space"
                value={delimiter}
                onChange={event => setDelimiter(event.target.value)}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </React.Fragment>
    );
});

export default EditLineNumbers;
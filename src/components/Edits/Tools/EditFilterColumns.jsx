/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "180px",
        marginRight: "10px",
    },
    textField: {
        margin: "5px 0px",
    },
}));

const EditFilterColumns = forwardRef((props, ref) => {
    const classes = useStyles();

    const [variant, setVariant] = useState(props.tool.variant);
    const [position, setPosition] = useState(props.tool.position);
    const [delimiter, setDelimiter] = useState(props.tool.delimiter);

    const [positionError, setPositionError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            if (position === "" || position <= 0){
                setPositionError(true);
            }
    
            if (delimiter === "") {
                setDelimiterError(true);
            }
    
            if (position !== "" && position > 0 && delimiter !== "") {
                props.updateTool({...props.tool, variant: variant, position: position, delimiter: delimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <FormControl>
                <InputLabel id="edit-filter-columns-variant-label">Variant</InputLabel>
                <Select
                  labelId="edit-filter-columns-variant-label"
                  id="edit-filter-columns-variant"
                  className={classes.opts}
                  value={variant}
                  onChange={(event) => setVariant(event.target.value)}
                >
                    <MenuItem value={"remove"}>Remove</MenuItem>
                    <MenuItem value={"cut"}>Cut</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="edit-filter-columns-position"
                label="Position"
                value={position}
                onChange={event => `${setPosition(event.target.value)} ${setPositionError(false)}`}
                type="number"
                className={classes.opts}
                required={true}
                error={positionError === true}
                helperText={positionError === true ? "Required and number must be greater than zero!" : ""}
            />
            <TextField
                id="edit-filter-columns-delimiter"
                label="Delimiter"
                value={delimiter}
                onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                className={classes.opts}
                required={true}
                error={delimiterError === true}
                helperText={delimiterError === true ? "This field is required!" : ""}
            />
        </React.Fragment>
    );
});

export default EditFilterColumns;
/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState } from 'react';
import { Button, makeStyles, TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
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
    textField: {
        width: "100px",
        marginRight: "10px",
    },
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

function FilterColumnsTool(props) {
    const classes = useStyles();

    const [variant, setVariant] = useState("remove");
    const [position, setPosition] = useState("");
    const [delimiter, setDelimiter] = useState("");

    const [positionError, setPositionError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    const handleFilterColumns = () => {
        if (position === "" || position <= 0){
            setPositionError(true);
        }

        if (delimiter === "") {
            setDelimiterError(true);
        }

        if (position !== "" && position > 0 && delimiter !== "") {
            props.addTool({toolname: "filterColumns", variant: variant, position: position, delimiter: delimiter});
            props.showAlert("success", "Success: Filter columns added into the pipeline.");
            setPosition("");
            setDelimiter("");
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding filter columns into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="filter-columns-variant-label">Variant</InputLabel>
                <Select
                  labelId="filter-columns-variant-label"
                  id="filter-columns-variant"
                  className={classes.opts}
                  value={variant}
                  onChange={(event) => setVariant(event.target.value)}
                >
                    <MenuItem id="filter-columns-variant-remove" value={"remove"}>Remove</MenuItem>
                    <MenuItem id="filter-columns-variant-cut" value={"cut"}>Cut</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="filter-columns-position"
                label="Position"
                value={position}
                onChange={event => `${setPosition(event.target.value)} ${setPositionError(false)}`}
                type="number"
                required={true}
                className={classes.textField}
                error={positionError === true}
                helperText={positionError === true ? "Required and number must be greater than zero." : ""}
            />
            <TextField
                id="filter-columns-delimiter"
                label="Delimiter"
                value={delimiter}
                onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                className={classes.textField}
                required={true}
                error={delimiterError === true}
                helperText={delimiterError === true ? "This field is required" : ""}
            />
            <Button
                color="secondary"
                variant="contained"
                id="add-filter-columns"
                className={classes.button}
                onClick={() => handleFilterColumns()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default FilterColumnsTool;
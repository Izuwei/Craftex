/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState } from 'react';
import { Button, makeStyles, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
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

function CutLinesTool(props) {
    const classes = useStyles();

    const [variant, setVariant] = useState("head");
    const [count, setCount] = useState("");

    const [countError, setCountError] = useState(false);

    const handleCutLines = () => {
        if (count === "" || count <= 0) {
            setCountError(true);
        }

        if (count !== "" && count > 0) {
            props.addTool({toolname: "cutLines", variant: variant, count: count});
            props.showAlert("success", "Success: Cut lines added into the pipeline.");
            setCount("");
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding cut lines into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="cut-lines-variant-label">Variant</InputLabel>
                <Select
                    labelId="cut-lines-variant-label"
                    id="cut-lines-variant"
                    className={classes.opts}
                    value={variant}
                    onChange={(event) => setVariant(event.target.value)}
                >
                    <MenuItem id="cut-lines-variant-head" value={"head"}>Head</MenuItem>
                    <MenuItem id="cut-lines-variant-tail" value={"tail"}>Tail</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="cut-lines-position"
                label="Count"
                value={count}
                onChange={event => `${setCount(event.target.value)} ${setCountError(false)}`}
                type="number"
                required={true}
                className={classes.textField}
                error={countError === true}
                helperText={countError === true ? "Required and number must be greater than zero." : ""}
            />
            <Button
                color="secondary"
                variant="contained"
                id="add-cut-lines"
                className={classes.button}
                onClick={() => handleCutLines()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default CutLinesTool;
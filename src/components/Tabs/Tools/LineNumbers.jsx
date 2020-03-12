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
        width: "400px",
        marginRight: "10px",
    },
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

function LineNumbersTool(props) {
    const classes = useStyles();

    const [startingNumber, setStartingNumber] = useState("");
    const [variant, setVariant] = useState("all");
    const [delimiter, setDelimiter] = useState("");

    const handleLineNumbers = () => {
        props.addTool({toolname: "lineNumbers", variant: variant, startingNumber: startingNumber === "" ? "1" : startingNumber, delimiter: delimiter === "" ? " " : delimiter});
        props.showAlert("success", "Success: Line numbers added into the pipeline.");
        setStartingNumber("");
        setDelimiter("");
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="line-numbers-variant-label">Variant</InputLabel>
                <Select
                  labelId="line-numbers-variant-label"
                  id="line-numbers-variant"
                  className={classes.opts}
                  value={variant}
                  onChange={(event) => setVariant(event.target.value)}
                >
                    <MenuItem value={"all"}>All lines</MenuItem>
                    <MenuItem value={"nonempty"}>Nonempty lines</MenuItem>
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
                id="line-numbers-delimiter"
                label="Delimiter"
                placeholder="Default space"
                value={delimiter}
                onChange={event => setDelimiter(event.target.value)}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button
                color="secondary"
                variant="contained"
                id="add-line-numbers"
                className={classes.button}
                onClick={() => handleLineNumbers()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default LineNumbersTool;
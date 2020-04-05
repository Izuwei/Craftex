/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState } from 'react';
import { Button, makeStyles, InputLabel, MenuItem, FormControl, Select, FormControlLabel, Checkbox } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "5px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    },
    button: {
        margin: "8px 0px 8px auto",
    },
    opts: {
        width: "180px",
        marginRight: "10px",
    },
    checkbox: {
        color: "#039be5",
    },
}));

function UniqueTool(props) {
    const classes = useStyles();

    const [variant, setVariant] = useState("merge");
    const [caseSensitive, setCaseSensitive] = useState(true);
    const [countPrefix, setCountPrefix] = useState(false);
    const [countDisabled, setCountDisabled] = useState(false);

    const handleUnique = () => {
        props.addTool({toolname: "unique", variant: variant, casesensitive: caseSensitive, countPrefix: countPrefix});
        props.showAlert("success", "Success: Unique added into the pipeline.");
    }

    const handleVariant = (option) => {
        switch (option) {
            case "merge":
                setVariant("merge");
                setCountDisabled(false);
                return;
            case "unique":
                setVariant("unique");
                setCountDisabled(true);
                setCountPrefix(false);
                return;
            case "duplicate":
                setVariant("duplicate");
                setCountDisabled(true);
                setCountPrefix(false);
                return;
            default:
                return;
        }
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="unique-variant-label">Variant</InputLabel>
                <Select
                  labelId="unique-variant-label"
                  id="unique-variant"
                  className={classes.opts}
                  value={variant}
                  onChange={(event) => handleVariant(event.target.value)}
                >
                    <MenuItem value={"merge"}>Merge</MenuItem>
                    <MenuItem value={"unique"}>Unique only</MenuItem>
                    <MenuItem value={"duplicate"}>Duplicate only</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="unique-case-label">Case</InputLabel>
                <Select
                  labelId="unique-case-label"
                  id="unique-case"
                  className={classes.opts}
                  value={caseSensitive}
                  onChange={(event) => setCaseSensitive(event.target.value)}
                >
                    <MenuItem value={true}>Sensitive</MenuItem>
                    <MenuItem value={false}>Isensitive</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                style={{marginLeft: "10px"}}
                control={
                    <Checkbox 
                        className={classes.checkbox}
                        color="default"
                        checked={countPrefix}
                        disabled={countDisabled === true}
                        onChange={(event) => setCountPrefix(event.target.checked)}
                        id="unique-count"
                    />}
                label="Prefix lines by the number of occurrences"
            />
            <Button
                color="secondary"
                variant="contained"
                id="add-unique"
                className={classes.button}
                onClick={() => handleUnique()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default UniqueTool;
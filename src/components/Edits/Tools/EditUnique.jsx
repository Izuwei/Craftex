import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, InputLabel, MenuItem, FormControl, Select, FormControlLabel, Checkbox } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "180px",
        marginRight: "10px",
    },
    checkbox: {
        color: "#039be5",
    },
}));

const EditUnique = forwardRef((props, ref) => {    // TODO: dodelat callbacky
    const classes = useStyles();

    const [variant, setVariant] = useState(props.tool.variant);
    const [caseSensitive, setCaseSensitive] = useState(props.tool.casesensitive);
    const [countPrefix, setCountPrefix] = useState(props.tool.countPrefix);
    const [countDisabled, setCountDisabled] = useState(props.tool.variant === "merge" ? false : true);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            props.updateTool({...props.tool, variant: variant, casesensitive: caseSensitive, countPrefix: countPrefix});
            props.close();
        }
    }));

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
    };

    return (
        <React.Fragment>
            <FormControl>
                <InputLabel id="edit-unique-variant-label">Variant</InputLabel>
                <Select
                  labelId="edit-unique-variant-label"
                  id="edit-unique-variant"
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
                <InputLabel id="edit-unique-case-label">Case</InputLabel>
                <Select
                  labelId="edit-unique-case-label"
                  id="edit-unique-case"
                  className={classes.opts}
                  value={caseSensitive}
                  onChange={(event) => setCaseSensitive(event.target.value)}
                >
                    <MenuItem value={true}>Sensitive</MenuItem>
                    <MenuItem value={false}>Isensitive</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                style={{marginLeft: "10px", flex: 1}}
                control={
                    <Checkbox 
                        className={classes.checkbox}
                        color="default"
                        checked={countPrefix}
                        disabled={countDisabled === true}
                        onChange={(event) => setCountPrefix(event.target.checked)}
                        id="edit-unique-count"
                    />}
                label="Prefix lines by the number of occurrences"
            />
        </React.Fragment>
    );
});

export default EditUnique;
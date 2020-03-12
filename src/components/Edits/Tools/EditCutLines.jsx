import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "150px",
        marginRight: "10px",
    },
    textField: {
        width: "100px",
    },
}));

const EditCutLines = forwardRef((props, ref) => {
    const classes = useStyles();

    const [variant, setVariant] = useState(props.tool.variant);
    const [count, setCount] = useState(props.tool.count);

    const [countError, setCountError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            if (count === "" || count <= 0) {
                setCountError(true);
            }
            if (count !== "" && count > 0) {
                props.updateTool({...props.tool, variant: variant, count: count});
                props.close();
            }     
        }
    }));

    return (
        <React.Fragment>
            <FormControl>
                <InputLabel id="edit-cut-lines-variant-label">Variant</InputLabel>
                <Select
                    labelId="edit-cut-lines-variant-label"
                    id="edit-cut-lines-variant"
                    className={classes.opts}
                    value={variant}
                    onChange={(event) => setVariant(event.target.value)}
                >
                    <MenuItem value={"head"}>Head</MenuItem>
                    <MenuItem value={"tail"}>Tail</MenuItem>
                </Select>
            </FormControl>
            <TextField
                id="edit-cut-lines-position"
                label="Count"
                value={count}
                onChange={event => `${setCount(event.target.value)} ${setCountError(false)}`}
                type="number"
                required={true}
                className={classes.textField}
                error={countError === true}
                helperText={countError === true ? "Required and number must be greater than zero." : ""}
            />
        </React.Fragment>
    );
});

export default EditCutLines;
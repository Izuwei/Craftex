import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "200px",
        marginRight: "10px",
    },
    flexCenter: {
        display: "flex",
        alignItems: "center",
    },
    checkbox: {
        color: "#039be5",
    },
}));

const EditSort = forwardRef((props, ref) => {    // TODO: dodelat callbacky
    const classes = useStyles();

    const [order, setOrder] = useState(props.tool.order);
    const [caseSensitive, setCaseSensitive] = useState(props.tool.casesensitive);
    const [ignoreLeadingBlanks, setIgnoreLeadingBlanks] = useState(props.tool.ignoreLeadingBlanks);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            props.updateTool({...props.tool, order: order, casesensitive: caseSensitive, ignoreLeadingBlanks: ignoreLeadingBlanks});
            props.close();
        }
    }));

    return (
        <div className={classes.flexCenter}>
            <FormControl>
                <InputLabel id="edit-sort-order-label">Order</InputLabel>
                <Select
                  labelId="edit-sort-order-label"
                  id="edit-sort-order"
                  className={classes.opts}
                  value={order}
                  onChange={(event) => setOrder(event.target.value)}
                >
                    <MenuItem value={"ascending"}>Ascending</MenuItem>
                    <MenuItem value={"descending"}>Descending</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="edit-sort-case-label">Case</InputLabel>
                <Select
                  labelId="edit-sort-case-label"
                  id="edit-sort-case"
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
                        checked={ignoreLeadingBlanks}
                        onChange={(event) => setIgnoreLeadingBlanks(event.target.checked)}
                        id="edit-sort-ignore-leading-blanks"
                    />}
                label="Ignore leading blanks"
            />
        </div>
    );
});

export default EditSort;
import React, { useState } from 'react';
import { Button, makeStyles, InputLabel, MenuItem, FormControl, Select, Checkbox, FormControlLabel } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "5px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    checkbox: {
        color: "#039be5",
    },
    button: {
        margin: "8px 0px 8px 8px",
    },
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

function SortTool(props) {
    const classes = useStyles();

    const [order, setOrder] = useState("ascending");
    const [caseSensitive, setCaseSensitive] = useState(true);
    const [ignoreLeadingBlanks, setIgnoreLeadingBlanks] = useState(false);

    const handleSort = () => {
        props.addTool({toolname: "sort", order: order, casesensitive: caseSensitive, ignoreLeadingBlanks: ignoreLeadingBlanks});
        props.showAlert("success", "Success: Sort added into the pipeline.");
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="sort-order-label">Order</InputLabel>
                <Select
                  labelId="sort-order-label"
                  id="sort-order"
                  className={classes.opts}
                  value={order}
                  onChange={(event) => setOrder(event.target.value)}
                >
                    <MenuItem value={"ascending"}>Ascending</MenuItem>
                    <MenuItem value={"descending"}>Descending</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="sort-case-label">Case</InputLabel>
                <Select
                  labelId="sort-case-label"
                  id="sort-case"
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
                        id="sort-ignore-leading-blanks"
                    />}
                label="Ignore leading blanks"
            />
            <Button
                color="secondary"
                variant="contained"
                id="add-sort"
                className={classes.button}
                onClick={() => handleSort()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default SortTool;
import React, { useState } from 'react';
import { Button, makeStyles, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
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
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

function ConvertCaseTool(props) {
    const classes = useStyles();

    const [textCase, setTextCase] = useState("uppercase");

    const handleConvertCase = () => {
        props.addTool({toolname: "convertCase", textCase: textCase});
        props.showAlert("success", "Success: Convert case added into the pipeline.");
    }

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel id="convert-case-case-label">Case</InputLabel>
                <Select
                  labelId="convert-case-case-label"
                  id="convert-case-case"
                  className={classes.opts}
                  value={textCase}
                  onChange={(event) => setTextCase(event.target.value)}
                >
                    <MenuItem value={"uppercase"}>Upper case</MenuItem>
                    <MenuItem value={"lowercase"}>Lower case</MenuItem>
                </Select>
            </FormControl>
            <Button
                color="secondary"
                variant="contained"
                id="add-convert-case"
                className={classes.button}
                onClick={() => handleConvertCase()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default ConvertCaseTool;
import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "11px 5px 5px 5px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
}));

function TrimTool(props) {
    const classes = useStyles();

    const handleTrim = () => {
        props.addTool({toolname: "trim"});
        props.showAlert("success", "Success: Trim added into the pipeline.");
    }

    return (
        <div className={classes.root}>
            <Button
                color="secondary"
                variant="contained"
                id="add-trim"
                className={classes.button}
                onClick={() => handleTrim()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default TrimTool;
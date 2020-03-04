import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        padding: "11px 5px 5px 5px",
        display: "inline-block",
    },
}));

function RemoveExtraSpacesTool(props) {
    const classes = useStyles();

    const handleRemoveExtraSpaces = () => {
        props.addTool({toolname: "removeExtraSpaces"});
        props.showAlert("success", "Success: Remove extra spaces added into the pipeline.");
    }

    return (
        <div className={classes.root}>
            <Button
                color="secondary"
                variant="contained"
                id="add-remove-extra-spaces"
                onClick={() => handleRemoveExtraSpaces()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default RemoveExtraSpacesTool;
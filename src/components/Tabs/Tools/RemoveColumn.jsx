import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
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
        margin: "8px 0px 8px 8px",
    },
    textField: {
        width: "100px",
        marginRight: "10px",
    },
}));

function RemoveColumnTool(props) {
    const classes = useStyles();

    const [position, setPosition] = useState("");
    const [delimiter, setDelimiter] = useState("");

    const [positionError, setPositionError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    const handleRemoveColumn = () => {
        if (position === "" || position <= 0){
            setPositionError(true);
        }

        if (delimiter === "") {
            setDelimiterError(true);
        }

        if (position !== "" && position > 0 && delimiter !== "") {
            props.addTool({toolname: "removeColumn", position: position, delimiter: delimiter});
            props.showAlert("success", "Success: Remove column added into the pipeline.");
            setPosition("");
            setDelimiter("");
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding remove column into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <TextField
                id="remove-column-position"
                label="Position"
                value={position}
                onChange={event => `${setPosition(event.target.value)} ${setPositionError(false)}`}
                type="number"
                required={true}
                className={classes.textField}
                error={positionError === true}
                helperText={positionError === true ? "Required and number must be greater than zero." : ""}
            />
            <TextField
                id="remove-column-delimiter"
                label="Delimiter"
                value={delimiter}
                onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                className={classes.textField}
                required={true}
                error={delimiterError === true}
                helperText={delimiterError === true ? "This field is required" : ""}
            />
            <Button
                color="secondary"
                variant="contained"
                id="add-remove-column"
                className={classes.button}
                onClick={() => handleRemoveColumn()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default RemoveColumnTool;
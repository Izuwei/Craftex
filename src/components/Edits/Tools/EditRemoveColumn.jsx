import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "100px",
        marginRight: "10px",
    },
    textField: {
        margin: "5px 0px",
    },
}));

const EditMatch = forwardRef((props, ref) => {    // TODO: dodelat callbacky
    const classes = useStyles();

    const [position, setPosition] = useState(props.tool.position);
    const [delimiter, setDelimiter] = useState(props.tool.delimiter);

    const [positionError, setPositionError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            if (position === "" || position <= 0){
                setPositionError(true);
            }
    
            if (delimiter === "") {
                setDelimiterError(true);
            }
    
            if (position !== "" && position > 0 && delimiter !== "") {
                props.updateTool({...props.tool, position: position, delimiter: delimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
                <TextField
                    id="edit-remove-column-position"
                    label="Position"
                    value={position}
                    onChange={event => `${setPosition(event.target.value)} ${setPositionError(false)}`}
                    type="number"
                    className={classes.opts}
                    required={true}
                    error={positionError === true}
                    helperText={positionError === true ? "Required and number must be greater than zero!" : ""}
                />
                <TextField
                    id="edit-remove-column-delimiter"
                    label="Delimiter"
                    value={delimiter}
                    onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                    className={classes.opts}
                    required={true}
                    error={delimiterError === true}
                    helperText={delimiterError === true ? "This field is required!" : ""}
                />
        </React.Fragment>
    );
});

export default EditMatch;
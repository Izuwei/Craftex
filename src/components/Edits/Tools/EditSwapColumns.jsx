import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

const EditSwapColumns = forwardRef((props, ref) => {    // TODO: dodelat callbacky
    const classes = useStyles();

    const [firstPosition, setFirstPosition] = useState(props.tool.first);
    const [secondPosition, setSecondPosition] = useState(props.tool.second);
    const [delimiter, setDelimiter] = useState(props.tool.delimiter);

    const [firstPositionError, setFirstPositionError] = useState(false);
    const [secondPositionError, setSecondPositionError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            if (firstPosition === "" || firstPosition <= 0 || firstPosition === secondPosition){
                setFirstPositionError(true);
            }

            if (secondPosition === "" || secondPosition <= 0 || firstPosition === secondPosition) {
                setSecondPositionError(true);
            }
    
            if (delimiter === "") {
                setDelimiterError(true);
            }
    
            if (firstPosition !== "" && firstPosition > 0 && secondPosition !== "" && secondPosition > 0 && delimiter !== "" && firstPosition !== secondPosition) {
                props.updateTool({...props.tool, first: firstPosition, second: secondPosition, delimiter: delimiter});
                props.close();
            }
        }
    }));

    return (
        <React.Fragment>
            <TextField
                id="edit-swap-columns-position-one"
                label="First position"
                value={firstPosition}
                onChange={event => `${setFirstPosition(event.target.value)} ${setFirstPositionError(false)}`}
                type="number"
                className={classes.opts}
                required={true}
                error={firstPositionError === true}
                helperText={firstPositionError === true ? "Number must be greater than zero and different than second position!" : ""}
            />
            <TextField
                id="edit-swap-columns-position-two"
                label="Second position"
                value={secondPosition}
                onChange={event => `${setSecondPosition(event.target.value)} ${setSecondPositionError(false)}`}
                type="number"
                className={classes.opts}
                required={true}
                error={secondPositionError === true}
                helperText={secondPositionError === true ? "Number must be greater than zero and different than first position!" : ""}
            />
            <TextField
                id="edit-swap-columns-delimiter"
                label="Delimiter"
                value={delimiter}
                onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                className={classes.opts}
                required={true}
                error={delimiterError === true}
                helperText={delimiterError === true ? "Delimiter is required!" : ""}
            />
        </React.Fragment>
    );
});

export default EditSwapColumns;
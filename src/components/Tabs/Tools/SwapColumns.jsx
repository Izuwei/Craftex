import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({    // TODO: Nejspis predelat na sdileny styly pro tento tab
    root: {
        padding: "5px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
    },
    button: {
        margin: "8px 0px 8px auto",
    },
    opts: {
        width: "150px",
        marginRight: "10px",
    },
}));

function SwapColumnsTool(props) {
    const classes = useStyles();

    const [firstPosition, setFirstPosition] = useState("");
    const [secondPosition, setSecondPosition] = useState("");
    const [delimiter, setDelimiter] = useState("");

    const [firstPositionError, setFirstPositionError] = useState(false);
    const [secondPositionError, setSecondPositionError] = useState(false);
    const [delimiterError, setDelimiterError] = useState(false);

    const handleSwapColumns = () => {
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
            props.addTool({toolname: "swapColumns", first: firstPosition, second: secondPosition, delimiter: delimiter});
            props.showAlert("success", "Success: Swap columns added into the pipeline.");
            setFirstPosition("");
            setSecondPosition("");
            setDelimiter("");
        }
        else {
            props.showAlert("error", "Error: An error occurred while adding swap columns into the pipeline!");
        }
    }

    return (
        <div className={classes.root}>
            <TextField
                id="swap-columns-position-one"
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
                id="swap-columns-position-two"
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
                id="swap-columns-delimiter"
                label="Delimiter"
                value={delimiter}
                onChange={event => `${setDelimiter(event.target.value)} ${setDelimiterError(false)}`}
                className={classes.opts}
                required={true}
                error={delimiterError === true}
                helperText={delimiterError === true ? "Delimiter is required!" : ""}
            />
            <Button
                color="secondary"
                variant="contained"
                id="add-swap-columns"
                className={classes.button}
                onClick={() => handleSwapColumns()}
                startIcon={<Add />}
            >Add</Button>
        </div>
    );
};

export default SwapColumnsTool;
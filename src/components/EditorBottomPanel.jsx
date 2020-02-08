import React from "react";
import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "rgb(33, 33, 33)",
        height: "18px",
        color: "rgba(255, 255, 255, 0.7)",
        padding: "1px 20px",
        display: "flex",
        alignItems: "stretch",
        flexWrap: "nowrap",
        flexDirection: "row-reverse",
        fontSize: "13px",
        borderRadius: "0px",
    },
    enabled: {
        color: "green",
    },
    disabled: {
        color: "#bf001d",
    },
}));

const EditorBottomPanel = React.memo(({wrap}) => {
    const classes = useStyles();

    return (
        <Paper elevation={7} className={classes.root}>
            <span>Wrap: {wrap ? <span className={classes.enabled}>Enabled</span> : <span className={classes.disabled}>Disabled</span>}</span>
        </Paper>
    );
});

export default EditorBottomPanel;
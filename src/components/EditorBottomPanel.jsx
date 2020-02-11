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
    item: {
        marginLeft: "15px",
    },
    enabled: {
        color: "green",
    },
    disabled: {
        color: "#bf001d",
    },
    violet: {
        color: "#e35d14",
    },
}));

const EditorBottomPanel = React.memo(({wrap, inspectMode}) => {
    const classes = useStyles();

    return (
        <Paper elevation={7} className={classes.root}>
            <span className={classes.item}>Wrap: {wrap ? <span className={classes.enabled}>Enabled</span> : <span className={classes.disabled}>Disabled</span>}</span>
            <span className={classes.item}>Mode: <span className={classes.violet}>{ inspectMode ? "Inspect" : "Auto" }</span></span>
        </Paper>
    );
});

export default EditorBottomPanel;
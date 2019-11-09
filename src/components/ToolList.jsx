import React from "react";
import { List, ListItem, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Build } from "@material-ui/icons"

const useStyles = makeStyles(theme => ({
    root: {
        height: "250px",
        width: "95%",
        marginTop: "20px",
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: theme.palette.background.paper,
        color: "white",
    },
    title: {
        textTransform: "uppercase",
        fontSize: "14px",
        backgroundColor: grey[900],
        textAlign: "center",
        padding: "10px",
        color: "#039be5",
        letterSpacing: "0.02857em",
        boxShadow: "0px 4px 4px -1px rgba(0,0,0,0.2)",
    },
    titleLabel: {
        marginTop: "5px",
    },
    list: {
        marginLeft: "10px",
        marginRight: "10px",
    },
    content: {
        height: "182px",
        overflow: "auto",

    },
    toolName: {
        color: "#ff6a1a",
        fontWeight: "bold",
        marginRight: "10px",
    }
}));

function ToolList(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Build />
                <div className={classes.titleLabel}>Pipeline</div>
            </div>
            <div className={classes.content}>
            <List component="ul" className={classes.list}>
                {props.tools.map((tools) =>
                <ListItem button key={tools.id}>
                    <span className={classes.toolName}>{tools.tool}</span> {tools.pattern}
                </ListItem>
                )}
            </List>
            </div>
        </div>
    );
}

export default ToolList;
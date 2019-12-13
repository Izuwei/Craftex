import React from "react";
import { List, ListItem, makeStyles, IconButton } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Build, Delete } from "@material-ui/icons"

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
        height: "48px",
        textTransform: "uppercase",
        fontSize: "14px",
        backgroundColor: grey[900],
        textAlign: "center",
        padding: "10px",
        color: "rgba(255, 255, 255, 0.7)",
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
    },
    conword: {
        color: "#b500d1",
        fontWeight: "bold",
        marginRight: "10px",
        marginLeft: "10px",
    },
    deleteIcon: {
        marginRight: "15px",
        color: "#e0e0e0",
    },
}));

function ToolList(props) {
    const classes = useStyles();

    const mapTool = (tool) => {
        switch (tool.tool) {
            case "Match":
                return (
                    <ListItem key={tool.id}>
                        <IconButton className={classes.deleteIcon} size="small" onClick={() => props.removeTool(tool)}>
                            <Delete />
                        </IconButton>
                            <span className={classes.toolName}>{tool.tool}</span> 
                            {tool.pattern}
                    </ListItem>
                );
            case "Replace":
                return (
                    <ListItem key={tool.id}>
                        <IconButton className={classes.deleteIcon} size="small" onClick={() => props.removeTool(tool)}>
                            <Delete />
                        </IconButton>
                            <span className={classes.toolName}>{tool.tool}</span> 
                            {tool.find}
                            <span className={classes.conword}>with</span> 
                            {tool.replace}
                    </ListItem>
                );
            default:
                return;
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Build />
                <div className={classes.titleLabel}>Pipeline</div>
            </div>
            <div className={classes.content}>
            <List component="ul" className={classes.list}>
                {props.tools.map((tool) =>
                    mapTool(tool)
                )}
            </List>
            </div>
        </div>
    );
}

export default ToolList;
import React from "react";
import { List, ListItem, makeStyles, IconButton } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Build, Delete, Visibility, VisibilityOff } from "@material-ui/icons";
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

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
    listItem: {
        paddingTop: "0px",
        paddingBottom: "0px",
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
    toolText: {
        paddingTop: "13px",
        paddingBottom: "13px",
        height: "100%",
        width: "100%",
    },
    conword: {
        color: "#b500d1",
        fontWeight: "bold",
        marginRight: "10px",
        marginLeft: "10px",
    },
    listIcon: {
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
                    <React.Fragment>
                            <span className={classes.toolName}>{tool.tool}</span> 
                            {tool.pattern}
                    </React.Fragment>
                );
            case "Replace":
                return (
                    <React.Fragment>
                            <span className={classes.toolName}>{tool.tool}</span> 
                            {tool.find}
                            <span className={classes.conword}>with</span> 
                            {tool.replace}
                    </React.Fragment>
                );
            default:
                return;
        }
    }

    const DragHandle = SortableHandle(({tool}) => (
        <div className={classes.toolText}>
          {mapTool(tool)}
        </div>
      ));

    const SortableItem = SortableElement(({ tool }) => (
        <ListItem key={tool.id} ContainerComponent="li" divider={true} className={classes.listItem}>
            <IconButton className={classes.listIcon} size="small" onClick={() => props.removeTool(tool)}>
                <Delete />
            </IconButton>
            <IconButton className={classes.listIcon} size="small" onClick={() => props.reactiveTool(tool)}>
                {tool.active ? <Visibility /> : <VisibilityOff />}
            </IconButton>
              <DragHandle tool={tool}/>
        </ListItem>
    ));

    const SortableListContainer = SortableContainer(({ tools }) => (
        <List component="ul" className={classes.list}>
                {tools.map((tool, index) => (
                    <SortableItem key={tool.id} index={index} tool={tool} />
                ))}
        </List>
    ));

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Build />
                <div className={classes.titleLabel}>Pipeline</div>
            </div>
            <div className={classes.content}>
            <SortableListContainer
                tools={props.tools}
                lockAxis='y'
                useDragHandle={true}
                updateBeforeSortStart={props.beforeSort}
                onSortEnd={props.sort}
            />
            </div>
        </div>
    );
}

export default ToolList;
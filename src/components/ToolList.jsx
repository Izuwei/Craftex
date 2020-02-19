import React, { useState, useRef } from "react";
import { List, ListItem, makeStyles, IconButton, Menu, MenuItem, Tooltip, useTheme, useMediaQuery } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Build, Delete, Visibility, VisibilityOff, Edit, MoreVert } from "@material-ui/icons";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import EditDialog from "./EditDialog";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Resizable } from "re-resizable";

const useStyles = makeStyles(theme => ({
    root: {
        height: "250px",
        //width: "95%",
        minWidth: "95%",
        maxWidth: "95%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "rgb(50,50,50)",
        color: "white",
        borderBottom: "1px solid rgb(30, 30, 30)",
    },
    fullWidth: {
        width: "100% !important",
        minWidth: "100% !important",
        maxWidth: "100% !important",
    },
    title: {
        height: "22px",
        fontWeight: "500",
        textTransform: "uppercase",
        fontSize: "14px",
        backgroundColor: grey[900],
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        color: "rgba(255, 255, 255, 0.7)",
        letterSpacing: "0.02857em",
        boxShadow: "0px 4px 4px -1px rgba(0,0,0,0.2)",
    },
    titleLabel: {
        fontSize: "15px",
    },
    list: {
        marginLeft: "10px",
        marginRight: "10px",
    },
    listItem: {
        paddingTop: "0px",
        paddingBottom: "0px",
    },
    itemDeactivated: {
        color: "grey !important",
    },
    content: {
        //height: "208px",
        overflow: "auto",
        flexGrow: "1",
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
        cursor: "grab",
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

const ToolList = React.memo(( { tools, removeTool, reactiveTool, updateTool, sort }) => {
    const classes = useStyles();
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const theme = useTheme();   // useMediaQuery
    const fullWidth = useMediaQuery(theme.breakpoints.down("sm"));

    const toolToEdit = useRef({});

    const openEdit = (tool) => {
        toolToEdit.current = tool;
        setOpenEditDialog(true);
    }

    const closeEdit = () => {
        setOpenEditDialog(false);
    }

    const mapTool = (tool) => {
        switch (tool.toolname) {
            case "Match":
                return (
                    <React.Fragment>
                            <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Match</span> 
                            {tool.pattern}
                    </React.Fragment>
                );
            case "replace":
                return (
                    <React.Fragment>
                            <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Replace</span> 
                            {tool.find}
                            <span className={`${classes.conword} ${!(tool.active) && classes.itemDeactivated}`}>with</span> 
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
        <ListItem key={tool.id} ContainerComponent="li" divider={true} className={`${classes.listItem} ${!(tool.active) && classes.itemDeactivated}`}>
            <PopupState variant="popover" popupId="demo-popup-menu">
                {properties => (
                    <React.Fragment>
                        <Tooltip title="Properties">
                            <IconButton 
                                className={classes.listIcon} 
                                variant="contained" 
                                size="small" 
                                {...bindTrigger(properties)}
                            >
                                <MoreVert />
                            </IconButton>
                        </Tooltip>
                        <Menu {...bindMenu(properties)}>
                            <MenuItem onClick={() => openEdit(tool)}>
                                <Edit className={classes.listIcon} /> Edit
                            </MenuItem>
                            <MenuItem onClick={() => reactiveTool(tool)}>
                                {tool.active ? 
                                    (<React.Fragment> <VisibilityOff className={classes.listIcon} /> Deactivate </React.Fragment>) : 
                                    (<React.Fragment> <Visibility className={classes.listIcon} /> Activate </React.Fragment>)}
                            </MenuItem>
                            <MenuItem onClick={() => removeTool(tool)}>
                                <Delete className={classes.listIcon} /> Delete
                            </MenuItem>
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
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
        <Resizable 
            className={`${classes.root} ${fullWidth && classes.fullWidth}`}
            defaultSize={{ width: "95%", height: "250px" }}
            minHeight={100}
            enable={{ top:false, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
        >
            <div className={classes.title}>
                <Build style={{fontSize: "22px", paddingLeft: "5px"}}/>
                <div className={classes.titleLabel}>Pipeline</div>
                <div />
            </div>
            <div className={classes.content}>
                <SortableListContainer
                    tools={tools}
                    lockAxis='y'
                    useDragHandle={true}
                    onSortEnd={sort}
                    helperClass={"SortableHelper"}
                />
            </div>
            {openEditDialog && 
                <EditDialog 
                    open={openEditDialog}
                    close={closeEdit}
                    tool={toolToEdit.current}
                    updateTool={updateTool}
            />}
        </Resizable>
    );
});

export default ToolList;
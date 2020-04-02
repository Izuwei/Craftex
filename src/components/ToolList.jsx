import React, { useState, useRef } from "react";
import { List, ListItem, makeStyles, IconButton, Menu, MenuItem, Tooltip, useTheme, useMediaQuery } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Settings, Delete, Visibility, VisibilityOff, Edit, MoreVert } from "@material-ui/icons";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import EditDialog from "./Edits/EditDialog";
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
        color: "#ff5d00",
        fontWeight: "bold",
        marginRight: "8px",
    },
    toolText: {
        paddingTop: "13px",
        paddingBottom: "13px",
        height: "100%",
        width: "100%",
        cursor: "grab",
    },
    violetWord: {
        color: "#b500d1",
        fontWeight: "bold",
    },
    lightGreenWord: {
        color: "#a4ad00",
        fontWeight: "bold",
    },
    greenWord: {
        color: "#22ba09",
        fontWeight: "bold",
    },
    blueWord: {
        color: "#089dcf",
        fontWeight: "bold",
    },
    lightBlueWord: {
        color: "#0fbbff",
        fontWeight: "bold",
    },
    yellowWord: {
        color: "#ffcc00",
        fontWeight: "bold",
    },
    darkYellowWord: {
        color: "#ffb700",
        fontWeight: "bold",
    },
    redWord: {
        color: "#bd0032",
        fontWeight: "bold",
    },
    lightRedWord: {
        color: "#ff0a68",
        fontWeight: "bold",
    },
    greenBlueWord: {
        color: "#00b87d",
        fontWeight: "bold",
    },
    turquoiseWord: {
        color: "#00b87d",
        fontWeight: "bold",
    },
    lightTurquoiseWord: {
        color: "#14db78",
        fontWeight: "bold",
    },
    listIcon: {
        marginRight: "15px",
        color: "#e0e0e0",
    },
    marginLR: {
        marginLeft: "8px",
        marginRight: "8px",
    },
}));

function mapComparator(comparator) {
    switch (comparator) {
        case "gt": return "greater than";
        case "ge": return "greater equal";
        case "lt": return "less than";
        case "le": return "less equal";
        case "eq": return "equal";
        default: return "";
    }
};

function mapCase(textCase) {
    switch (textCase) {
        case "uppercase": return "upper case";
        case "lowercase": return "lower case";
        default: return "";
    }
}

function mapFilterLinesContent(content) {
    switch (content) {
        case "empty":
            return "empty content";
        case "whiteChars":
            return "white characters";
        case "custom":
            return "custom content";
        default:
            return "";
    }
}

function mapUniqueVariant(variant) {
    switch (variant) {
        case "merge":
            return "merge";
        case "unique":
            return "unique only";
        case "duplicate":
            return "duplicate only";
        default:
            return "";
    }
}

function isEditable(tool) {
    const nonEditable = ["trim", "removeExtraSpaces"];
    
    return nonEditable.includes(tool.toolname) ? false : true;
}

const ToolList = React.memo(({ tools, removeTool, reactiveTool, updateTool, sort }) => {
    const classes = useStyles();
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const theme = useTheme();   // useMediaQuery
    const fullWidth = useMediaQuery(theme.breakpoints.down("sm"));

    const toolToEdit = useRef({});

    const openEdit = (tool) => {
        toolToEdit.current = tool;
        setOpenEditDialog(true);
    }

    const mapTool = (tool) => {
        switch (tool.toolname) {
            case "regexMatch":
            case "match":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>{tool.toolname === "match" ?  "Match" :"Regex match"}</span> 
                        <span className={`${classes.blueWord} ${!(tool.active) && classes.itemDeactivated}`} style={{marginRight: "8px"}}>{tool.occurrence}{tool.casesensitive === true ? " case sensitive" : " case isensitive"}</span>
                        {tool.expression}
                        {tool.inColumn === "" ? "" : 
                            <React.Fragment>
                                <span className={`${classes.blueWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>in</span>
                                {tool.inColumn + "."}
                                <span className={`${classes.blueWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>column delimited by</span>
                                {tool.delimiter}
                            </React.Fragment>
                        }
                    </React.Fragment>
                );
            case "regexReplace":
            case "replace":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>{tool.toolname === "replace" ?  "Replace" : "Regex replace"}</span>
                        <span className={`${classes.greenWord} ${!(tool.active) && classes.itemDeactivated}`} style={{marginRight: "8px"}}>{tool.occurrence}{tool.casesensitive === true ? " case sensitive" : " case isensitive"}</span>
                        {tool.find}
                        <span className={`${classes.greenWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>with</span> 
                        {tool.replace}
                        {tool.inColumn === "" ? "" : 
                            <React.Fragment>
                                <span className={`${classes.greenWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>in</span>
                                {tool.inColumn + "."}
                                <span className={`${classes.greenWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>column delimited by</span>
                                {tool.delimiter}
                            </React.Fragment>
                        }
                    </React.Fragment>
                );
            case "compare":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Compare</span>
                        <span className={`${classes.yellowWord} ${!(tool.active) && classes.itemDeactivated}`} style={{marginRight: "8px"}}>{mapComparator(tool.comparator)}</span>
                        {tool.value}
                        {tool.inColumn === "" ? "" : 
                            <React.Fragment>
                                <span className={`${classes.yellowWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>in</span>
                                {tool.inColumn + "."}
                                <span className={`${classes.yellowWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>column delimited by</span>
                                {tool.delimiter}
                            </React.Fragment>
                        }
                    </React.Fragment>
                );
            case "filterColumns":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Filter columns</span>
                        <span className={`${classes.violetWord} ${!(tool.active) && classes.itemDeactivated}`} style={{marginRight: "8px"}}>
                            {tool.variant + " "}
                            at
                        </span>
                        {tool.position + "."}
                        <span className={`${classes.violetWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>position delimited by</span> 
                        {tool.delimiter}
                    </React.Fragment>
                );
            case "filterLines":
                    return (
                        <React.Fragment>
                            <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Filter lines</span>
                            <span className={`${classes.greenBlueWord} ${!(tool.active) && classes.itemDeactivated}`}>with {tool.content === "custom" && (tool.casesensitive === true ? "case sensitive " : "case isensitive ")}{mapFilterLinesContent(tool.content)}</span>
                            {tool.content === "custom" && <span className={`${!(tool.active) && classes.itemDeactivated}`} style={{marginLeft: "8px"}}>
                                {tool.customContent}
                                {tool.column === "" ? "" : 
                                    <React.Fragment>
                                        <span className={`${classes.greenBlueWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>in</span>
                                        {tool.column + "."}
                                        <span className={`${classes.greenBlueWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>column delimited by</span>
                                        {tool.delimiter}
                                    </React.Fragment>
                                }
                            </span>}
                        </React.Fragment>
                    );
            case "cutLines":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Cut lines</span>
                        {tool.count}
                        <span className={`${classes.lightGreenWord} ${!(tool.active) && classes.itemDeactivated}`} style={{marginLeft: "8px"}}>{
                            tool.variant === "head" ? "from the beggining" : "from the end"
                        }</span>
                    </React.Fragment>
                );
            case "insertColumn":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Insert column</span>
                        <span className={`${classes.turquoiseWord} ${!(tool.active) && classes.itemDeactivated}`} style={{marginRight: "8px"}}>starting with</span>
                        {tool.content.split('\n')[0] + "..."}
                        <span className={`${classes.turquoiseWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>at</span>
                        {tool.position + "."}
                        <span className={`${classes.turquoiseWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>position delimited by</span> 
                        {tool.delimiter}
                    </React.Fragment>
                );
            case "swapColumns":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Swap columns</span>
                        <span className={`${classes.lightTurquoiseWord} ${!(tool.active) && classes.itemDeactivated}`} style={{marginRight: "8px"}}>at</span>
                        {tool.first + "."}
                        <span className={`${classes.lightTurquoiseWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>and</span>
                        {tool.second + "."}
                        <span className={`${classes.lightTurquoiseWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>position delimited by</span> 
                        {tool.delimiter}
                    </React.Fragment>
                );
            case "convertCase":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Convert case</span>
                        <span className={`${classes.redWord} ${!(tool.active) && classes.itemDeactivated}`} style={{marginRight: "8px"}}>to</span>
                        {mapCase(tool.textCase)}
                    </React.Fragment>
                );
            case "trim":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Trim</span>
                    </React.Fragment>
                );
            case "removeExtraSpaces":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Remove extra spaces</span>
                    </React.Fragment>
                );
            case "sort":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Sort</span>
                        <span className={`${classes.lightBlueWord} ${!(tool.active) && classes.itemDeactivated}`}>
                            {tool.order}
                            {tool.casesensitive === true ? " case sensitive " : " case isensitive "}
                            {tool.ignoreLeadingBlanks === true ? " ignoring leading blanks" : ""}
                        </span>
                    </React.Fragment>
                );
            case "reverse":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Reverse</span>
                        <span className={`${classes.redWord} ${!(tool.active) && classes.itemDeactivated}`}>{tool.direction}</span>
                    </React.Fragment>
                );
            case "unique":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Unique</span>
                        <span className={`${classes.lightRedWord} ${!(tool.active) && classes.itemDeactivated}`}>
                            {tool.casesensitive === true ? "case sensitive " : "case isensitive "}
                            {mapUniqueVariant(tool.variant)}
                            {tool.variant === "merge" && tool.countPrefix === true ? " with count prefix" : ""}
                        </span>
                    </React.Fragment>
                );
            case "lineNumbers":
                return (
                    <React.Fragment>
                        <span className={`${classes.toolName} ${!(tool.active) && classes.itemDeactivated}`}>Line numbers</span>
                        <span className={`${classes.darkYellowWord} ${!(tool.active) && classes.itemDeactivated}`} style={{marginRight: "8px"}}>{tool.variant + " starting with"}</span>
                        {tool.startingNumber}
                        <span className={`${classes.darkYellowWord} ${!(tool.active) && classes.itemDeactivated} ${classes.marginLR}`}>after that</span>
                        {tool.delimiter}
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
                            {isEditable(tool) &&
                                <MenuItem onClick={() => openEdit(tool)}>
                                    <Edit className={classes.listIcon} /> Edit
                                </MenuItem>
                            }
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
                <Settings style={{fontSize: "22px", paddingLeft: "5px"}}/>
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
                    close={() => setOpenEditDialog(false)}
                    tool={toolToEdit.current}
                    updateTool={updateTool}
            />}
        </Resizable>
    );
});

export default ToolList;
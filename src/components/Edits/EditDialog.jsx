import React, { useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, useMediaQuery, Tooltip, makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Done, Close, Settings } from "@material-ui/icons";
import { green, lightBlue } from "@material-ui/core/colors";
import EditMatch from "./Tools/EditMatch";
import EditRegexMatch from "./Tools/EditRegexMatch";
import EditReplace from "./Tools/EditReplace";
import EditRegexReplace from "./Tools/EditRegexReplace";
import EditCompare from "./Tools/EditCompare";
import EditRemoveColumn from "./Tools/EditRemoveColumn";
import EditFilterLines from "./Tools/EditFilterLines";
import EditCutLines from "./Tools/EditCutLines";
import EditInsertColumn from "./Tools/EditInsertColumn";
//import EditReverse from "./Tools/EditReverse";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: lightBlue[800],
            light: lightBlue[600],
            dark: lightBlue[900],
          },
        secondary: {
            main: green[800],
            light: green[200],
            dark: green[900],
        },
        type: "dark",
    },
});

const useStyles = makeStyles(theme => ({
    title: {
        borderBottom: "solid 1px grey",
        marginBottom: "15px",
        paddingBottom: "8px",
        color: "#039be5",
    },
    titleIcon: {
        marginRight: "15px",
        color: "#039be5",
    },
    dialogActions: {
        paddingTop: "0px",
    },
    confirmIcon: {
        color: "#43a047",
    },
    closeIcon: {
        color: "red",
    },
}));

function EditDialog(props) {
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

    const toolRef = useRef();

    const mapToolname = (tool) => {
        switch (tool.toolname) {
            case "match": return "Match";
            case "regexMatch": return "Regex match";
            case "replace": return "Replace";
            case "regexReplace": return "Regex replace";
            case "compare": return "Compare";
            case "removeColumn": return "Remove column";
            case "filterLines": return "Filter lines";
            case "cutLines": return "Cut lines";
            case "insertColumn": return "Insert column";
            //case "reverse": return "Reverse";
            default: return;
        }
    };

    /**
     * Vypis html kontextu podle zvoleneho nastroje
    */
    const mapToolContent = (tool) => {
        switch (tool.toolname) {
            case "match":
                return (
                    <EditMatch ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
            case "regexMatch":
                return (
                    <EditRegexMatch ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
            case "replace":
                return (
                    <EditReplace ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
            case "regexReplace":
                return (
                    <EditRegexReplace ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
            case "compare":
                return (
                    <EditCompare ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
            case "removeColumn":
                return (
                    <EditRemoveColumn ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
            case "filterLines":
                return (
                    <EditFilterLines ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
            case "cutLines":
                return (
                    <EditCutLines ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
            case "insertColumn":
                return (
                    <EditInsertColumn ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
            /*case "reverse":
                return (
                    <EditReverse ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );*/
            default:
                return;
        }
    };
    
    return (
        <MuiThemeProvider theme={theme}>
        <Dialog
            open={props.open}
            onClose={props.close}
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth = "md"
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle className={classes.title} id="responsive-dialog-title">
                <Settings className={classes.titleIcon} fontSize="large" />
                {mapToolname(props.tool)}
            </DialogTitle>
            <DialogContent>
                {mapToolContent(props.tool)}
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Tooltip className={classes.tooltip} title="Close">
                    <IconButton className={classes.closeIcon} onClick={() => props.close()}>
                        <Close fontSize="large"/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Confirm">
                    <IconButton className={classes.confirmIcon} onClick={() => toolRef.current.handleUpdate()}>
                        <Done fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </DialogActions>
        </Dialog>
        </MuiThemeProvider>
    );
}

export default EditDialog;
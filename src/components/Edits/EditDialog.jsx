import React, { useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, useMediaQuery, Tooltip, makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Done, Close, Settings } from "@material-ui/icons";
import { green, lightBlue } from "@material-ui/core/colors";
import EditMatch from "./Tools/EditMatch";
import EditRegexMatch from "./Tools/EditRegexMatch";
import EditReplace from "./Tools/EditReplace";
import EditRegexReplace from "./Tools/EditRegexReplace";
import EditRemoveColumn from "./Tools/EditRemoveColumn";

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
            case "match": return (<React.Fragment>Match</React.Fragment>);
            case "regexMatch": return (<React.Fragment>Regex match</React.Fragment>);
            case "replace": return (<React.Fragment>Replace</React.Fragment>);
            case "regexReplace": return (<React.Fragment>Regex replace</React.Fragment>);
            case "removeColumn": return (<React.Fragment>Remove column</React.Fragment>);
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
            case "removeColumn":
                return (
                    <EditRemoveColumn ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                );
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
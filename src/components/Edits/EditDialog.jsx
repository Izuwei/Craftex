import React, { useRef } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, useMediaQuery, Tooltip, makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { Done, Close, Settings } from "@material-ui/icons";
import { green, lightBlue } from "@material-ui/core/colors";
import EditReplace from "./Tools/EditReplace";

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

    /**
     * Vypis html kontextu podle zvoleneho nastroje
    */
    const mapToolContent = (tool) => {
        switch (tool.toolname) {
            case "Match":
                return (
                    <React.Fragment>
                         TBD
                    </React.Fragment>
                );
            case "replace":
                return (
                    <EditReplace ref={toolRef} updateTool={props.updateTool} tool={props.tool} close={props.close} />
                    /*<React.Fragment>
                            <TextField
                            id="edit-replace-find"
                            label="Find"
                            value={editedTool.find}
                            onChange={event => replaceFindOnChange(event.target.value)}
                            error={errors.replaceFind === true}
                            helperText={errors.replaceFind === true ? 'Field cannot be empty!' : ' '}
                            fullWidth
                        />
                        <TextField
                            id="edit-replace-replace"
                            label="Replace"
                            value={editedTool.replace}
                            onChange={event => replaceReplaceOnChange(event.target.value)}
                            error={errors.replaceReplace === true}
                            helperText={errors.replaceReplace === true ? 'Field cannot be empty!' : ' '}
                            fullWidth
                        />
                    </React.Fragment>*/
                );
            default:
                return;
        }
    }
/*
    const confirm = (tool) => {
        switch (tool.toolname) {
            case "Match":
                if (validateMatch(editedTool)) {
                    props.updateTool(editedTool);
                    props.close();
                }
                break;
            case "replace":
                if (validateReplace(editedTool)) {
                    props.updateTool(editedTool);
                    props.close();
                }
                break;
            default:
                return;
        }
    }*/
    
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
                {props.tool.toolname}
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
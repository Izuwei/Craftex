import React, { useState } from 'react';
import { Dialog, TextField, DialogTitle, DialogContent, DialogActions, IconButton, useMediaQuery, Tooltip, makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { Done, Close, Edit } from '@material-ui/icons';
import { green, lightBlue } from '@material-ui/core/colors';

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
        type: 'dark',
    },
});

const useStyles = makeStyles(theme => ({
    title: {
        borderBottom: "solid 1px grey",
        marginBottom: "15px",
        fontSize: "500px",
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
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [editedTool, setEditedTool] = useState(props.tool);
    const [errors, setErrors] = useState([]);

    /**
     * Match
    */
    const matchOnChange = (value) => {
        setEditedTool({...editedTool, pattern: value});
        setErrors([]);
    }

    const validateMatch = () => {
        if (editedTool.pattern === "") {
            setErrors({...errors, matchExpression: true});
            return false;
        }
        else
            return true;
    }

    /**
     * Replace
    */
    const replaceFindOnChange = (value) => {
        setEditedTool({...editedTool, find: value});
        setErrors({...errors, replaceFind: false});
    }

    const replaceReplaceOnChange = (value) => {
        setEditedTool({...editedTool, replace: value});
        setErrors({...errors, replaceReplace: false});
    }

    const validateReplace = () => {
        if (editedTool.find === "" && editedTool.replace === ""){
            setErrors({...errors, replaceFind: true, replaceReplace: true});
        }
        else if (editedTool.find === ""){
            setErrors({...errors, replaceFind: true, replaceReplace: false});
        }
        else if (editedTool.replace === ""){
            setErrors({...errors, replaceFind: false, replaceReplace: true});
        }

        if (editedTool.find !== "" && editedTool.replace !== "") {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Vypis html kontextu podle zvoleneho nastroje
    */
    const mapToolContent = (tool) => {
        switch (tool.tool) {
            case "Match":
                return (
                    <React.Fragment>
                         <TextField
                            id="edit-match-expression"
                            label="Expression"
                            value={editedTool.pattern}
                            onChange={event => matchOnChange(event.target.value)}
                            error={errors.matchExpression === true}
                            helperText={errors.matchExpression === true ? 'Expression cannot be empty!' : ' '}
                            fullWidth
                        />
                    </React.Fragment>
                );
            case "Replace":
                return (
                    <React.Fragment>
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
                    </React.Fragment>
                );
            default:
                return;
        }
    }

    const confirm = (tool) => {
        switch (tool.tool) {
            case "Match":
                if (validateMatch(editedTool)) {
                    props.updateTool(editedTool);
                    props.close();
                }
                break;
            case "Replace":
                if (validateReplace(editedTool)) {
                    props.updateTool(editedTool);
                    props.close();
                }
                break;
            default:
                return;
        }
    }
    
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
                <Edit className={classes.titleIcon} fontSize="large" />
                {props.tool.tool}
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
                    <IconButton className={classes.confirmIcon} onClick={() => confirm(props.tool)}>
                        <Done fontSize="large"/>
                    </IconButton>
                </Tooltip>
            </DialogActions>
        </Dialog>
        </MuiThemeProvider>
    );
}

export default EditDialog;
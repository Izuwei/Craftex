import React from "react";
import { Dialog, Tooltip, useTheme, makeStyles, DialogTitle, DialogContent, useMediaQuery, MuiThemeProvider, DialogContentText } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from "@material-ui/icons/Close";
import shellGenerator from "../scripts/shellGenerator";

const useStyles = makeStyles(theme => ({
    title: {
        color: "#ff9408",
    },
    content: {
        marginBottom: "20px",
    },
    textContent: {
        color: "white",
        marginBottom: "0px",
    },
    closeButton: {
        position: 'absolute',
        right: "10px",
        top: "10px",
        color: "rgba(255, 255, 255, 0.7)",
    },
}));

function ShellDialog(props) {    // TODO: dodelat (ikonky, stylyzace)
    const classes = useStyles();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    
    return (
        <MuiThemeProvider theme={theme}>
        <Dialog
            open={props.open}
            onClose={props.close}
            fullScreen={fullScreen}
            fullWidth={true}
            scroll={"paper"}
            maxWidth = "md"
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle className={classes.title} id="responsive-dialog-title">
                Shell script
                <Tooltip title={"Close"}>
                    <IconButton aria-label="close" className={classes.closeButton} onClick={props.close}>
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </DialogTitle>
            <DialogContent dividers className={classes.content}>
                <DialogContentText
                    className={classes.textContent}
                    id="scroll-dialog-text"
                    tabIndex={-1}
                >
                    {shellGenerator(props.pipeline)}
                </DialogContentText>
            </DialogContent>
        </Dialog>
        </MuiThemeProvider>
    );
}

export default ShellDialog;
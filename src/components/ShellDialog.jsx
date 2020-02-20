import React from 'react';
import { Dialog, useTheme, DialogTitle, DialogContent, useMediaQuery, MuiThemeProvider, DialogContentText } from '@material-ui/core';
import { Settings } from '@material-ui/icons';

function EditDialog(props) {    // TODO: dodelat tohle a predelat nazvy v toolbaru z inspect na pipeline
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
            <DialogTitle id="responsive-dialog-title">
                <Settings />
                Shell script
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText
                    id="scroll-dialog-description"
                    tabIndex={-1}
                >
                    TBD
                </DialogContentText>
            </DialogContent>
        </Dialog>
        </MuiThemeProvider>
    );
}

export default EditDialog;
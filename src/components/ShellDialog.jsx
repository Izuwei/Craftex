import React, { useState } from 'react';
import { Dialog, useTheme, DialogTitle, DialogContent, useMediaQuery, makeStyles, MuiThemeProvider, DialogContentText } from '@material-ui/core';
import { Close, Settings } from '@material-ui/icons';

function EditDialog(props) {
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
                    asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
            asdasdasdsdaasdasdasdsdaasdasdasdsdaasdasdasdsda
                </DialogContentText>
            </DialogContent>
        </Dialog>
        </MuiThemeProvider>
    );
}

export default EditDialog;
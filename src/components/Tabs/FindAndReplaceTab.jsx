import React from 'react';
import { Grid, makeStyles, Typography, MuiThemeProvider, createMuiTheme, Divider } from '@material-ui/core';
import { green, lightBlue } from '@material-ui/core/colors';
import Replace from "./Tools/Replace";

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
    toolName: {
        color: '#d9d9d9',
        fontWeight: 'bold',
        marginBottom: "5px",
    },
    divider: {
	    margin: "20px 0",
	},
}));

function FindAndReplaceTab(props){
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.toolName}>Replace</Typography>
                    <Replace addTool={props.addTool} showAlert={props.showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                
            </Grid>
        </MuiThemeProvider>
    );
}

export default FindAndReplaceTab;
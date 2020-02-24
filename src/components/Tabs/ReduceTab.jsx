import React from "react";
import { Grid, Typography, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { green, lightBlue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";
import RemoveColumnTool from "./Tools/RemoveColumn";

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

const ReduceTab = React.memo(({ classes, addTool, showAlert }) => {

    return (
        <MuiThemeProvider theme={theme}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.toolName}>Remove column</Typography>
                    <RemoveColumnTool addTool={addTool} showAlert={showAlert} />
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(ReduceTab);
import React from "react";
import { Grid, Typography, MuiThemeProvider, createMuiTheme, Divider } from "@material-ui/core";
import { green, lightBlue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";
import Replace from "./Tools/Replace";
import RegexReplace from "./Tools/RegexReplace";

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

const FindAndReplaceTab = React.memo(({ classes, addTool, showAlert }) => {

    return (
        <MuiThemeProvider theme={theme}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.toolName}>Replace</Typography>
                    <Replace addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.toolName}>Regex replace</Typography>
                    <RegexReplace addTool={addTool} showAlert={showAlert} />
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(FindAndReplaceTab);
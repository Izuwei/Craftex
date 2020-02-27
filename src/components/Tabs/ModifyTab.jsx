import React from "react";
import { Grid, MuiThemeProvider, createMuiTheme, Typography, Divider } from "@material-ui/core";
import { green, lightBlue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";
import InsertColumn from "./Tools/InsertColumn";
import SwapColumns from "./Tools/SwapColumns";
import ConvertCase from "./Tools/ConvertCase";
//import Reverse from "./Tools/Reverse";

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

const ModifyTab = React.memo(({ classes, addTool, showAlert }) => {

    return (
        <MuiThemeProvider theme={theme}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.toolName}>Insert column</Typography>
                    <InsertColumn addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.flexToolbox}>
                        <div className={classes.flexTool}>
                            <Typography variant="h5" className={classes.toolName}>Swap columns</Typography>
                            <SwapColumns addTool={addTool} showAlert={showAlert} />
                        </div>
                        <div className={classes.flexTool}>
                            <Typography variant="h5" className={classes.toolName}>Convert case</Typography>
                            <ConvertCase addTool={addTool} showAlert={showAlert} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(ModifyTab);
import React from "react";
import { Grid, Typography, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { green, lightBlue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";
import RemoveColumn from "./Tools/RemoveColumn";
import RemoveLines from "./Tools/RemoveLines";

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
                    <div className={classes.flexToolbox}>
                        <div className={classes.flexTool}>
                            <Typography variant="h5" className={classes.toolName}>Remove column</Typography>
                            <RemoveColumn addTool={addTool} showAlert={showAlert} />
                        </div>
                        <div className={classes.flexTool}>
                            <Typography variant="h5" className={classes.toolName}>Remove lines</Typography>
                            <RemoveLines addTool={addTool} showAlert={showAlert} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(ReduceTab);
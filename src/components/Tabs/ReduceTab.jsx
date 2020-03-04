import React from "react";
import { Grid, Typography, MuiThemeProvider, createMuiTheme, Divider } from "@material-ui/core";
import { green, lightBlue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";
import FilterColumns from "./Tools/FilterColumns";
import FilterLines from "./Tools/FilterLines";
import CutLines from "./Tools/CutLines";
import Trim from "./Tools/Trim";
import RemoveExtraSpaces from "./Tools/RemoveExtraSpaces";
import Unique from "./Tools/Unique";

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
                    <Typography variant="h5" className={classes.toolName}>Unique</Typography>
                    <Unique addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.toolName}>Filter columns</Typography>
                    <FilterColumns addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.toolName}>Filter lines</Typography>
                    <FilterLines addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.toolName}>Cut lines</Typography>
                    <CutLines addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Typography variant="h5" className={classes.toolName} display="inline" style={{flex: 1}}>Remove extra spaces</Typography>
                        <RemoveExtraSpaces addTool={addTool} showAlert={showAlert} />
                    </div>
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Typography variant="h5" className={classes.toolName} display="inline" style={{flex: 1}}>Trim</Typography>
                        <Trim addTool={addTool} showAlert={showAlert} />
                    </div>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(ReduceTab);
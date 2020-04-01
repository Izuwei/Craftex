import React from "react";
import { Grid, MuiThemeProvider, createMuiTheme, Divider } from "@material-ui/core";
import { green, lightBlue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";
import ToolHeader from "./ToolHeader";
import Match from "./Tools/Match";
import RegexMatch from "./Tools/RegexMatch";
import Compare from "./Tools/Compare";

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

const FindTab = React.memo(({ classes, addTool, showAlert }) => {

    return (
        <MuiThemeProvider theme={theme}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12}>
                    <ToolHeader toolname="Match" description={
                        <React.Fragment>
                            <p>Searches for <b>pattern</b> in each line independently. If line contains specified text, then is preproduced to the output.</p>
                            <h4>Options:</h4>
                            <ul>
                                <li><b>Occurrence -</b> specifies which occurrence is matched. <b>First</b> will match only first line from start, other matches are ignored. Otherwise <b>All</b> match every corresponding line.</li>
                                <li><b>Case -</b> specify match that is sensitive to capitalization of letters.</li>
                                <li><b>Column - </b> sets a column specifically for pattern search. Text out of specified column is ignored. This option is <b>optional</b>.</li>
                                <li><b>Delimiter -</b> sets separator between cloumns. This option is required only if <b>Column</b> option is set.</li>
                            </ul>
                        </React.Fragment>
                    } 
                />
                    <Match addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Regex match" description={
                            <React.Fragment>
                                <p>Searches with <b>regular expression</b> in each line independently. If line contains expression, then is preproduced to the output.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Occurrence -</b> specifies which occurrence is matched. <b>First</b> will match only first line from start, other matches are ignored. Otherwise <b>All</b> match every corresponding line.</li>
                                    <li><b>Case -</b> specify match that is sensitive to capitalization of letters.</li>
                                    <li><b>Column - </b> sets a column specifically for regular expression search. Text out of specified column is ignored. This option is <b>optional</b>.</li>
                                    <li><b>Delimiter -</b> sets separator between cloumns. This option is required only if <b>Column</b> option is set.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <RegexMatch addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Compare" description={
                            <React.Fragment>
                                <p>Compare each line with <b>requested value</b>. If comparison matches <b>comparator</b>, then line is preproduced to the output. The comparison is made on an <b>ASCII</b> basis.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Comparator -</b> Specifies mathematical comparison.</li>
                                    <li><b>Column - </b> sets a column specifically for comparison. Text out of specified column is ignored. This option is <b>optional</b>.</li>
                                    <li><b>Delimiter -</b> sets separator between cloumns. This option is required only if <b>Column</b> option is set.</li>
                                </ul>
                            </React.Fragment>
                        }
                    />
                    <Compare addTool={addTool} showAlert={showAlert} />
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(FindTab);
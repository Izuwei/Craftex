import React from "react";
import { Grid, MuiThemeProvider, createMuiTheme, Divider } from "@material-ui/core";
import { green, lightBlue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";
import ToolHeader from "./ToolHeader";
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
                    <ToolHeader toolname="Replace" description={
                            <React.Fragment>
                                <p>Searches for <b>pattern</b> in each line independently and replace them with <b>requested value</b>. The rest of the text remains unchanged.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Occurrence -</b> specifies which occurrence is replaced. <b>First</b> will replace only first match from start, other matches are ignored. Otherwise <b>All</b> replace every corresponding match.</li>
                                    <li><b>Case -</b> specify match that is sensitive to capitalization of letters.</li>
                                    <li><b>Column - </b> sets a column specifically for pattern search. Text out of specified column is ignored. This option is <b>optional</b>.</li>
                                    <li><b>Delimiter -</b> sets separator between cloumns. This option is required only if <b>Column</b> option is set.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <Replace addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Regex replace" description={
                            <React.Fragment>
                                <p>Searches with <b>regular expression</b> in each line independently and replace matches with <b>requested value</b>. The rest of the text remains unchanged.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Occurrence -</b> specifies which occurrence is replaced. <b>First</b> will replace only first match from start, other matches are ignored. Otherwise <b>All</b> replace every corresponding match.</li>
                                    <li><b>Case -</b> specify match that is sensitive to capitalization of letters.</li>
                                    <li><b>Column - </b> sets a column specifically for regular expression search. Text out of specified column is ignored. This option is <b>optional</b>.</li>
                                    <li><b>Delimiter -</b> sets separator between cloumns. This option is required only if <b>Column</b> option is set.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <RegexReplace addTool={addTool} showAlert={showAlert} />
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(FindAndReplaceTab);
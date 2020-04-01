import React from "react";
import { Grid, MuiThemeProvider, createMuiTheme, Divider } from "@material-ui/core";
import { green, lightBlue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";
import ToolHeader from "./ToolHeader";
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
                    <ToolHeader toolname="Unique" description={
                            <React.Fragment>
                                <p>Filter adjacent matching lines from input, writing to output.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Variant -</b> specifies tool behavior.<br /><b>Merge</b> matching lines are merged to the first occurrence. Unique does not detect repeated lines unless they are adjacent. You may want to sort the input first.<br /><b>Unique only</b> only print unique lines.<br /><b>Duplicate only</b> only print duplicate lines, one for each group.</li>
                                    <li><b>Case -</b> specify match that is sensitive to capitalization of letters.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <Unique addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Filter columns" description={
                            <React.Fragment>
                                <p>Removes or cuts a column from the input text.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Variant -</b> specifies tool behavior.<br /><b>Remove</b> removes a column from the text.<br /><b>Cut</b> cuts a column from the text.</li>
                                    <li><b>Position - </b> sets the column position to perform the operation. Numbering starts from 1.</li>
                                    <li><b>Delimiter -</b> sets separator between cloumns.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <FilterColumns addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Filter lines" description={
                            <React.Fragment>
                                <p>Removes lines from the input text.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Content -</b> sets the content of the row to be filtered.<br /><b>Empty</b> removes all lines without content.<br /><b>White characters</b> removes all lines containing white characters like spaces, tabs, etc.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <FilterLines addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Cut lines" description={
                            <React.Fragment>
                                <p>Cuts lines from the input text.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Variant -</b> specifies tool behavior.<br /><b>Head</b> cut lines from the beginning of the text.<br /><b>Tail</b> cut lines from the end of the text.</li>
                                    <li><b>Count - </b> sets the number of lines to be cutted.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <CutLines addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <ToolHeader toolname="Remove extra spaces" description={
                                <React.Fragment>
                                    <p>Removes all adjacent spaces from text and replace them with single space.</p>
                                </React.Fragment>
                            } 
                        />
                        <RemoveExtraSpaces addTool={addTool} showAlert={showAlert} />
                    </div>
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <ToolHeader toolname="Trim" description={
                                <React.Fragment>
                                    <p>Removes all leading and trailing spaces on each line.</p>
                                </React.Fragment>
                            } 
                        />
                        <Trim addTool={addTool} showAlert={showAlert} />
                    </div>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(ReduceTab);
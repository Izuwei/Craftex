import React from "react";
import { Grid, MuiThemeProvider, createMuiTheme, Divider } from "@material-ui/core";
import { green, lightBlue } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";
import ToolHeader from "./ToolHeader";
import InsertColumn from "./Tools/InsertColumn";
import SwapColumns from "./Tools/SwapColumns";
import ConvertCase from "./Tools/ConvertCase";
import Sort from "./Tools/Sort";
import Reverse from "./Tools/Reverse";
import LineNumbers from "./Tools/LineNumbers";

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
                    <ToolHeader toolname="Insert column" description={
                            <React.Fragment>
                                <p>Insert column with specified <b>content</b> on given position. The rest of the text remains unchanged.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Content -</b> specifies content of the new column.</li>
                                    <li><b>Position -</b> determines the position of the new column. Numbering starts from 1.</li>
                                    <li><b>Delimiter - </b> sets separator between cloumns.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <InsertColumn addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Sort" description={
                            <React.Fragment>
                                <p>Sort lines of text. The sort is made on an <b>ASCII</b> basis character by character from the beginning of line.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Order -</b> determines the order of sort.<br /><b>Ascending</b> is arranged from smallest to the largest value.<br /><b>Descending</b> is arranged from the largest value to the smallest.</li>
                                    <li><b>Case -</b> specify if sort is ignoring capitalization of letters.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <Sort addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Swap columns" description={
                            <React.Fragment>
                                <p>Swap columns in text on given positions. Numbering of positions starts from 1. The rest of the text remains unchanged.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>First position -</b> specifies the location of the first column.</li>
                                    <li><b>Second position -</b> specifies the location of the second column.</li>
                                    <li><b>Delimiter -</b> sets separator between cloumns.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <SwapColumns addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Line numbers" description={
                            <React.Fragment>
                                <p>Adds a line number to the begging of the line.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Variant -</b> determines on which lines the numbers will be added.<br /><b>Non empty</b> adds to all non-empty lines.<br /><b>All</b> add numbers to all lines.</li>
                                    <li><b>Starting number -</b> defines the starting number. This number is increasing by each next line. Default value is 1 if not specified.</li>
                                    <li><b>Delimiter -</b> sets content to be added after line number. Default is space if not specified.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <LineNumbers addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Reverse" description={
                            <React.Fragment>
                                <p>Reverse text from the inptut and prints to the output.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Variant -</b> sets the direction of rotation.<br /><b>Horizontal</b> each characters in line is reversed (from left to right).<br /><b>Vertical</b> reverse the order of lines (from top to bottom).</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <Reverse addTool={addTool} showAlert={showAlert} />
                    <Divider className={classes.divider} orientation="horizontal" variant="fullWidth" />
                </Grid>
                <Grid item xs={12}>
                    <ToolHeader toolname="Convert case" description={
                            <React.Fragment>
                                <p>Convert case of all letters in text.</p>
                                <h4>Options:</h4>
                                <ul>
                                    <li><b>Case -</b> defines case of letters.<br /><b>Upper case</b> converts a text to uppercase letters.<br /><b>Lower case</b> converts a text to lowercase letters.</li>
                                </ul>
                            </React.Fragment>
                        } 
                    />
                    <ConvertCase addTool={addTool} showAlert={showAlert} />
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(ModifyTab);
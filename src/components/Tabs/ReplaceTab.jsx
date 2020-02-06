import React, { useState } from 'react';
import { Paper, Grid, Button, makeStyles, Typography, TextField, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { green, lightBlue } from '@material-ui/core/colors';
import { Add } from '@material-ui/icons';

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
    button: {
        margin: theme.spacing(1),
    },
    paper: {
        padding: "10px",
        backgroundColor: '#333333',
        borderRadius: '0px',
    },
    textField: {
        flex: 1,
        marginRight: "5px",
    },
    flexContent: {
        display: "flex",
        alignItems: "center",
    },
    toolName: {
        color: '#d9d9d9',
        fontWeight: 'bold',
    },
}));

export default function ReplaceTab(props){
    const classes = useStyles();
    const [replaceFind, setReplaceFind] = useState("");
    const [replaceError, setReplaceFindError] = useState(false);
    const [replaceReplace, setReplaceReplace] = useState("");
    const [replaceReplaceError, setReplaceReplaceError] = useState(false);

    const onReplaceFindChange = (event) => {
        setReplaceFind(event.target.value);
        setReplaceFindError(false);
    }

    const onReplaceReplaceChange = (event) => {
        setReplaceReplace(event.target.value);
        setReplaceReplaceError(false);
    }

    const handleReplace = () => {
        if (replaceFind === ""){
            setReplaceFindError(true);
        }
        if (replaceReplace === ""){
            setReplaceReplaceError(true);
        }
        if (replaceFind !== "" && replaceReplace !== "") {
            setReplaceFindError(false);
            setReplaceReplaceError(false);
            props.addTool({tool: "Replace", find: replaceFind, replace: replaceReplace});
            props.showAlert("success", "Success: Replace added into the pipeline.");
            setReplaceFind("");
            setReplaceReplace("");
        }
        else {
            props.showAlert("error", "Error: Fields cannot be empty!");
        }
    }

    return (
        <MuiThemeProvider theme={theme}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.toolName}>Replace</Typography>
                    <div className={classes.flexContent}>
                    <TextField
                        id="replace-find"
                        label="Find"
                        value={replaceFind}
                        onChange={event => onReplaceFindChange(event)}
                        className={classes.textField}
                        error={replaceError === true}
                        helperText={replaceError === true ? 'Field cannot be empty!' : ''}
                    />
                    <TextField
                        id="replace-replace"
                        label="Replace"
                        value={replaceReplace}
                        onChange={event => onReplaceReplaceChange(event)}
                        className={classes.textField}
                        error={replaceReplaceError === true}
                        helperText={replaceReplaceError === true ? 'Field cannot be empty!' : ''}
                    />
                    <Button
                        color="secondary"
                        variant="contained"
                        className={classes.button}
                        onClick={() => handleReplace()}
                        startIcon={<Add />}
                    >Add</Button>
                    </div>
                  </Paper>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
}
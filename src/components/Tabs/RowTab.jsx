import React, { Component } from 'react';
import { Paper, Grid, Button, withStyles, Typography, TextField, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
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

const styles = theme => ({
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
    },
    flexContent: {
        display: "flex",
        alignItems: "center",
    },
    toolName: {
        color: '#d9d9d9',
        fontWeight: 'bold',
    },
  })

class RowTab extends Component {
  state = { 
    matchPattern: "",
    matchError: false,
  }
  
  handleMatch(){
    if (this.state.matchPattern === ""){
      this.setState({ matchError: true});
      this.props.displaySnackbar("error", "Error: Match pattern is empty!");
    }
    else {
      this.setState({ matchError: false});
      this.props.addTool({tool: "Match", pattern: this.state.matchPattern});
      this.props.displaySnackbar("success", "Success: Match added into the pipeline.");
      this.setState({matchPattern: ""});
    }
  }

  constructor(props) {
    super(props);
    this.handleMatch = this.handleMatch.bind(this);
  }

  render() { 
    const { classes } = this.props;

    return ( 
      <MuiThemeProvider theme={theme}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="h5" className={classes.toolName}>Match</Typography>
                    <div className={classes.flexContent}>
                    <TextField
                      id="match-pattern"
                      label="Pattern"
                      value={this.state.matchPattern}
                      onChange={event => this.setState({ matchPattern: event.target.value, matchError: false })}
                      error={this.state.matchError === true}
                      helperText={this.state.matchError === true ? 'Pattern cannot be empty!' : ' '}
                      className={classes.textField}
                    />
                    <Button
                      color="secondary"
                      variant="contained"
                      className={classes.button}
                      onClick={() => this.handleMatch()}
                      startIcon={<Add />}
                    >Add</Button>
                    </div>
                  </Paper>
                </Grid>
            </Grid>
        </MuiThemeProvider>
     );
  }
}
/*
RowTab.propTypes = {
  classes: PropTypes.object.isRequired,
}*/

export default withStyles(styles)(RowTab);
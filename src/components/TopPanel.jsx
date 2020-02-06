import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Description, GitHub, Videocam, CardMembership } from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme, Tooltip } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #212121',
    },
})(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
));
  
const StyledMenuItem = withStyles(theme => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
}))(MenuItem);


const theme = createMuiTheme({
    palette: {
      primary: {
        main: grey[900],
        light: grey[200],
        dark: grey[900],
      },
      type: 'dark',
    }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appName: {
      marginLeft: theme.spacing(10),
      flex: 1,
  },
  link: {
      textDecoration: 'none',
      color: 'inherit',
  },
}));

const DenseAppBar = React.memo(() => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography className={classes.appName} variant="h6" color="inherit">
                React App
              </Typography>
              <Tooltip title="Menu">
                <IconButton edge='start' color="inherit" aria-label="menu" onClick={handleOpen}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <a className={classes.link} href="https://github.com/Izuwei/production">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <Description fontSize="small" className={classes.itemIcon}/>
                          </ListItemIcon>
                          <ListItemText primary="Documentation" />
                        </StyledMenuItem>
                    </a>
                    <a className={classes.link} href="https://github.com/Izuwei/production">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <Videocam fontSize="small" className={classes.itemIcon}/>
                          </ListItemIcon>
                          <ListItemText primary="Video" />
                        </StyledMenuItem>
                    </a>
                    <a className={classes.link} href="https://github.com/Izuwei/production">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <GitHub fontSize="small" className={classes.itemIcon}/>
                          </ListItemIcon>
                          <ListItemText primary="GitHub" />
                        </StyledMenuItem>
                    </a>
                    <a className={classes.link} href="https://github.com/Izuwei/production">
                        <StyledMenuItem>
                          <ListItemIcon>
                            <CardMembership fontSize="small" className={classes.itemIcon}/>
                          </ListItemIcon>
                          <ListItemText primary="Credits" />
                        </StyledMenuItem>
                    </a>
                </StyledMenu>
            </Toolbar>
          </AppBar>
        </div>
    </MuiThemeProvider>
  );
});

export default DenseAppBar;
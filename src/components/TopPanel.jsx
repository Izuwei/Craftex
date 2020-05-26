/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

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
import { GitHub, Videocam } from '@material-ui/icons';
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
        	main: "rgb(30, 30, 30)",
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
  	    fontSize: "28px",
  	    fontWeight: "bold",
  	    flex: 1,
  	},
  	subtitle: {
  	    fontSize: "11px",
  	    textTransform: "uppercase",
  	    marginLeft: "10px",
  	    color: "#039be5",
  	},
  	link: {
  	    textDecoration: 'none',
  	    color: 'inherit',
  	},
}));

/**
 * Inspirovano z: https://material-ui.com/components/app-bar/
 * Autor: Material-UI
 */ 
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
    	          		<Typography className={classes.appName} variant="h4" color="inherit">
    	            		Craftex
    	            		<span className={classes.subtitle}>
    	            		  	online text filters
    	            		</span>
    	          		</Typography>
    	          		<Tooltip title="Menu">
    	            		<IconButton id="menu" edge='start' color="inherit" aria-label="menu" onClick={handleOpen}>
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
    	                	<a className={classes.link} href="https://youtu.be/KA4wxr-8vKk">
    	                	    <StyledMenuItem id="video">
    	                	      	<ListItemIcon>
    	                	      	  	<Videocam fontSize="small" className={classes.itemIcon}/>
    	                	      	</ListItemIcon>
    	                	      	<ListItemText primary="Video" />
    	                	    </StyledMenuItem>
    	                	</a>
    	                	<a className={classes.link} href="https://github.com/Izuwei/production">
    	                	    <StyledMenuItem id="github">
    	                	      	<ListItemIcon>
    	                	      	  	<GitHub fontSize="small" className={classes.itemIcon}/>
    	                	      	</ListItemIcon>
    	                	      	<ListItemText primary="GitHub" />
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
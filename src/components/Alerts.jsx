/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { makeStyles, Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { CheckCircle, Close, Warning, Error, Info } from '@material-ui/icons';
import { green, amber, blue } from '@material-ui/core/colors';
import clsx from 'clsx';

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info,
};

const useStyles = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: blue[500],
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 25,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

/**
 * Funkce nastavi obsah zpravy
 * 
 * Inspirovano z: https://material-ui.com/components/snackbars/
 * Autor: Material-UI
 */
function CustomSnackbarContent(props) {
    const classes = useStyles();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            message={
                <span id="message-id" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                
                    onClick={onClose}
                >
                    <Close />
                </IconButton>,
            ]}
            {...other}
        />
    );
}
  
CustomSnackbarContent.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
};

const Alerts = React.memo(forwardRef(({ prop }, ref) => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarInfo, setSnackbarInfo] = useState(undefined);
    const snackbarQueue = useRef([]);

    /**
     * Zpristupneni instanci nadrazene komponente
     */
    useImperativeHandle(ref, () => ({
        openSnackbar(variant, message) {
            snackbarQueue.current.push({ variant, message, key: new Date().getTime() });
        
            if (showSnackbar) {
                setShowSnackbar(false);
            }
            else {
                processSnackbarQueue();
            }
          }
    }));

    /**
     * Funkce zpracuje dalsi pozadavek na zpravu ve fronte
     * 
     * Inspirovano z: https://material-ui.com/components/snackbars/
     * Autor: Material-UI
     */
    const processSnackbarQueue = () => {
        if (snackbarQueue.current.length > 0) {
            setSnackbarInfo(snackbarQueue.current.shift());
            setShowSnackbar(true);
        }
    };
    
    /**
     * Uzavreni zpravy
     * 
     * Inspirovano z: https://material-ui.com/components/snackbars/
     * Autor: Material-UI
     */
    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setShowSnackbar(false);
    };
    
    /**
     * Po uzavreni zpravy
     * 
     * Inspirovano z: https://material-ui.com/components/snackbars/
     * Autor: Material-UI
     */
    const handleExited = () => {
        processSnackbarQueue();
    };

    return (
        <Snackbar
            key={snackbarInfo ? snackbarInfo.key : undefined}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={showSnackbar}
            autoHideDuration={2000}
            onClose={closeSnackbar}
            onExited={handleExited}
            ContentProps={{ 'aria-describedby': 'message-id' }} 
        >
            <CustomSnackbarContent
                message={snackbarInfo ? snackbarInfo.message : undefined}
                variant={snackbarInfo ? snackbarInfo.variant : undefined}
                onClose={closeSnackbar}
            />
        </Snackbar>
    );
  }));

  export default Alerts;
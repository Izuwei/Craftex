/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React, { useState } from "react";
import { Typography, IconButton, Tooltip, useTheme, useMediaQuery, MuiThemeProvider, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { Info, Close } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import styles from "./TabStyles";

const ToolHeader = React.memo(({ classes, toolname, description }) => {
    const [showInfo, setShowInfo] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <MuiThemeProvider theme={theme}>
            <div className={classes.toolHeader}>
                <Typography variant="h5" className={classes.toolName}>{toolname}</Typography>
                <Tooltip title="Info">
                    <IconButton 
                        className={classes.toolInfo}
                        onClick={() => setShowInfo(true)}
                        size="small"
                    >
                        <Info />
                    </IconButton>
                </Tooltip>
            </div>
            {showInfo &&
            <Dialog
            open={showInfo}
            onClose={() => setShowInfo(false)}
            fullScreen={fullScreen}
            fullWidth={true}
            scroll={"paper"}
            maxWidth = "sm"
            aria-labelledby="info-dialog-title"
            >
                <DialogTitle id="info-dialog-title">
                    <div className={classes.infoTitle}>
                        <Info className={classes.infoTitleIcon} fontSize="large" />
                        <span>{toolname + " info"}</span>
                    </div>
                    <Tooltip title={"Close"}>
                        <IconButton aria-label="close" className={classes.infoCloseButton} onClick={() => setShowInfo(false)}>
                            <Close />
                        </IconButton>
                    </Tooltip>
                </DialogTitle>
                <DialogContent dividers className={classes.infoContent}>
                    {description}
                </DialogContent>
            </Dialog>}
        </MuiThemeProvider>
    );
});

export default withStyles(styles)(ToolHeader);
import React, { useRef, useState } from "react";
import { Toolbar, Button, makeStyles, Popper, Grow, Paper, MenuItem, MenuList, ClickAwayListener } from "@material-ui/core";
import { Description, Publish, GetApp, Undo, Redo, BugReport, Clear } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "rgb(35, 35, 35)",
        //marginTop: "3px",
        minHeight: "33px",
        height: "33px",
    },
    btn: {
        height: "33px",
        padding: "0px 10px 0px 10px",
        margin: "0px",
    },
    toolbarIcon: {
        marginRight: "6px",
    },
    popmenu: {
        zIndex: "9999",
    },
    input: {
        display: "none",
    },
}));

const EditorToolbar = React.memo(({ setInput, result, undo, redo, clearAllBreakpoints, showAlert }) => {
    const classes = useStyles();

    const [openFile, setOpenFile] = useState(false);
    const [openInspect, setOpenInspect] = useState(false);

    const fileRef = React.createRef();

    const fileButtonRef = useRef(null);
    const inspectButtonRef = useRef(null);

    const expandFile = () => {
        setOpenFile(prev => !prev);
    };

    const expandInspect = () => {
        setOpenInspect(prev => !prev);
    };

    const handleClose = event => {
        // Otevreni dalsiho selectu
        if ((fileButtonRef.current && fileButtonRef.current.contains(event.target)) || 
            (inspectButtonRef.current && inspectButtonRef.current.contains(event.target))) {
            return;
        }
        
        setOpenFile(false);
        setOpenInspect(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpenFile(false);
          setOpenInspect(false);
        }
    }

    const loadFile = async(e) => {
        e.preventDefault();

        const reader = new FileReader();

        reader.onload = async (e) => { 
          setInput(e.target.result);
        };
        reader.readAsText(e.target.files[0]);
        showAlert("success", "Success: File imported.");
    }

    const downloadResult = async() => {
        const element = document.createElement("a");
        const file = new Blob([result], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "result.txt";
        document.body.appendChild(element);
        element.click();
    }

    return (
        <Toolbar className={classes.root}>
            <Button 
                className={classes.btn}
                ref={fileButtonRef}
                onClick={expandFile}
            >
                <Description fontSize="small" className={classes.toolbarIcon} />
                File
            </Button>
            <Popper className={classes.popmenu} open={openFile} anchorEl={fileButtonRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={openFile} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <input
                            accept="text/plain"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            ref={fileRef}
                            onChange={e => `${loadFile(e)} ${handleClose(e)}`}
                        />
                        <label htmlFor="contained-button-file">
                            <MenuItem>
                                <Publish fontSize="small" className={classes.toolbarIcon}/>
                                Import
                            </MenuItem>
                        </label>
                        <MenuItem onClick={downloadResult}>
                            <GetApp fontSize="small" className={classes.toolbarIcon} />
                            Download
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
            )}
            </Popper>
            <Button 
                className={classes.btn}
                onClick={undo}
            >
                <Undo fontSize="small" className={classes.toolbarIcon} />
                Undo
            </Button>
            <Button 
                className={classes.btn}
                onClick={redo}
            >
                <Redo fontSize="small" className={classes.toolbarIcon} />
                Redo
            </Button>
            <Button 
                className={classes.btn}
                ref={inspectButtonRef}
                onClick={expandInspect}
            >
                <BugReport fontSize="small" className={classes.toolbarIcon} />
                Inspect
            </Button>
            <Popper className={classes.popmenu} open={openInspect} anchorEl={inspectButtonRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={openInspect} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={e => `${clearAllBreakpoints(e)} ${handleClose(e)}`}>
                            <Clear fontSize="small" className={classes.toolbarIcon} />
                            Clear all breakpoints
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
            )}
            </Popper>
        </ Toolbar>
    );
});

export default EditorToolbar;
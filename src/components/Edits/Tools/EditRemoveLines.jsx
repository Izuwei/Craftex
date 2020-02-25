import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    opts: {
        width: "200px",
        marginRight: "10px",
    },
}));

const EditRemoveLines = forwardRef((props, ref) => {    // TODO: dodelat callbacky
    const classes = useStyles();

    const [content, setContent] = useState(props.tool.content);

    useImperativeHandle(ref, () => ({
        handleUpdate () {
            props.updateTool({...props.tool, content: content});
            props.close();
        }
    }));

    return (
        <React.Fragment>
            <FormControl>
                <InputLabel id="edit-remove-lines-content-label">Content</InputLabel>
                <Select
                  labelId="edit-remove-lines-content-label"
                  id="edit-remove-lines-content"
                  className={classes.opts}
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                >
                    <MenuItem value={"empty"}>Empty</MenuItem>
                    <MenuItem value={"whiteSpaces"}>White spaces</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    );
});

export default EditRemoveLines;
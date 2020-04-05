/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

import React from "react";

const Test = React.memo(({ clear }) => {
    console.log('TEST RENDER');
    return <button onClick={clear}>Clear</button>
})

export default Test;
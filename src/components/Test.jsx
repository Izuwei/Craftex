import React from "react";

export const Test = React.memo(({ clear }) => {
    console.log('TEST RENDER');
    return <button onClick={clear}>Clear</button>
})
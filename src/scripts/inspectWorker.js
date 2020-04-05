/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

export default () => {

    function emptyBreakpoints(breakpoints) {
        for (var i in breakpoints) {
            if (typeof breakpoints[i] !== typeof undefined) {
                return false;
            }
        }
        return true;
    };

    self.addEventListener('message', event => { // eslint-disable-line no-restricted-globals
        postMessage(!emptyBreakpoints(event.data));
    });
};
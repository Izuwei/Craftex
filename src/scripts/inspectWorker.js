/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

export default () => {

    /**
     * Funkce zkontroluje, zda seznam breakpointu je prazdny
     * @param breakpoints seznam breakpointu
     * @returns true v pridape ze je seznam prazdny, jinak false pokud seznam obsahuje aktivni breakpoint
     */
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
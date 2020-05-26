/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

/**
 * Konstruktor web workera
 * 
 * Prevzato z: https://medium.com/prolanceer/optimizing-react-app-performance-using-web-workers-79266afd4a7
 * Autor: Rohan Bagchi
 * Datum zverejneni: 17.2.2018
 */
export default class WebWorker {
    constructor (worker) {
        const code = worker.toString();
        const blob = new Blob(['('+code+')()']);
        return new Worker(URL.createObjectURL(blob));
    }
}
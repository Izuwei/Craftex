/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

let lastID = 0;

/**
 * Funkce vraci unikatni identifikatory
 */
export default function() {
    lastID++;
    return lastID;
}
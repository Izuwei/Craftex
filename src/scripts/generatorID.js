/**
 * FIT VUT 2020
 * @author Jakub Sadilek
 */

let lastID = 0;

/**
 * Funkce vraci unikatni identifikatory
 * 
 * Inspirovano z: https://stackoverflow.com/questions/29420835/how-to-generate-unique-ids-for-form-labels-in-react
 * Autor: Artem Sapegin
 * Datum zverejneni: 6.4.2015
 */
export default function() {
    lastID++;
    return lastID;
}
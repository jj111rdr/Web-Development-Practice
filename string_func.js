/**
 * string_func.js
 * Utility functions for string manipulation
 */
/* In JavaScript, later function declarations with the 
same name overwrite earlier ones in the same scope. */

var capitalizeString = str => str.toUpperCase();

var capitalizeString = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
   }
   export { capitalizeString }; // export statement

   export var foo = 'foo';
   export var bar = 'bar';

export default function subtract(x,y) {
    return x - y;
}
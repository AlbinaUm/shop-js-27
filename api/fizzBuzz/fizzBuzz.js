"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fizzBuzz = (num) => {
    if (num < 1 || num > 30)
        return 'Not valid number. Enter from 1 to 30';
    if (num % 5 === 0 && num % 3 === 0)
        return 'fizzBuzz';
    if (num % 3 === 0)
        return 'fizz';
    if (num % 5 === 0)
        return 'buzz';
    return num;
};
exports.default = fizzBuzz;

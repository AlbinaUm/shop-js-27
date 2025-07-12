"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fizzBuzz_1 = __importDefault(require("./fizzBuzz"));
describe('fizzBuzz function', () => {
    it('exists fizzBuzz', () => {
        (0, fizzBuzz_1.default)(1);
    });
    it('return "Not valid number. Enter from 1 to 30" for 0', () => {
        const result = (0, fizzBuzz_1.default)(0);
        expect(result).toBe('Not valid number. Enter from 1 to 30');
    });
    it('return 1 for 1', () => {
        const result = (0, fizzBuzz_1.default)(1);
        expect(result).toBe(1);
    });
    it('return 2 for 2', () => {
        const result = (0, fizzBuzz_1.default)(2);
        expect(result).toBe(2);
    });
    it('return fizz for 3', () => {
        const result = (0, fizzBuzz_1.default)(3);
        expect(result).toBe('fizz');
    });
    it('return buzz for 5', () => {
        const result = (0, fizzBuzz_1.default)(5);
        expect(result).toBe('buzz');
    });
    it('return fizz for 6', () => {
        const result = (0, fizzBuzz_1.default)(6);
        expect(result).toBe('fizz');
    });
    it('return fizzBuzz for 15', () => {
        const result = (0, fizzBuzz_1.default)(15);
        expect(result).toBe('fizzBuzz');
    });
});

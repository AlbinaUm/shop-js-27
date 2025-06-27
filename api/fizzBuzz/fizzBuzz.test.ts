import fizzBuzz from "./fizzBuzz";

describe('fizzBuzz function', () => {
    it('exists fizzBuzz', () => {
        fizzBuzz(1);
    });

    it('return "Not valid number. Enter from 1 to 30" for 0', () => {
        const result = fizzBuzz(0);
        expect(result).toBe('Not valid number. Enter from 1 to 30');
    });

    it('return 1 for 1', () => {
        const result = fizzBuzz(1);
        expect(result).toBe(1);
    });

    it('return 2 for 2', () => {
        const result = fizzBuzz(2);
        expect(result).toBe(2);
    });

    it('return fizz for 3', () => {
        const result = fizzBuzz(3);
        expect(result).toBe('fizz')
    });

    it('return buzz for 5', () => {
        const result = fizzBuzz(5);
        expect(result).toBe('buzz')
    });

    it('return fizz for 6', () => {
        const result = fizzBuzz(6);
        expect(result).toBe('fizz')
    });

    it('return fizzBuzz for 15', () => {
        const result = fizzBuzz(15);
        expect(result).toBe('fizzBuzz')
    });
});
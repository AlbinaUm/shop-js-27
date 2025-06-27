// 2 + 2 = 4

interface SimpleObject {
    one: number;
    two?: number;
}

describe('calculator', () => {
    it('should add 2 numbers', () => {
        expect(2 + 2).toBe(4);
    });

    // {one: 1, two: 2} === {one: 1, two: 2} => false
    test('object assignment', () => {
       const data: SimpleObject = {one: 1};
       // data['two'] = 2;

       expect(data).not.toEqual({one: 1, two: 2});
    });
});

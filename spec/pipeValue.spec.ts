import { pipeValue } from '../src';

describe('The pipeValue function', () => {
    it('must return an object containing the "to" property', () => {
        const keys = Object.keys(pipeValue(null));
        expect(keys.some(k => k === 'to')).toBeTruthy();
    });

    it('must return an object which is frozen', () => {
        expect(Object.isFrozen(pipeValue(null)));
    })

    it('must use the context provided to pipe the functions', () => {
        const myThis = { v: 2 };
        const doSomething = pipeValue<number>(3, myThis).to(
            function (arg) { return arg + this.v }
        );

        expect(doSomething).toBe(5);
    })
});

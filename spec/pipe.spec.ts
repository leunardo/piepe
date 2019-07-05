import { pipe } from '../src';

const myObj = {
  callback: () => 1,
  callback2: () => 2,
  sum: (value: number) => (arg: number) => arg + value
};

describe('The pipe function', () => {
  it('must execute a callback', () => {
    const spy = spyOn(myObj, 'callback');

    pipe(myObj.callback)(2);

    expect(spy).toHaveBeenCalled();
  });

  it('must execute more than one callback', () => {
    const spy1 = spyOn(myObj, 'callback');
    const spy2 = spyOn(myObj, 'callback2');

    pipe(
      myObj.callback,
      myObj.callback2
    )(2);

    expect(spy1).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('must return the modified value of the piped argument', () => {
    const base = Math.random();
    const augmented = Math.random();

    const result = pipe<number>(myObj.sum(base))(augmented);

    expect(result).toBe(base + augmented);
  });
});

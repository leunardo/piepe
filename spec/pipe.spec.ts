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

  it('must have at least one function to be piped', () => {
    expect(() => pipe()(2)).toThrowError('The array must contain at least one Function to be piped.');
  })

  it('must have only functions provided to be piped', () => {
    expect(() => {
      pipe(
        a => 2 + a,
        b => b / 3,
        32 as any
      )(23);
    }).toThrowError('One or more arguments provided are not functions.');
  });

  it('must execute the functions provided in order', () => {
    let total    = 0;
    const first  = 1 << 1;
    const second = 1 << 2;
    const third  = 1 << 3;
    const finished = first | second | third;

    function f() {
      total |= first;
      expect(total).toEqual(first);
    }

    function s() {
      total |= second;
      expect(total).toEqual(first | second);
    }

    function t() {
      total |= third;
      expect(total).toEqual(finished);
    }

    pipe(f, s, t)(null);
  });
});

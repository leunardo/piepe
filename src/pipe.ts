import { FluentPipe, IPipe } from './pipe.d';

/**
 * Pipes a value through a chain of functions defined. The value of every function is
 * processed to the next function in order.
 * @param fns Functions that will receive the value.
 * @param thisContext The context of "this" to be bound into the functions
 * @template TReturn The return type
 * @template TArg The argument type
 * @return A function that can be called with the value to be piped.
 *
 * @example
 * var addTwo = (value) => value + 2;
 * pipe([
 *  addTwo,
 *  console.log
 * ])(2);
 * // 4
 */
export function pipe<TReturn = any, TArg = any>(
  ...fns: Array<IPipe<TArg>>
): (args: TArg) => TReturn {
  return args => {
    if (!Array.isArray(fns)) {
      throw new SyntaxError('The argument provided must be an Array.');
    }

    if (fns.length === 0) {
      throw new SyntaxError(
        'The array must contain at least one Function to be piped.'
      );
    }

    var onlyFunctions = fns.every(function(fn) {
      return typeof fn === 'function';
    });

    if (!onlyFunctions) {
      throw new SyntaxError(
        'One or more arguments provided are not functions.'
      );
    }

    return fns.reduce((prev, fn) => fn(prev), args);
  };
}

/**
 * Pipes a given value through functions using something as the `this`.
 * @param fns The functions to pipe the value
 * @param thisContext The context used in the piped functions
 * @template TReturn The return type
 * @template TArg The argument type
 * @return A function that can be called with the value to be piped.
 */
export function pipeBind<TReturn = any, TArg = any>(
  fns: Array<IPipe<TArg>>,
  thisContext: ThisType<any>
) {
  return pipe<TReturn, TArg>(...fns.map(fn => fn.bind(thisContext)));
}

/**
 * Pipes a given value through the functions defined. This method is a syntatic-sugar of the `pipe` function.
 * @param args The value that will be piped.
 * @param thisContext The context of "this" to be bound into the functions
 * @template TReturn The return type
 * @template TArg The argument type
 * @returns An object that contain a fluent-API to pipe
 *
 * @example
 * var addTwo = (value) => value + 2;
 * pipeValue(2).to(addTwo, console.log);
 * // 4
 */
export function pipeValue<TReturn = any, TArg = any>(
  args: TArg,
  thisContext?: ThisType<any>
): FluentPipe<TReturn, TArg> {
  return Object.freeze({
    to: (...fns) =>
      thisContext
        ? pipeBind<TReturn, TArg>(fns, thisContext)(args)
        : pipe<TReturn, TArg>(...fns)(args)
  });
}

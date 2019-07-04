/**
 * Pipes a value through a chain of functions defined. The value of every function is
 * processed to the next function in order.
 * @param fns Functions that will receive the value.
 * @param thisContext The context of "this" to be bound into the functions
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
export function pipe<T = any>(
  fns: Array<Function>,
  thisContext?: ThisType<any>
): (args: any) => T {
  return function(args) {
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

    if (thisContext) {
      fns = fns.map(fn => fn.bind(thisContext));
    }

    return fns.reduce((prev, fn) => fn(prev), args);
  };
}
/**
 * Pipes a given value through the pipes defined. This method is a syntatic-sugar of the `pipe` function.
 * @param args The value that will be piped.
 * @param thisContext The context of "this" to be bound into the functions
 * @returns An object that contain a fluent-API to pipe
 *
 * @example
 * var addTwo = (value) => value + 2;
 * pipeValue(2).to(addTwo, console.log);
 * // 4
 */
export function pipeValue<T = any>(
  args: any,
  thisContext?: ThisType<any>
): { to: (...fns: Array<Function>) => T } {
  return Object.freeze({
    to: (...fns) =>
      pipe(
        fns,
        thisContext
      )(args)
  });
}

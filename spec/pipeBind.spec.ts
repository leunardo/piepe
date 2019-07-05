import { pipeBind } from '../src';

const myThis = {
  value: 4,
  name: 'Test'
};

function getName(arg) {
  return arg + this.name;
}

function toUpper(value: string) {
  return value.toUpperCase();
}

describe('The pipeBind function', () => {
  it('must have a defined context', () => {
    const upperName = pipeBind(myThis, getName, toUpper)('Alfredo');

    expect(upperName).toBe('ALFREDOTEST');
  });
});

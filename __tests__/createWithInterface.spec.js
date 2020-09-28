import { createInterface } from '../lib/interface';
import { createWithInterface } from '../lib/createWithInterface';

const personInterfaceDescriptor = {
  name: 'string',
  age: 'number',
  married: '?boolean',
  numbers: '?number[]'
};

const inter = createInterface(personInterfaceDescriptor, 'Person');

describe('Creating object with interface', () => {
  it('Validates types on creation', () => {
    expect(() =>
      createWithInterface(inter, {
        name: 'Alex',
        age: '23',
        married: false,
        numbers: [1, 2, 3]
      })
    ).toThrowError();
    expect(() =>
      createWithInterface(inter, {
        name: 'Alex',
        age: 23,
        married: false,
        numbers: [1, 2, 3]
      })
    ).not.toThrowError();
  });

  it('Doesnt allow keys which are not from interface', () => {
    expect(() =>
      createWithInterface(inter, {
        name: 'Alex',
        age: '23',
        custom: 'custom'
      })
    ).toThrowError();
  });

  it('Skips optional parameters', () => {
    expect(() =>
      createWithInterface(inter, {
        name: 'Alex',
        age: 23
      })
    ).not.toThrowError();
  });

  it('Validates types on changes', () => {
    const person = createWithInterface(inter, {
      name: 'Alex',
      age: 23
    });
    expect(() => (person.age = '23')).toThrowError();
  });

  it('Correctly works with arrays', () => {
    expect(() =>
      createWithInterface(inter, {
        name: 'Alex',
        age: 23,
        numbers: ['1', 2, 3]
      })
    ).toThrowError();
    const person = createWithInterface(inter, {
      name: 'Alex',
      age: 23,
      numbers: [1, 2, 3]
    });
    expect(() => person.numbers.push('23')).toThrowError();
    expect(() => person.numbers.push(23)).not.toThrowError();
    expect(() => (person.numbers = [1, 2, '3'])).toThrowError();
  });

  it('Allows to set optional property to undefined', () => {
    const person = createWithInterface(inter, {
      name: 'Alex',
      age: 23,
      numbers: [1, 2, 3]
    });
    expect(() => (person.numbers = undefined)).not.toThrowError();
  });
});

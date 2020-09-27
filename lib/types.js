import { TypeValidationError } from './errors/typeValidationError';

const acceptableTypes = ['string', 'number', 'boolean'];

export function clearType(type) {
  return type.replace(/(\W|\d)/g, '');
}

export function getType(variable) {
  const type = Object.prototype.toString.call(variable);
  return type.slice(8, -1).trim().toLowerCase();
}

export function validateType(type) {
  const clean = clearType(type);
  if (!acceptableTypes.includes(clean)) {
    throw new TypeValidationError(`"${type}" is not a valid type definition`);
  }
}

export function checkTypes(objectTypeDescriptor, newValue, allowUndefined, array = false) {
  const newValueType = getType(newValue);
  const cleanType = clearType(objectTypeDescriptor.type);
  if (newValueType === 'undefined' && allowUndefined) return;
  if (cleanType !== newValueType) {
    const message = array
      ? `Value "${newValue}" (${newValueType}) cannot be placed in array of ${cleanType}`
      : `Type "${newValueType}" is not assignable to type "${objectTypeDescriptor.type}"`;
    throw new TypeError(message);
  }
}

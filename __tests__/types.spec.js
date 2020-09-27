import {checkTypes, clearType, getType, validateType} from "../lib/types";

describe('Type checker', () => {
    test('Type cleaner returns only word characters', () => {
        const string = '?number[]123%!'
        expect(clearType(string)).toBe('number')
    })

    test('Correctly detects type', () => {
        expect(getType(1)).toBe('number')
        expect(getType('test')).toBe('string')
        expect(getType(true)).toBe('boolean')
    })

    test('Doesn\'t allow types which are not supported', () => {
        expect(() => validateType('number')).not.toThrowError()
        expect(() => validateType('object')).toThrowError()
    })

    test('Checks types correctly', () => {
        const objectDescriptor = {
            type: 'number',
            value: 3
        }
        expect(() => checkTypes(objectDescriptor, 3, false)).not.toThrowError()
        expect(() => checkTypes(objectDescriptor, 'test', false)).toThrowError()
        expect(() => checkTypes(objectDescriptor, undefined, true)).not.toThrowError()
        expect(() => checkTypes(objectDescriptor, undefined, false)).toThrowError()
    })
})
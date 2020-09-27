import {createInterface} from "../lib/interface";

const personInterfaceDescriptor = {
    name: 'string',
    age: 'number',
    married: '?boolean',
    numbers: '?number[]'
}

const inter = createInterface(personInterfaceDescriptor, 'Person')

describe('Interfaces flow', () => {
    it('Creates interface object correctly', () => {
        expect(inter.name).toBe('Person')
        expect(inter.fields).not.toBeUndefined()
    })

    it('Adds all fields into "fields" object', () => {
        for (const key in personInterfaceDescriptor) {
            expect(inter.fields[key]).not.toBeUndefined()
        }
    })

    it('Creates immutable interface object', () => {
        expect(() => inter.data = '').toThrowError()
        expect(() => inter.name = 'NotPerson').toThrowError()
    })

    it('Validates incoming types', () => {
        const newDescriptor = {
            name: 'string',
            data: 'object'
        }
        expect(() => createInterface(newDescriptor, 'TestWithError')).toThrowError()
    })
})
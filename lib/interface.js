import {validateType} from "./types";

export function createInterface(interfaceDescriptor, interfaceName) {
    const newInterface = {
        name: interfaceName,
        fields: {}
    }
    for (const key in interfaceDescriptor) {
        if (!interfaceDescriptor.hasOwnProperty(key)) continue
        const type = interfaceDescriptor[key]
        validateType(type)
        Object.defineProperty(newInterface.fields, key, {
            writable: false,
            configurable: false,
            enumerable: true,
            value: type
        })
    }
    return Object.freeze(newInterface)
}

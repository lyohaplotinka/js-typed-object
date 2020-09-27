import {createGetterSetterProperty} from "./gettersAndSetters/publicFields";
import {createPrivateField} from "./gettersAndSetters/privateFields";
import {privateKey} from "./utils";

function createHelpers(object, objectInterface) {
    Object.defineProperties(object, {
        getType: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: (key) => {
                const prvt = privateKey(key)
                return object[prvt].type
            }
        },
        interface: {
            get() {
                return objectInterface.name
            }
        }
    })
}

export function createWithInterface(objectInterface, initialValue) {
    const newObject = {}
    if (!objectInterface.fields) {
        throw new ReferenceError('ObjectInterface missing "fields" property. You should define your interface via createInterface function.')
    }
    for (const key in objectInterface.fields) {
        if (!objectInterface.fields[key]) continue
        const type = objectInterface.fields[key]
        const privateFieldKey = privateKey(key)
        const initial = initialValue?.[key] ?? undefined
        createPrivateField(newObject, type, initial, privateFieldKey)
        createGetterSetterProperty(newObject, type, key)
    }
    createHelpers(newObject, objectInterface)
    Object.preventExtensions(newObject)
    Object.seal(newObject)
    return newObject
}

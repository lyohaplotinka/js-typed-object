class TypeValidationError extends Error {
    constructor(message) {
        const newMessage = `[TypeValidationError] ${message}`;
        super(newMessage);
    }
}

const acceptableTypes = [
    'string',
    'number',
    'boolean'
];

function clearType(type) {
    return type.replace(/(\W|\d)/g, '')
}

function getType(variable) {
    const type = Object.prototype.toString.call(variable);
    return type.slice(8, -1).trim().toLowerCase()
}

function validateType(type) {
    const clean = clearType(type);
    if (!acceptableTypes.includes(clean)) {
        throw new TypeValidationError(`"${type}" is not a valid type definition`)
    }
}

function checkTypes(objectTypeDescriptor, newValue, allowUndefined, array = false) {
    const newValueType = getType(newValue);
    const cleanType = clearType(objectTypeDescriptor.type);
    if (newValueType === 'undefined' && allowUndefined) return
    if (cleanType !== newValueType) {
        const message = array ? `Value "${newValue}" (${newValueType}) cannot be placed in array of ${cleanType}` :
            `Type "${newValueType}" is not assignable to type "${objectTypeDescriptor.type}"`;
        throw new TypeError(message)
    }
}

const privateKey = key => `$$$${key}`;

function createRegularGetterSetter(object, key, type) {
    const privateFieldKey = privateKey(key);
    const allowUndefined = type[0] === '?';
    Object.defineProperty(object, key, {
        get() {
            return this[privateFieldKey].value
        },
        set(v) {
            checkTypes(this[privateFieldKey], v, allowUndefined);
            this[privateFieldKey].value = v;
        },
        enumerable: true
    });
}

function createArrayGetterSetter(object, key, type) {
    const privateFieldKey = privateKey(key);
    const allowUndefined = type[0] === '?';
    Object.defineProperty(object, key, {
        get() {
            return this[privateFieldKey].value
        },
        set(v) {
            if (allowUndefined && v === undefined) {
                this[privateFieldKey].value = undefined;
                return
            }
            const { type, cleanType, $$setChecker } = this[privateFieldKey];
            $$setChecker(v, getType(v), cleanType, type);
            this[privateFieldKey].value = new Proxy(v, {
                set(target, p, value) {
                    this[privateFieldKey].$$checker(value);
                    target[p] = value;
                    return true
                }
            });
        },
        enumerable: true
    });
}

function createGetterSetterProperty(object, type, key) {
    const isArray = type.includes('[]');
    if (!isArray) return createRegularGetterSetter(object, key, type)
    if (isArray) return createArrayGetterSetter(object, key, type)
}

function createRegularPrivateField(object, type, initialValue, key) {
    const allowUndefined = type[0] === '?';
    const privateFieldValue = {
        type,
        value: initialValue
    };
    checkTypes(privateFieldValue, initialValue, allowUndefined);
    Object.defineProperty(object, key, {
        writable: false,
        configurable: false,
        value: privateFieldValue
    });
}

function createArrayPrivateField(object, type, initialValue, key) {
    const allowUndefined = type[0] === '?';
    const cleanType = clearType(type);
    const initialValueType = getType(initialValue);
    const isLegalUndefined = allowUndefined && initialValue === undefined;

    const setChecker = (value, valueType, cleanArrayType, arrayType) => {
        if (!Array.isArray(value)) {
            throw new TypeError(`Type "${valueType}" is not assignable to type "${arrayType}"`)
        }
        value.forEach(v => {
            checkTypes({ type }, v, allowUndefined, true);
        });
    };

    if (!isLegalUndefined) setChecker(initialValue, initialValueType, cleanType, type);

    const privateFieldValue = {
        type,
        cleanType,
        $$setChecker: setChecker,
        value: isLegalUndefined ? undefined : new Proxy(initialValue, {
            type,
            $$checker(value) {
                checkTypes({ type: this.type }, value, allowUndefined, true);
            },
            set(target, p, value) {
                this.$$checker(value);
                target[p] = value;
                return true
            }
        })
    };

    Object.defineProperty(object, key, {
        writable: false,
        configurable: false,
        value: privateFieldValue
    });
}

function createPrivateField(object, type, initialValue, key) {
    const isArray = type.includes('[]');
    if (!isArray) return createRegularPrivateField(object, type, initialValue, key)
    if (isArray) return createArrayPrivateField(object, type, initialValue, key)
}

function createHelpers(object, objectInterface) {
    Object.defineProperties(object, {
        getType: {
            writable: false,
            configurable: false,
            enumerable: false,
            value: (key) => {
                const prvt = privateKey(key);
                return object[prvt].type
            }
        },
        interface: {
            get() {
                return objectInterface.name
            }
        }
    });
}

function createWithInterface(objectInterface, initialValue) {
    const newObject = {};
    if (!objectInterface.fields) {
        throw new ReferenceError('ObjectInterface missing "fields" property. You should define your interface via createInterface function.')
    }
    for (const key in objectInterface.fields) {
        if (!objectInterface.fields[key]) continue
        const type = objectInterface.fields[key];
        const privateFieldKey = privateKey(key);
        const initial = initialValue?.[key] ?? undefined;
        createPrivateField(newObject, type, initial, privateFieldKey);
        createGetterSetterProperty(newObject, type, key);
    }
    createHelpers(newObject, objectInterface);
    Object.preventExtensions(newObject);
    Object.seal(newObject);
    return newObject
}

function createInterface(interfaceDescriptor, interfaceName) {
    const newInterface = {
        name: interfaceName,
        fields: {}
    };
    for (const key in interfaceDescriptor) {
        if (!interfaceDescriptor.hasOwnProperty(key)) continue
        const type = interfaceDescriptor[key];
        validateType(type);
        Object.defineProperty(newInterface.fields, key, {
            writable: false,
            configurable: false,
            enumerable: true,
            value: type
        });
    }
    return Object.freeze(newInterface)
}

var main = {
    createInterface,
    createWithInterface
};

export default main;

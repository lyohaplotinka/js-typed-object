import {checkTypes, clearType, getType} from "../types";

function createRegularPrivateField(object, type, initialValue, key) {
    const allowUndefined = type[0] === '?'
    const privateFieldValue = {
        type,
        value: initialValue
    }
    checkTypes(privateFieldValue, initialValue, allowUndefined)
    Object.defineProperty(object, key, {
        writable: false,
        configurable: false,
        value: privateFieldValue
    })
}

function createArrayPrivateField(object, type, initialValue, key) {
    const allowUndefined = type[0] === '?'
    const cleanType = clearType(type)
    const initialValueType = getType(initialValue)
    const isLegalUndefined = allowUndefined && initialValue === undefined

    const setChecker = (value, valueType, cleanArrayType, arrayType) => {
        if (!Array.isArray(value)) {
            throw new TypeError(`Type "${valueType}" is not assignable to type "${arrayType}"`)
        }
        value.forEach(v => {
            const vType = getType(v)
            const isCorrectType = vType === cleanArrayType
            if (!isCorrectType) {
                throw new TypeError(`Value "${v}" (${vType}) cannot be placed in array of ${cleanArrayType}`)
            }
        })
    }

    if (!isLegalUndefined) setChecker(initialValue, initialValueType, cleanType, type)

    const privateFieldValue = {
        type,
        cleanType,
        $$setChecker: setChecker,
        value: isLegalUndefined ? undefined : new Proxy(initialValue, {
            type,
            cleanType,
            $$checker(value) {
                const valueType = getType(value)
                if (valueType !== this.cleanType) {
                    throw new TypeError(`Value "${value}" (${valueType}) cannot be placed in array of ${this.cleanType}`)
                }
            },
            set(target, p, value) {
                this.$$checker(value)
                target[p] = value
                return true
            }
        })
    }

    Object.defineProperty(object, key, {
        writable: false,
        configurable: false,
        value: privateFieldValue
    })
}

export function createPrivateField(object, type, initialValue, key) {
    const isArray = type.includes('[]')
    if (!isArray) return createRegularPrivateField(object, type, initialValue, key)
    if (isArray) return createArrayPrivateField(object, type, initialValue, key)
}
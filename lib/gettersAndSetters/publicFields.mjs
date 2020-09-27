import {checkTypes, getType} from "../types.mjs";
import {privateKey} from "../createWithInterface.mjs";

export function createRegularGetterSetter(object, key, type) {
    const privateFieldKey = privateKey(key)
    const allowUndefined = type[0] === '?'
    Object.defineProperty(object, key, {
        get() {
            return this[privateFieldKey].value
        },
        set(v) {
            checkTypes(this[privateFieldKey], v, allowUndefined)
            this[privateFieldKey].value = v
        },
        enumerable: true
    })
}

export function createArrayGetterSetter(object, key, type) {
    const privateFieldKey = privateKey(key)
    const allowUndefined = type[0] === '?'
    Object.defineProperty(object, key, {
        get() {
            if (Array.isArray(this[privateFieldKey].value)) return [...this[privateFieldKey].value]
            else return this[privateFieldKey].value
        },
        set(v) {
            if (allowUndefined && v === undefined) {
                this[privateFieldKey].value = undefined
                return
            }
            const { type, cleanType, $$setChecker } = this[privateFieldKey]
            $$setChecker(v, getType(v), cleanType, type)
            this[privateFieldKey].value = new Proxy(v, {
                set(target, p, value) {
                    this[privateFieldKey].$$checker(value)
                    target[p] = value
                    return true
                }
            })
        },
        enumerable: true
    })
}

export function createGetterSetterProperty(object, type, key) {
    const isArray = type.includes('[]')
    if (!isArray) return createRegularGetterSetter(object, key, type)
    if (isArray) return createArrayGetterSetter(object, key, type)
}
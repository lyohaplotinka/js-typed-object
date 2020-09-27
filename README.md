# typed-object

Runtime type-checking for JavaScript objects
without TypeScript or other dependencies, but with TypeScript-like
syntax.

#### Example code: 
```javascript
import { createInterface, createWithInterface } from 'typed-object'
// or, in Node
const { createInterface, createWithInterface } = require('typed-object')

// Step 1. Creating an interface 
const personInterfaceDescriptor = {
    name: 'string',
    age: 'number',
    married: '?boolean',
    numbers: '?number[]'
}
const personInterface = createInterface(personInterfaceDescriptor, 'Person')

// Step 2. Creating a typed object via interface above
const person = createWithInterface(personInterface, {
    name: 'Alex',
    age: 23
})

// Step 3. Try to use different types
person.age = '23'
// TypeError: Type "string" is not assignable to type "number"
```

#### What is interface? 
In this package, of course, `interface` doesn't mean _real_ 
interface from OOP. You can't implement them in classes, you can't
write interface extending class. For now it is just a type 
definition for object fields. 

#### Supported types
* `number` (and number array via `number[]`);
* `string` (and string array via `string[]`);
* `boolean` (and boolean array via `boolean[]`).

More types are coming soon! Complex types are on the way too.

#### Optional properties
All the types can be written like `'?type'`. It means that this
property is optional, and you can set it as `undefined`. 

#### TODO
* Complex types (`string|number`);
* adding more supported types (functions, objects, etc.);
* ability to use other interfaces as types;
* babel plugin.

#### Browser support
Most of the code in the library is well supported by browsers, 
however, Proxy is used to work with arrays. You can look at 
the [proxy support table](https://caniuse.com/proxy) to see which browsers will be able 
to work without polyfills.
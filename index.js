import {createInterface} from "./lib/interface.js";
import {createWithInterface} from "./lib/createWithInterface.js";

const interfaceDescriptor = {
    name: 'string',
    age: 'number',
    married: '?boolean',
    numbers: '?number[]'
}

const PersonInterface = createInterface(interfaceDescriptor, 'Person')
const person = createWithInterface(PersonInterface, {
    name: 'Alex',
    age: 23,
    married: false,
    numbers: [1,2,3]
})


console.log(JSON.stringify(person, null, 2))
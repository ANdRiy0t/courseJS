


export function executeMethod(){
    // if(!options.sayGoodBye) console.error("options.sayGoodBye was null")
    // if(!options.sayHello) console.error("options.sayHello was null")
    
    let names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
    
    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let firstLetter = name.charAt(0).toLowerCase();
        if (firstLetter === 'j') {
            sayGoodBye(name);
        } else {
            sayHello(name);
        }
    }
}
(function () {
    let names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];

    for (let i = 0; i < names.length; i++) {
        let name = names[i];
        let firstLetter = name.charAt(0).toLowerCase();
        if (firstLetter === 'j') {
            sayGoodbye.speak(name);
        } else {
            sayHello.speak(name);
        }
    }
})();

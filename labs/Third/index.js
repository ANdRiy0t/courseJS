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



    console.log("Display the names whose sum of ASCII codes exceeds 500");
    let threshold = 500;
    names.forEach(function (name) {
        let resultSum = 0;
        for (let j = 0; j < name.length; j++) {
            resultSum += name.charCodeAt(j);
        }
        if (resultSum > threshold) {
            console.log("Name: " + name + " (ASCII Sum: " + resultSum + ")");
        }
    });
})();

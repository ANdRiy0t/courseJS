(function () {
    let speakWord = "Goodbye";
    function speak(name) {
        console.log(speakWord + " " + name);
    }
    window.sayGoodbye = {
        speak: speak
    };
})();

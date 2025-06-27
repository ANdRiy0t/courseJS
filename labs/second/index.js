"use strict";

var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 220;
car1.tuning = true;
car1.numberOfAccidents = 0;
car1.driver = new Object();
car1.driver.name = "Mykola Plikhtiak";
car1.driver.category = "C";
car1.driver.personalLimitations = "No driving at night";

var car2 = {
    color: "blue",
    maxSpeed: 180,
    tuning: false,
    numberOfAccidents: 0,
    driver: {
        name: "Mykola Plikhtiak",
        category: "C",
        personalLimitations: null
    }
};

car1.drive = function() {
    console.log("I am not driving at night");
};

car1.drive();

car2.drive = function() {
    console.log("I can drive anytime");
};

car2.drive();

function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;
    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            console.log(
                "Driver " + this.driver.name +
                (this.driver.nightDriving ? " drives at night" : " does not drive at night") +
                " and has " + this.driver.experience + " years of experience"
            );
        }
    };
}

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

var truck1 = new Truck("white", 5000, 80.5, "Volvo", "FH16");
var truck2 = new Truck("black", 4500, 75.0, "Mercedes", "Actros");
truck1.AssignDriver("Mykola Plikhtiak", true, 5);
truck1.trip();
truck2.AssignDriver("Mykola Plikhtiak2", false, 3);
truck2.trip();

class Square {
    constructor(a) {
        this.a = a;
    }
    static help() {
        console.log("Square: усі сторони рівні, усі кути прямі (90°).");
    }
    length() {
        const perimeter = 4 * this.a;
        console.log("Perimeter (sum of all sides) =", perimeter);
    }
    square() {
        const area = this.a * this.a;
        console.log("Area =", area);
    }
    info() {
        console.log("=== Square info ===");
        console.log("Sides:", `${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log("Angles: 90, 90, 90, 90");
        console.log("Perimeter:", 4 * this.a);
        console.log("Area:", this.a * this.a);
        console.log("===================");
    }
}

class Rectangle extends Square {
    constructor(a, b) {
        super(a);
        this.b = b;
    }
    static help() {
        console.log("Rectangle: протилежні сторони рівні та паралельні, кути прямі (90°).");
    }
    length() {
        const perimeter = 2 * (this.a + this.b);
        console.log("Perimeter (sum of all sides) =", perimeter);
    }
    square() {
        const area = this.a * this.b;
        console.log("Area =", area);
    }
    info() {
        console.log("=== Rectangle info ===");
        console.log("Sides:", `${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log("Angles: 90, 90, 90, 90");
        console.log("Perimeter:", 2 * (this.a + this.b));
        console.log("Area:", this.a * this.b);
        console.log("======================");
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this._alpha = alpha;
        this._beta = beta;
    }
    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = value;
    }
    get beta() {
        return this._beta;
    }
    set beta(value) {
        this._beta = value;
    }
    get a() {
        return super.a;
    }
    set a(value) {
        super.a = value;
    }
    static help() {
        console.log("Rhombus: усі сторони рівні, протилежні кути рівні, але не обов'язково 90°.");
    }
    length() {
        const perimeter = 4 * this.a;
        console.log("Perimeter (sum of all sides) =", perimeter);
    }
    square() {
        const alphaRad = (Math.PI / 180) * this.alpha;
        const area = this.a * this.a * Math.sin(alphaRad);
        console.log("Area =", area);
    }
    info() {
        console.log("=== Rhombus info ===");
        console.log("Sides:", `${this.a}, ${this.a}, ${this.a}, ${this.a}`);
        console.log(`Angles: ${this.alpha}, ${this.beta}, ${this.alpha}, ${this.beta}`);
        console.log("Perimeter:", 4 * this.a);
        const alphaRad = (Math.PI / 180) * this.alpha;
        const area = this.a * this.a * Math.sin(alphaRad);
        console.log("Area:", area);
        console.log("====================");
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b);
        this.alpha = alpha;
        this.beta = beta;
    }
    static help() {
        console.log("Parallelogram: дві пари паралельних сторін, протилежні кути рівні.");
    }
    length() {
        const perimeter = 2 * (this.a + this.b);
        console.log("Perimeter (sum of all sides) =", perimeter);
    }
    square() {
        const alphaRad = (Math.PI / 180) * this.alpha;
        const area = this.a * this.b * Math.sin(alphaRad);
        console.log("Area =", area);
    }
    info() {
        console.log("=== Parallelogram info ===");
        console.log("Sides:", `${this.a}, ${this.b}, ${this.a}, ${this.b}`);
        console.log(`Angles: ${this.alpha}, ${this.beta}, ${this.alpha}, ${this.beta}`);
        console.log("Perimeter:", 2 * (this.a + this.b));
        const alphaRad = (Math.PI / 180) * this.alpha;
        const area = this.a * this.b * Math.sin(alphaRad);
        console.log("Area:", area);
        console.log("=========================");
    }
}

console.log("1.2.23: Static help() calls:");
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();
console.log("================================\n");

console.log("1.2.24: Creating objects and calling info():");
const sq = new Square(5);
sq.info();
const rect = new Rectangle(3, 6);
rect.info();
const rh = new Rhombus(4, 60, 120);
rh.info();
const par = new Parallelogram(5, 8, 60, 120);
par.info();

function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

console.log("1.2.26: Triangular objects:");
const tri1 = Triangular(5, 5, 5);
const tri2 = Triangular(2, 3, 4);
const tri3 = Triangular();
console.log(tri1);
console.log(tri2);
console.log(tri3);
console.log("================================\n");

function PiMultiplier(x) {
    return function() {
        return Math.PI * x;
    };
}

const piTimes2 = PiMultiplier(2);
const piTimes2_3 = PiMultiplier(2/3);
const piDiv2 = PiMultiplier(0.5);
console.log("1.2.28: PiMultiplier results:");
console.log("π * 2    =", piTimes2());
console.log("π * 2/3  =", piTimes2_3());
console.log("π / 2    =", piDiv2());

function Painter(color) {
    return function (obj) {
        if (obj.type !== undefined) {
            console.log(`Painting a "${obj.type}" with color "${color}".`);
        } else {
            console.log("No 'type' property occurred!");
        }
    };
}

const PaintBlue = Painter("blue");
const PaintRed = Painter("red");
const PaintYellow = Painter("yellow");
const object1 = {
    maxSpeed: 280,
    type: "car",
    color: "magenta",
};
const object2 = {
    type: "Truck",
    loadCapacity: 2400,
};
const object3 = {
    maxSpeed: 180,
    type: "scooter",
    color: "purple",
};
console.log("=== Demonstration of Painter functions ===");
PaintBlue(object1);
PaintRed(object1);
PaintYellow(object1);
PaintBlue(object2);
PaintRed(object2);
PaintYellow(object2);
PaintBlue(object3);
PaintRed(object3);
PaintYellow(object3);

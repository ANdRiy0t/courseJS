function triangle(val1, type1, val2, type2) {
    const types = {
        leg: "leg",
        hypotenuse: "hypotenuse",
        adjacentAngle: "adjacent angle",
        oppositeAngle: "opposite angle",
        angle: "angle"
    };

    const MIN_SIDE = 0.0001;
    const MAX_SIDE = 1e6;
    const MIN_ANGLE = 0;
    const MAX_ANGLE = 90;

    if (!Object.values(types).includes(type1) || !Object.values(types).includes(type2)) {
        console.log("Некоректно заданий тип. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }

    const isAngleType = t => (t === types.angle || t === types.adjacentAngle || t === types.oppositeAngle);
    if (isAngleType(type1) && isAngleType(type2)) {
        console.log("Недостатньо даних для розв'язання трикутника (задано лише кути).");
        return "failed";
    }

    const degToRad = deg => deg * Math.PI / 180;
    const radToDeg = rad => rad * 180 / Math.PI;
    const isValidSide = x => typeof x === "number" && x > MIN_SIDE && x <= MAX_SIDE;
    const isValidAngle = x => typeof x === "number" && x > MIN_ANGLE && x < MAX_ANGLE;
    let a, b, c, alpha, beta;

    if (type1 === types.leg && type2 === types.leg) {
        a = val1;
        b = val2;
        if (!isValidSide(a) || !isValidSide(b)) {
            console.log("Сторони мають бути в межах (" + MIN_SIDE + ", " + MAX_SIDE + "].");
            return "failed";
        }
        c = Math.sqrt(a * a + b * b);
        alpha = radToDeg(Math.asin(a / c));
        beta = 90 - alpha;
    } else if ((type1 === types.leg && type2 === types.hypotenuse) || (type1 === types.hypotenuse && type2 === types.leg)) {
        if (type1 === types.leg) {
            a = val1;
            c = val2;
        } else {
            a = val2;
            c = val1;
        }
        if (!isValidSide(a) || !isValidSide(c)) {
            console.log("Сторони мають бути в межах (" + MIN_SIDE + ", " + MAX_SIDE + "].");
            return "failed";
        }
        if (a >= c) {
            console.log("Катет має бути меншим за гіпотенузу.");
            return "failed";
        }
        b = Math.sqrt(c * c - a * a);
        alpha = radToDeg(Math.asin(a / c));
        beta = 90 - alpha;
    } else if ((type1 === types.leg && type2 === types.oppositeAngle) || (type1 === types.oppositeAngle && type2 === types.leg)) {
        if (type1 === types.leg) {
            a = val1;
            alpha = val2;
        } else {
            a = val2;
            alpha = val1;
        }
        if (!isValidSide(a)) {
            console.log("Сторона має бути в межах (" + MIN_SIDE + ", " + MAX_SIDE + "].");
            return "failed";
        }
        if (!isValidAngle(alpha)) {
            console.log("Кут має бути в межах (" + MIN_ANGLE + ", " + MAX_ANGLE + ").");
            return "failed";
        }
        c = a / Math.sin(degToRad(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
    } else if ((type1 === types.leg && type2 === types.adjacentAngle) || (type1 === types.adjacentAngle && type2 === types.leg)) {
        if (type1 === types.leg) {
            b = val1;
            alpha = val2;
        } else {
            b = val2;
            alpha = val1;
        }
        if (!isValidSide(b)) {
            console.log("Сторона має бути в межах (" + MIN_SIDE + ", " + MAX_SIDE + "].");
            return "failed";
        }
        if (!isValidAngle(alpha)) {
            console.log("Кут має бути в межах (" + MIN_ANGLE + ", " + MAX_ANGLE + ").");
            return "failed";
        }
        c = b / Math.cos(degToRad(alpha));
        a = c * Math.sin(degToRad(alpha));
        beta = 90 - alpha;
    } else if ((type1 === types.hypotenuse && isAngleType(type2)) || (isAngleType(type1) && type2 === types.hypotenuse)) {
        if (type1 === types.hypotenuse) {
            c = val1;
            alpha = val2;
        } else {
            c = val2;
            alpha = val1;
        }
        if (!isValidSide(c)) {
            console.log("Гіпотенуза має бути в межах (" + MIN_SIDE + ", " + MAX_SIDE + "].");
            return "failed";
        }
        if (!isValidAngle(alpha)) {
            console.log("Кут має бути в межах (" + MIN_ANGLE + ", " + MAX_ANGLE + ").");
            return "failed";
        }
        a = c * Math.sin(degToRad(alpha));
        b = c * Math.cos(degToRad(alpha));
        beta = 90 - alpha;
    } else {
        console.log("Невірна комбінація типів. Перечитайте інструкцію.");
        return "failed";
    }

    console.log(`a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}`);
    console.log(`α = ${alpha.toFixed(2)}°, β = ${beta.toFixed(2)}°`);
    return "success";
}

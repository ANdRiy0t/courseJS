function triangle(val1, type1, val2, type2) {
    console.log("Інструкція:");
    console.log("Використовуйте синтаксис: triangle(значення1, 'тип1', значення2, 'тип2')");
    console.log("Допустимі 'типи' значень:");
    console.log("  'leg'             - катет");
    console.log("  'hypotenuse'      - гіпотенуза");
    console.log("  'adjacent angle'  - кут, прилеглий до катета (цей катет будемо приймати за b)");
    console.log("  'opposite angle'  - кут, протилежний до катета (цей катет будемо приймати за a)");
    console.log("  'angle'           - один з гострих кутів (при заданій гіпотенузі)");
    console.log("Приклад виклику: triangle(4, 'leg', 8, 'hypotenuse')");


    const allowedTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if (!allowedTypes.includes(type1) || !allowedTypes.includes(type2)) {
        console.log("Некоректно заданий тип. Будь ласка, перечитайте інструкцію.");
        return "failed";
    }
    
    const isAngleType = t => (t === "angle" || t === "adjacent angle" || t === "opposite angle");
    if (isAngleType(type1) && isAngleType(type2)) {
        console.log("Недостатньо даних для розв'язання трикутника (задано лише кути).");
        return "failed";
    }
    
    const degToRad = deg => deg * Math.PI / 180;
    const radToDeg = rad => rad * 180 / Math.PI;
    
    const isValidSide = x => x > 0;
    const isValidAngle = x => x > 0 && x < 90;

    let a, b, c, alpha, beta;
    
    if (type1 === "leg" && type2 === "leg") {
        a = val1;
        b = val2;
        if (!isValidSide(a) || !isValidSide(b)) {
            console.log("Сторони мають бути додатні.");
            return "failed";
        }
        c = Math.sqrt(a * a + b * b);
        alpha = radToDeg(Math.asin(a / c));
        beta = 90 - alpha;
        
    } else if ((type1 === "leg" && type2 === "hypotenuse") || (type1 === "hypotenuse" && type2 === "leg")) {
        if (type1 === "leg") {
            a = val1;
            c = val2;
        } else {
            a = val2;
            c = val1;
        }
        if (!isValidSide(a) || !isValidSide(c)) {
            console.log("Сторони мають бути додатні.");
            return "failed";
        }
        if (a >= c) {
            console.log("Катет має бути меншим за гіпотенузу.");
            return "failed";
        }
        b = Math.sqrt(c * c - a * a);
        alpha = radToDeg(Math.asin(a / c));
        beta = 90 - alpha;

    } else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        if (type1 === "leg") {
            a = val1;
            alpha = val2;
        } else {
            a = val2;
            alpha = val1;
        }
        if (!isValidSide(a)) {
            console.log("Сторона має бути додатня.");
            return "failed";
        }
        if (!isValidAngle(alpha)) {
            console.log("Кут має бути гострим (більше 0 і менше 90).");
            return "failed";
        }
        c = a / Math.sin(degToRad(alpha));
        b = Math.sqrt(c * c - a * a);
        beta = 90 - alpha;
        
    } else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        if (type1 === "leg") {
            b = val1;
            alpha = val2;
        } else {
            b = val2;
            alpha = val1;
        }
        if (!isValidSide(b)) {
            console.log("Сторона має бути додатня.");
            return "failed";
        }
        if (!isValidAngle(alpha)) {
            console.log("Кут має бути гострим (більше 0 і менше 90).");
            return "failed";
        }
        // cos(α) = b/c  => c = b/cos(α)
        c = b / Math.cos(degToRad(alpha));
        a = c * Math.sin(degToRad(alpha));
        beta = 90 - alpha;
        
    } else if (
        (type1 === "hypotenuse" && isAngleType(type2)) ||
        (isAngleType(type1) && type2 === "hypotenuse")
    ) {
        if (type1 === "hypotenuse") {
            c = val1;
            alpha = val2; 
        } else {
            c = val2;
            alpha = val1;
        }
        if (!isValidSide(c)) {
            console.log("Гіпотенуза має бути додатньою.");
            return "failed";
        }
        if (!isValidAngle(alpha)) {
            console.log("Кут має бути гострим (більше 0 і менше 90).");
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

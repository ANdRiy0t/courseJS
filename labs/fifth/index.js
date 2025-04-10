
let score = 0;
let reactionTimeout;
let reactionInterval;
let lastPixelPos = null;
let currentSpawnTime = 0;


export function renderPage(options){
    const difficultiesForDropdown = [
        { value: "easy", text: "Легко" },
        { value: "medium", text: "Середній" },
        { value: "hard", text: "Важко" }
    ];

    const pixelColors = [
        { value: "red", text: "Red" },
        { value: "blue", text: "Blue" },
        { value: "yellow", text: "Yellow" },
        { value: "black", text: "Black" }
    ];
    
    populateSelect("difficulty", difficultiesForDropdown);
    populateSelect("pixelColor", pixelColors);
    

    document.getElementById('gameCanvas').addEventListener("click", function(event) {
        if (event.target.id === "gameCanvas") {
            currentSpawnTime -= penaltyTimes[currentDifficulty];
            const reactionTime = difficulties[currentDifficulty];
            if (Date.now() - currentSpawnTime >= reactionTime) {
                clearTimeout(reactionTimeout);
                clearInterval(reactionInterval);
                alert("Час вичерпано! Гра закінчилась. Ваш рахунок: " + score);
                document.getElementById('startScreen').style.display = 'block';
                document.getElementById('gameScreen').style.display = 'none';
                lastPixelPos = null;
            }
        }
    });

    document.getElementById('startButton').addEventListener('click', () => {
        currentDifficulty = document.getElementById('difficulty').value;
        currentPixelColor = document.getElementById('pixelColor').value;
        score = 0;
        lastPixelPos = null;
        document.getElementById('score').textContent = score;
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameScreen').style.display = 'block';
        spawnPixel();
    });
}

function spawnPixel() {
    clearTimeout(reactionTimeout);
    clearInterval(reactionInterval);

    const gameCanvas = document.getElementById('gameCanvas');


    const existingPixel = document.querySelector('.pixel');
    if (existingPixel) {
        existingPixel.remove();
    }

    const pixelSize = pixelSizes[currentDifficulty] || 20;

    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.width = pixelSize + 'px';
    pixel.style.height = pixelSize + 'px';
    pixel.style.backgroundColor = currentPixelColor;

    let positionX, positionY;
    if (lastPixelPos) {
        const radius = spawnRadii[currentDifficulty];
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * radius;
        positionX = lastPixelPos.x + distance * Math.cos(angle);
        positionY = lastPixelPos.y + distance * Math.sin(angle);

        const maxX = gameCanvas.offsetWidth - pixelSize;
        const maxY = gameCanvas.offsetHeight - pixelSize;
        positionX = Math.max(0, Math.min(positionX, maxX));
        positionY = Math.max(0, Math.min(positionY, maxY));
    } else {
        const maxX = gameCanvas.offsetWidth - pixelSize;
        const maxY = gameCanvas.offsetHeight - pixelSize;
        positionX = Math.floor(Math.random() * (maxX + 1));
        positionY = Math.floor(Math.random() * (maxY + 1));
    }

    lastPixelPos = { x: positionX, y: positionY };
    pixel.style.left = positionX + 'px';
    pixel.style.top = positionY + 'px';

    gameCanvas.appendChild(pixel);

    currentSpawnTime = Date.now();
    const reactionTime = difficulties[currentDifficulty];

    reactionInterval = setInterval(() => {
        const elapsed = Date.now() - currentSpawnTime;
        const remaining = reactionTime - elapsed;
        if (remaining <= 0) {
            clearInterval(reactionInterval);
            if (pixel.parentNode) {
                pixel.parentNode.removeChild(pixel);
            }
            alert("Час вичерпано! Гра закінчилась. Ваш рахунок: " + score);
            document.getElementById('startScreen').style.display = 'block';
            document.getElementById('gameScreen').style.display = 'none';
            lastPixelPos = null;
        } else {
            document.getElementById('timeLeft').textContent = (remaining / 1000).toFixed(1);
        }
    }, 50);

    pixel.addEventListener('click', (event) => {
        clearTimeout(reactionTimeout);
        clearInterval(reactionInterval);
        score++;
        document.getElementById('score').textContent = score;
        if (pixel.parentNode) {
            pixel.parentNode.removeChild(pixel);
        }
        spawnPixel();
    });
}

function populateSelect(selectId, optionsArray) {
    const select = document.getElementById(selectId);
    select.innerHTML = "";
    optionsArray.forEach(item => {
        const option = document.createElement("option");
        option.value = item.value;
        option.textContent = item.text;
        select.appendChild(option);
    });
}

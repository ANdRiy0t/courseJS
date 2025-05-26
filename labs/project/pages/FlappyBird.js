export class FlappyBird {
    constructor(containerId) {
        this.containerId = containerId;
        this.canvas = null;
        this.ctx = null;
        this.bird = { x: 100, y: 300, velocity: 0, gravity: 2.5, jump: -10 };
        this.pipes = [];
        this.score = 0;
        this.gameOver = false;
        this.pipeGap = 150;
        this.pipeSpeed = 2;
        this.pipeFrequency = 100;
        this.frameCount = 0;
    }

    // Ініціалізація гри
    init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error('Container not found');
            return;
        }

        // Очищуємо контейнер і додаємо canvas
        container.innerHTML = `
            <canvas id="flappyCanvas" width="400" height="600"></canvas>
            <div id="score">Score: 0</div>
            <div id="gameOver" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: red; font-size: 24px;">
                Game Over!<br>Score: <span id="finalScore">0</span><br>Press Space to Restart
            </div>
        `;

        // Ініціалізація canvas
        this.canvas = document.getElementById('flappyCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Додаємо стилі
        const style = document.createElement('style');
        style.textContent = `
            #flappyCanvas {
                border: 1px solid #000;
                display: block;
                margin: 0 auto;
            }
            #score {
                position: absolute;
                top: 10px;
                left: 10px;
                font-size: 20px;
                color: #000;
                font-family: Arial, sans-serif;
            }
            #gameOver {
                font-family: Arial, sans-serif;
            }
        `;
        container.appendChild(style);

        // Додаємо обробники подій
        this.addJumpEventListener();
        this.addRestartEventListener();

        // Запускаємо гру
        this.gameLoop();
    }

    // Обробник події для стрибка
    addJumpEventListener() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.gameOver) {
                this.jumpBird();
            }
        });
    }

    // Обробник події для рестарту
    addRestartEventListener() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.gameOver) {
                this.restartGame();
            }
        });
    }

    // Логіка стрибка пташки
    jumpBird() {
        this.bird.velocity = this.bird.jump;
    }

    // Логіка падіння пташки
    fallBird() {
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;
    }

    // Підрахунок відстані (рахунку)
    updateScore() {
        this.pipes.forEach((pipe) => {
            if (!pipe.passed && pipe.x < this.bird.x) {
                this.score += 1;
                pipe.passed = true;
                document.getElementById('score').textContent = `Score: ${this.score}`;
            }
        });
    }

    // Логіка програшу
    checkGameOver() {
        // Перевірка зіткнення з землею або верхом
        if (this.bird.y > this.canvas.height - 20 || this.bird.y < 0) {
            this.gameOver = true;
        }

        // Перевірка зіткнення з трубами
        this.pipes.forEach((pipe) => {
            if (
                this.bird.x + 20 > pipe.x &&
                this.bird.x - 20 < pipe.x + 50 &&
                (this.bird.y - 20 < pipe.top || this.bird.y + 20 > pipe.bottom)
            ) {
                this.gameOver = true;
            }
        });

        if (this.gameOver) {
            document.getElementById('gameOver').style.display = 'block';
            document.getElementById('finalScore').textContent = this.score;
        }
    }

    // Генерація труб
    generatePipes() {
        this.frameCount++;
        if (this.frameCount % this.pipeFrequency === 0) {
            const gapY = Math.random() * (this.canvas.height - 200) + 100;
            this.pipes.push({
                x: this.canvas.width,
                top: gapY - this.pipeGap / 2,
                bottom: gapY + this.pipeGap / 2,
                passed: false,
            });
        }
    }

    // Оновлення позиції труб
    updatePipes() {
        this.pipes.forEach((pipe) => {
            pipe.x -= this.pipeSpeed;
        });
        this.pipes = this.pipes.filter((pipe) => pipe.x > -50);
    }

    // Малювання гри
    draw() {
        // Очищуємо canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Малюємо пташку
        this.ctx.fillStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.arc(this.bird.x, this.bird.y, 20, 0, Math.PI * 2);
        this.ctx.fill();

        // Малюємо труби
        this.ctx.fillStyle = 'green';
        this.pipes.forEach((pipe) => {
            this.ctx.fillRect(pipe.x, 0, 50, pipe.top);
            this.ctx.fillRect(pipe.x, pipe.bottom, 50, this.canvas.height - pipe.bottom);
        });
    }

    // Рестарт гри
    restartGame() {
        this.bird = { x: 100, y: 300, velocity: 0, gravity: 0.5, jump: -10 };
        this.pipes = [];
        this.score = 0;
        this.gameOver = false;
        this.frameCount = 0;
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('gameOver').style.display = 'none';
    }

    // Основний цикл гри
    gameLoop() {
        if (!this.gameOver) {
            this.fallBird();
            this.generatePipes();
            this.updatePipes();
            this.updateScore();
            this.checkGameOver();
            this.draw();
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}
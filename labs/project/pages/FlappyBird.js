export class FlappyBird {
    constructor(containerId) {
        this.containerId = containerId;
        this.canvas = null;
        this.ctx = null;
        
        this.birdFrames = [];
        this.currentFrame = 1;
        this.loadBirdFrames([
            './images/bird-up.svg',
            './images/bird-logo.svg',
            './images/bird-down.svg'
        ]);

        this.bird = { x: 100, y: 300, velocity: 0, gravity: 0.5, jump: -7.5 };
        this.pipes = [];
        this.score = 0;
        this.gameOver = false;
        this.pipeGap = 150;
        this.pipeSpeed = 2;
        this.pipeFrequency = 100;
        this.frameCount = 0;
    }

    loadBirdFrames(srcArray) {
        srcArray.forEach(src => {
            const img = new Image();
            img.src = src;
            this.birdFrames.push(img);
        });
    }

    jumpBird() {
        this.bird.velocity = this.bird.jump;
        this.currentFrame = 0;
    }

    fallBird() {
        this.bird.velocity += this.bird.gravity;
        this.bird.y += this.bird.velocity;

        if (this.bird.velocity > 0) {
            this.currentFrame = 2;
        } else if (this.bird.velocity < 0) {
            this.currentFrame = 0;
        } else {
            this.currentFrame = 1;
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const size = 40;
        const img = this.birdFrames[this.currentFrame];
        this.ctx.drawImage(
            img,
            this.bird.x - size/2,
            this.bird.y - size/2,
            size,
            size
        );
        
        this.ctx.fillStyle = 'green';
        this.pipes.forEach((pipe) => {
            this.ctx.fillRect(pipe.x, 0, 50, pipe.top);
            this.ctx.fillRect(pipe.x, pipe.bottom, 50, this.canvas.height - pipe.bottom);
        });
    }


    renderGame() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error('Container not found');
            return;
        }
        
        container.innerHTML = `
            <canvas id="flappyCanvas" width="400" height="600"></canvas>
            <div id="gameOver" style="display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: red; font-size: 24px;">
                Game Over!<br>Score: <span id="finalScore">0</span><br>Press Space to Restart
            </div>
        `;

        this.canvas = document.getElementById('flappyCanvas');
        this.ctx = this.canvas.getContext('2d');

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

        this.addJumpEventListener();
        this.addRestartEventListener();

        this.gameLoop();
    }

    addJumpEventListener() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && !this.gameOver) {
                this.jumpBird();
            }
        });

        document.addEventListener('click', (e) => {
            if (!this.gameOver) {
                e.preventDefault();
                this.jumpBird();
            }
        });
        
        document.getElementById("flappyCanvas").addEventListener('touchstart', (e) => {
            if (!this.gameOver) {
                e.preventDefault();
                this.jumpBird();
            }
        });
    }

    addRestartEventListener() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.gameOver) {
                this.restartGame();
            }
        });
    }
    
    updateScore() {
        this.pipes.forEach((pipe) => {
            if (!pipe.passed && pipe.x < this.bird.x) {
                this.score += 1;
                pipe.passed = true;
            }
        });
    }
    
    checkGameOver() {
        if (this.bird.y > this.canvas.height - 20 || this.bird.y < 0) {
            this.gameOver = true;
        }
        
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
    
    updatePipes() {
        this.pipes.forEach((pipe) => {
            pipe.x -= this.pipeSpeed;
        });
        this.pipes = this.pipes.filter((pipe) => pipe.x > -50);
    }
    
    restartGame() {
        this.bird = { x: 100, y: 300, velocity: 0, gravity: 0.5, jump: -7.5 };
        this.pipes = [];
        this.score = 0;
        this.gameOver = false;
        this.frameCount = 0;
        document.getElementById('gameOver').style.display = 'none';
        document.getElementById('score').textContent = `Score: ${this.score}`;
    }
    
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
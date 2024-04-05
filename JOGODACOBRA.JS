document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');

    const canvasWidth = canvas.width = 400;
    const canvasHeight = canvas.height = 400;
    const blockSize = 20;

    let score = 0;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let gameRunning = false;

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = 'green';
        ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

        ctx.fillStyle = 'black';
        snake.forEach((segment) => {
            ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
        });

        scoreDisplay.textContent = 'Pontuação: ' + score;
    }

    function update() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * (canvasWidth / blockSize)),
                y: Math.floor(Math.random() * (canvasHeight / blockSize))
            };
        } else {
            snake.pop();
        }

        if (head.x < 0 || head.x >= canvasWidth / blockSize || head.y < 0 || head.y >= canvasHeight / blockSize) {
            gameOver();
        }

        if (snake.some(segment => segment.x === head.x && segment.y === head.y && segment !== head)) {
            gameOver();
        }
    }

    function gameOver() {
        clearInterval(gameInterval);
        gameRunning = false;
        alert('Fim de jogo! Sua pontuação: ' + score);
        score = 0;
        snake = [{ x: 10, y: 10 }];
        dx = 0;
        dy = 0;
        food = { x: 15, y: 15 };
        startButton.disabled = false;
    }

    let gameInterval;
    startButton.addEventListener('click', () => {
        if (!gameRunning) {
            gameInterval = setInterval(() => {
                update();
                draw();
            }, 100);
            startButton.disabled = true;
            gameRunning = true;
        }
    });

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (dy === 0) {
                    dx = 0;
                    dy = -1;
                }
                break;
            case 'ArrowDown':
                if (dy === 0) {
                    dx = 0;
                    dy = 1;
                }
                break;
            case 'ArrowLeft':
                if (dx === 0) {
                    dx = -1;
                    dy = 0;
                }
                break;
            case 'ArrowRight':
                if (dx === 0) {
                    dx = 1;
                    dy = 0;
                }
                break;
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const speedDisplay = document.getElementById("speed");
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('startButton');
    const speedUpButton = document.getElementById('speedUp');
    const slowDownButton = document.getElementById('slowDown');

    const canvasWidth = canvas.width = 400;
    const canvasHeight = canvas.height = 400;
    const blockSize = 20;

    let score = 0;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let gameRunning = false;
    let speed = 200; // Intervalo de atualização inicial (em milissegundos)
    let gameInterval;

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#f0f0f0'; // Cor de fundo da grade
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Desenhar grade
        ctx.strokeStyle = '#ccc'; // Cor da grade
        for (let i = 0; i <= canvasWidth; i += blockSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvasHeight);
            ctx.stroke();
        }
        for (let i = 0; i <= canvasHeight; i += blockSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvasWidth, i);
            ctx.stroke();
        }

        ctx.fillStyle = 'pink';
        ctx.fillRect(food.x * blockSize, food.y * blockSize, blockSize, blockSize);

        ctx.fillStyle = 'pink';
        snake.forEach((segment) => {
            ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize);
        });

        scoreDisplay.textContent = 'Pontuação: ' + score;
        speedDisplay.textContent = 'Velocidade: ' + (1000 / speed);
    }

    function update() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            if (score % 10 === 0) {
                speed -= 5;
                clearInterval(gameInterval);
                gameInterval = setInterval(() => {
                    update();
                    draw();
                }, speed);
            }
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

    function startGame() {
        if (!gameRunning) {
            gameInterval = setInterval(() => {
                update();
                draw();
            }, speed);
            startButton.disabled = true;
            gameRunning = true;
        }
    }

    startButton.addEventListener('click', startGame);

    slowDownButton.addEventListener('click', () => {
        speed += 5; // Diminui a velocidade
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            update();
            draw();
        }, speed);
    });

    speedUpButton.addEventListener('click', () => {
        speed -= 5; // Aumenta a velocidade
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            update();
            draw();
        }, speed);
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


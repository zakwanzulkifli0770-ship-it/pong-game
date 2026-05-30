// Game Constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const PADDLE_HEIGHT = 80;
const PADDLE_WIDTH = 15;
const BALL_SIZE = 12;
const PADDLE_SPEED = 6;
const BALL_SPEED = 5;
const AI_SPEED = 4;

// Game Objects
const playerPaddle = document.getElementById('playerPaddle');
const computerPaddle = document.getElementById('computerPaddle');
const ball = document.getElementById('ball');
const playerScoreDisplay = document.getElementById('playerScore');
const computerScoreDisplay = document.getElementById('computerScore');
const gameBoard = document.querySelector('.game-board');

// Game State
let playerScore = 0;
let computerScore = 0;
let ballX = GAME_WIDTH / 2;
let ballY = GAME_HEIGHT / 2;
let ballSpeedX = BALL_SPEED;
let ballSpeedY = BALL_SPEED;
let playerY = GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2;
let computerY = GAME_HEIGHT / 2 - PADDLE_HEIGHT / 2;
let mouseY = GAME_HEIGHT / 2;
let playerMoveUp = false;
let playerMoveDown = false;

// Event Listeners
document.addEventListener('mousemove', (e) => {
    const boardRect = gameBoard.getBoundingClientRect();
    mouseY = e.clientY - boardRect.top;
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') playerMoveUp = true;
    if (e.key === 'ArrowDown') playerMoveDown = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp') playerMoveUp = false;
    if (e.key === 'ArrowDown') playerMoveDown = false;
});

// Update player paddle position based on mouse or keyboard
function updatePlayerPaddle() {
    // Keyboard control (priority over mouse if both are active)
    if (playerMoveUp) {
        playerY = Math.max(0, playerY - PADDLE_SPEED);
    } else if (playerMoveDown) {
        playerY = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, playerY + PADDLE_SPEED);
    } else {
        // Mouse control
        const targetY = mouseY - PADDLE_HEIGHT / 2;
        playerY = Math.max(0, Math.min(GAME_HEIGHT - PADDLE_HEIGHT, targetY));
    }
    
    playerPaddle.style.top = playerY + 'px';
}

// AI for computer paddle
function updateComputerPaddle() {
    const computerCenter = computerY + PADDLE_HEIGHT / 2;
    const paddleSpeed = AI_SPEED;
    
    if (computerCenter < ballY - 35) {
        computerY = Math.min(GAME_HEIGHT - PADDLE_HEIGHT, computerY + paddleSpeed);
    } else if (computerCenter > ballY + 35) {
        computerY = Math.max(0, computerY - paddleSpeed);
    }
    
    computerPaddle.style.top = computerY + 'px';
}

// Update ball position
function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Ball collision with top and bottom walls
    if (ballY <= 0 || ballY >= GAME_HEIGHT - BALL_SIZE) {
        ballSpeedY = -ballSpeedY;
        ballY = Math.max(0, Math.min(GAME_HEIGHT - BALL_SIZE, ballY));
    }
    
    // Ball collision with paddles
    // Player paddle collision
    if (
        ballX <= PADDLE_WIDTH + 10 &&
        ballY + BALL_SIZE >= playerY &&
        ballY <= playerY + PADDLE_HEIGHT
    ) {
        ballSpeedX = -ballSpeedX;
        ballX = PADDLE_WIDTH + 10;
        
        // Add spin based on where ball hits paddle
        const hitPos = (ballY - playerY) / PADDLE_HEIGHT;
        ballSpeedY += (hitPos - 0.5) * 4;
    }
    
    // Computer paddle collision
    if (
        ballX >= GAME_WIDTH - PADDLE_WIDTH - 10 - BALL_SIZE &&
        ballY + BALL_SIZE >= computerY &&
        ballY <= computerY + PADDLE_HEIGHT
    ) {
        ballSpeedX = -ballSpeedX;
        ballX = GAME_WIDTH - PADDLE_WIDTH - 10 - BALL_SIZE;
        
        // Add spin based on where ball hits paddle
        const hitPos = (ballY - computerY) / PADDLE_HEIGHT;
        ballSpeedY += (hitPos - 0.5) * 4;
    }
    
    // Ball out of bounds (scoring)
    if (ballX < 0) {
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        resetBall();
    } else if (ballX > GAME_WIDTH) {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        resetBall();
    }
    
    // Update ball position on screen
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
}

// Reset ball to center
function resetBall() {
    ballX = GAME_WIDTH / 2;
    ballY = GAME_HEIGHT / 2;
    ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * BALL_SPEED;
    ballSpeedY = (Math.random() - 0.5) * BALL_SPEED * 2;
}

// Main game loop
function gameLoop() {
    updatePlayerPaddle();
    updateComputerPaddle();
    updateBall();
    
    // Limit ball speed
    const maxSpeed = BALL_SPEED * 2;
    if (Math.abs(ballSpeedY) > maxSpeed) {
        ballSpeedY = (ballSpeedY > 0 ? 1 : -1) * maxSpeed;
    }
    
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
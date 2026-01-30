// --- Tic Tac Toe Logic ---
let currentPlayer = '🦀'; 
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function makeMove(cell, index) {
    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        cell.innerText = currentPlayer;
        
        if (checkWin()) {
            document.getElementById('ttt-board').style.pointerEvents = 'none';
            alert(`Player ${currentPlayer} Wins!`);
            gameActive = false;
            return;
        }
        
        if (!gameBoard.includes("")) {
            alert("It's a Draw!");
            gameActive = false;
            return;
        }
        
        currentPlayer = (currentPlayer === '🦀') ? '🐟' : '🦀';
    }
}

function checkWin() {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    return wins.some(condition => condition.every(index => gameBoard[index] === currentPlayer));
}

function resetTTT() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = '🦀';
    gameActive = true;
    const board = document.getElementById('ttt-board');
    if (board) board.style.pointerEvents = 'auto';
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = "");
}

// --- Trivia Logic ---
function answer(isCorrect) {
    const result = document.getElementById('quiz-result');
    if (!result) return;
    if (isCorrect) {
        result.innerText = "Correct! The Lighthouse is on Small Mountain.";
        result.style.color = "#8fe3cf";
    } else {
        result.innerText = "Oops! Try again.";
        result.style.color = "#ff7f50";
    }
}

// --- EXTRA SMOOTH Horizontal Scroll Logic ---
(function initHorizontalScroll() {
    const scrollContainer = document.querySelector("#scroll-container");

    if (scrollContainer) {
        scrollContainer.addEventListener("wheel", (evt) => {
            if (evt.deltaY !== 0) {
                evt.preventDefault();
                // Smoothly scroll horizontally based on wheel movement
                scrollContainer.scrollTo({
                    left: scrollContainer.scrollLeft + (evt.deltaY * 3), 
                    behavior: "smooth"
                });
            }
        }, { passive: false });
    }
})();
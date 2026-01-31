document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Animations
    AOS.init({ once: true });

    // --- Tic-Tac-Toe Logic ---
    let currentPlayer = '🦀'; 
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const board = document.getElementById('ttt-board');
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('reset-ttt');
    const winMsg = document.getElementById('win-msg');

    // M1: Function to handle moves (Logic Explained in Chapter 4)
    function makeMove(cell, index) {
        if (gameBoard[index] === "" && gameActive) {
            gameBoard[index] = currentPlayer;
            cell.innerText = currentPlayer;
            
            if (checkWin()) {
                board.style.pointerEvents = 'none';
                setTimeout(() => alert(`Player ${currentPlayer} Wins!`), 100);
                if (winMsg) winMsg.classList.remove('d-none');
                gameActive = false;
                return;
            }
            
            if (!gameBoard.includes("")) {
                setTimeout(() => alert("It's a Draw!"), 100);
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
        board.style.pointerEvents = 'auto';
        if (winMsg) winMsg.classList.add('d-none');
        cells.forEach(cell => cell.innerText = "");
    }

    // Attach Event Listeners (Fixes CSP Inline Script Error)
    cells.forEach((cell, idx) => {
        cell.addEventListener('click', () => makeMove(cell, idx));
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', resetTTT);
    }

    // --- Extra Smooth Horizontal Scroll Logic ---
    const scrollContainer = document.querySelector("#scroll-container");
    if (scrollContainer) {
        scrollContainer.addEventListener("wheel", (evt) => {
            if (evt.deltaY !== 0) {
                evt.preventDefault();
                scrollContainer.scrollTo({
                    left: scrollContainer.scrollLeft + (evt.deltaY * 3), 
                    behavior: "smooth"
                });
            }
        }, { passive: false });
    }
});

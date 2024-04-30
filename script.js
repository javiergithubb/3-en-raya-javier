$(document).ready(function() {
    const X_CLASS = 'roberto';
    const O_CLASS = 'noel';
    const WINNING_COMBINATIONS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    const cells = document.querySelectorAll('[data-cell]');
    const board = document.querySelector('.board');
    const status = document.querySelector('.status');
    const restartBtn = document.querySelector('.restart-btn');
    let xTurn = true;
  
    startGame();
  
    restartBtn.addEventListener('click', startGame);
  
    function startGame() {
      xTurn = true;
      cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
        cell.innerText = '';
      });
      setStatus('Turno de Roberto');
    }
  
    function handleClick(e) {
      const cell = e.target;
      const currentClass = xTurn ? X_CLASS : O_CLASS;
      placeMark(cell, currentClass);
      if (checkWin(currentClass)) {
        endGame(false);
      } else if (isDraw()) {
        endGame(true);
      } else {
        swapTurns();
        setStatus(`Turno de ${xTurn ? 'Roberto' : 'Noel'}`);
      }
    }
  
    function placeMark(cell, currentClass) {
      cell.classList.add(currentClass);
      cell.innerText = currentClass === X_CLASS ? 'X' : 'O';
    }
  
    function swapTurns() {
      xTurn = !xTurn;
    }
  
    function setStatus(message) {
      status.innerText = message;
    }
  
    function checkWin(currentClass) {
      return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
          return cells[index].classList.contains(currentClass);
        });
      });
    }
  
    function isDraw() {
      return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
      });
    }
  
    function endGame(draw) {
      if (draw) {
        setStatus('Empate!');
      } else {
        setStatus(`${xTurn ? 'Roberto' : 'Noel'} gana!`);
      }
      cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
      });
    }
  });
  
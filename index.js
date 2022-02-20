window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const displayPlayer = document.querySelector('.displayPlayer');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    let currentPlayer = 'X';
    let gameActive = true;
    let board = ['', '', '', '', '', '', '', '', '']
    const X = 'X_wins';
    const O = 'O_wins';
    const Tie = 'Tie';
console.log(tiles)
    const winningTiles = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index))
    });
    
    
        
    const userAction = (tile, index) => {
        if(isValid(tile) && gameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            resultValidation();
            changePlayer();
        }
    }
    const isValid = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };
    const changePlayer = () => {
        displayPlayer.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayPlayer.innerText = currentPlayer;
        displayPlayer.classList.add(`player${currentPlayer}`);
    }
    const announce = (type) => {
        switch(type){
            case O:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Wins!';
                break;
            case X:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Wins!';
                break;
            case Tie:
                announcer.innerText = 'Tie!';
            }
        announcer.classList.remove('hide');
    }
    function resultValidation (){
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winner = winningTiles[i];
            const a = board[winner[0]];
            const b = board[winner[1]];
            const c = board[winner[2]];
            if(a === '' || b === '' || c === ''){
                continue;
            }
            if(a === b && b === c){
                roundWon = true;
                break;
            }
        }
        if(roundWon){
            announce(currentPlayer === 'X' ? X : O);
            gameActive = false;
            return;
        }
        if(!board.includes(''))
            announce(Tie);
        }
    const resetBoard = () => {
        board = ['','','','','','','','',''];
        gameActive = true;
        announcer.classList.add('hide');

        if(currentPlayer === 'O'){
            changePlayer();
        }
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
    
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };
    resetButton.addEventListener('click', resetBoard);
});
    
    

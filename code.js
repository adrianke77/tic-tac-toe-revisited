var board = [null, null, null, null, null, null, null, null, null]
// null = no moves, 1 = playerOne move, 2 = playerTwo move

var currentPlayer = 1

makeListeners()

function makeListeners () {
  board.forEach(function (element ,index ,array ) {
    $(".b" + index).on("click",function () { playTurn(index) } )
  })
  $(".restartButton").on("click", restart)
}

function updatePlayerIndicator() {
  var playerSymbol
  playerSymbol = 
    currentPlayer === 1 ?
      "O" : "X"
  $(".turnIndicator").text("Player " + playerSymbol + "'s turn!")
}


function restart () {
  console.log("restart triggered")
  for (i = 0; i < board.length; i++) {
    board[i] = null
    $(".b"+i).text("") 
  }
  currentPlayer = 1
  console.log("current player set to 1")
  updatePlayerIndicator()
}

function playTurn (index) {
  if ((board[index] !== null) || (isGameOver() === true)) {
    return false
  }
  console.log("Player " + currentPlayer + " marks on " + index)
  board[index] = currentPlayer  // currentPlayer fills board[i] spot with its mark
  if (currentPlayer === 1) { 
    $(".b"+index).text("O") 
  } else {
    $(".b"+index).text("X") 
  }
  if (whoWon() === 1) {
    alert("Player O won!")
    restart()
    return true
  }
  if (whoWon() === 2) {
    alert("Player X won!")
    restart()
    return true
  }
  if (whoWon() === 3) {
    alert("The game is a draw!")
    restart()
    return true
  } 
  if (currentPlayer === 1) {
    currentPlayer = 2
  } else {
    currentPlayer = 1
  }
  updatePlayerIndicator()
  return true
}

function whoWon () {
  if (board[0] && board[0] === board[3] && board[3] === board[6]) return board[0];
  if (board[1] && board[1] === board[4] && board[4] === board[7]) return board[1];
  if (board[2] && board[2] === board[5] && board[5] === board[8]) return board[2];
  if (board[0] && board[0] === board[1] && board[1] === board[2]) return board[0];
  if (board[3] && board[3] === board[4] && board[4] === board[5]) return board[3];
  if (board[6] && board[6] === board[7] && board[7] === board[8]) return board[6];
  if (board[0] && board[0] === board[4] && board[4] === board[8]) return board[0];
  if (board[2] && board[2] === board[4] && board[4] === board[6]) return board[2];
  if (isBoardFull()) return 3;
  return 0
}


function isBoardFull () { 
  if (board[0] && board[1] && board[2] && board[3] && board[4] 
    && board[5] && board[6] && board[7] && board[8]) {
    return true
}
return false
}

function isGameOver () {
  if (isBoardFull() || whoWon() !== 0) {
    return true
  }
  return false
}


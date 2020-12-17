var activePlayer;
var gameMode;
var playField;
var adjacentFields;
var toCheck;
var winner;
var winResultField;
var symbol;
var row;
var col;

function initiateGame() {
  //Get Game Mode
  var select = document.getElementById("game_mode_selection");
  gameMode = select.options[select.selectedIndex].value;

  //Set active Player
  activePlayer = 'player_1';

  //Initialize play field
  //TODO Change all to zero
  playField = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  toCheck = [
    [{
      r: 0,
      c: 0
    }, {
      r: 0,
      c: 1
    }, {
      r: 0,
      c: 2
    }],
    [{
      r: 1,
      c: 0
    }, {
      r: 1,
      c: 1
    }, {
      r: 1,
      c: 2
    }],
    [{
      r: 2,
      c: 0
    }, {
      r: 2,
      c: 1
    }, {
      r: 2,
      c: 2
    }],
    [{
      r: 0,
      c: 0
    }, {
      r: 1,
      c: 0
    }, {
      r: 2,
      c: 0
    }],
    [{
      r: 0,
      c: 1
    }, {
      r: 1,
      c: 1
    }, {
      r: 2,
      c: 1
    }],
    [{
      r: 0,
      c: 2
    }, {
      r: 1,
      c: 2
    }, {
      r: 2,
      c: 2
    }],
    [{
      r: 0,
      c: 0
    }, {
      r: 1,
      c: 1
    }, {
      r: 2,
      c: 2
    }],
    [{
      r: 2,
      c: 0
    }, {
      r: 1,
      c: 1
    }, {
      r: 0,
      c: 2
    }],
  ]

  adjacentFields = [
    [
      [{
        r: 0,
        c: 1
      }, {
        r: 1,
        c: 1
      }, {
        r: 1,
        c: 0
      }],
      [{
        r: 0,
        c: 0
      }, {
        r: 1,
        c: 1
      }, {
        r: 0,
        c: 2
      }],
      [{
        r: 0,
        c: 1
      }, {
        r: 1,
        c: 1
      }, {
        r: 1,
        c: 2
      }]
    ],
    [
      [{
        r: 0,
        c: 0
      }, {
        r: 1,
        c: 1
      }, {
        r: 2,
        c: 0
      }],
      [{
        r: 0,
        c: 0
      }, {
        r: 0,
        c: 1
      }, {
        r: 0,
        c: 2
      }, {
        r: 1,
        c: 0
      }, {
        r: 1,
        c: 2
      }, {
        r: 2,
        c: 0
      }, {
        r: 2,
        c: 1
      }, {
        r: 2,
        c: 2
      }],
      [{
        r: 0,
        c: 2
      }, {
        r: 1,
        c: 1
      }, {
        r: 2,
        c: 2
      }]
    ],
    [
      [{
        r: 1,
        c: 0
      }, {
        r: 1,
        c: 1
      }, {
        r: 2,
        c: 1
      }],
      [{
        r: 2,
        c: 0
      }, {
        r: 1,
        c: 1
      }, {
        r: 2,
        c: 2
      }],
      [{
        r: 2,
        c: 1
      }, {
        r: 1,
        c: 1
      }, {
        r: 1,
        c: 2
      }]
    ]
  ];

  //Other inits
  winResultField = document.getElementById('win_result');
  winner = false;
}

function play(fieldID) {
  //Get index/coordinates of clicked field
  row = fieldID.charAt(1);
  col = fieldID.charAt(2);

  //Only do game logic, if field isn't already occupied and nobody has won until now
  if (playField[row][col] == 0 && !winner) {
    if (gameMode == 'friend') {
      if (activePlayer == 'player_1') {
        symbol = 'X';
        activePlayer = 'player_2';
      } else {
        symbol = 'O';
        activePlayer = 'player_1';
      }
      drawSymbol(fieldID, row, col, symbol);
      checkWin();
      changeToActivePlayer(activePlayer);
    } else if (gameMode == 'bot') {
      //PLAYER
      symbol = 'X';
      drawSymbol(fieldID, row, col, symbol);
      checkWin();
      changeToActivePlayer('player_2');

      //BOT
      //TODO prevent click event while bot's turn
      //Only do bot move if there is no winner
      if (!winner) {
        symbol = 'O';
        var botField = getBotField();
        row = botField.r;
        col = botField.c;
        fieldID = 'f' + row + col;
        setTimeout(function() {
          drawSymbol(fieldID, row, col, symbol);
          checkWin();
          changeToActivePlayer('player_1');
        }, 1000);
      }
    }
  }
}

function startNewGame() {
  initiateGame();
  //Reset playerField
  var fields = document.getElementById('play_field').children;
  for (var i = 0; i < fields.length; i++) {
    document.getElementById(fields[i].id).innerHTML = '';
  }

  //Highlight active Player with bold text
  var players = document.getElementById('players').children[0].children;
  for (var i = 0; i < players.length; i++) {
    document.getElementById(players[i].id).classList.remove("active");
  }
  document.getElementById(activePlayer).classList.add('active');

  //Hide win result
  winResultField.style.zIndex = '-1';
}

/**
 * Draw symbol and add to field array
 **/
function drawSymbol(id, r, c, symbol) {
  playField[r][c] = symbol;
  document.getElementById(id).innerHTML += symbol;
}

function checkWin() {
  if ((playField[0][0] == playField[1][1] && playField[1][1] == playField[2][2]) && playField[1][1] != 0) {
    //Diagonal
    winner = playField[1][1];
  } else if ((playField[2][0] == playField[1][1] && playField[1][1] == playField[0][2]) && playField[1][1] != 0) {
    //Diagonal
    winner = playField[1][1];
  } else if ((playField[0][0] == playField[0][1] && playField[0][1] == playField[0][2]) && playField[0][1] != 0) {
    //Row 0
    winner = playField[0][1];
  } else if ((playField[1][0] == playField[1][1] && playField[1][1] == playField[1][2]) && playField[1][1] != 0) {
    //Row 1
    winner = playField[1][1];
  } else if ((playField[2][0] == playField[2][1] && playField[2][1] == playField[2][2]) && playField[2][1] != 0) {
    //Row 2
    winner = playField[2][1];
  } else if ((playField[0][0] == playField[1][0] && playField[1][0] == playField[2][0]) && playField[1][0] != 0) {
    //Col 0
    winner = playField[1][0];
  } else if ((playField[0][1] == playField[1][1] && playField[1][1] == playField[2][1]) && playField[1][1] != 0) {
    //Col 1
    winner = playField[1][1];
  } else if ((playField[0][2] == playField[1][2] && playField[1][2] == playField[2][2]) && playField[1][2] != 0) {
    //Col 2
    winner = playField[1][2];
  } else if (!contains(playField, 0)) {
    //Tie if field is full and no one wins
    winner = 'both'
  }

  if (winner) {
    if (winner == 'X') {
      winResultField.innerHTML = 'Winner is X';
    } else if (winner == 'O') {
      winResultField.innerHTML = 'Winner is O';
    } else {
      winResultField.innerHTML = 'Tie';
    }
    winResultField.style.zIndex = "1";
  }
}

//Show new active Player with bold text highlight
function changeToActivePlayer(newActive) {
  var players = document.getElementById('players').children[0].children;
  for (var i = 0; i < players.length; i++) {
    document.getElementById(players[i].id).classList.remove("active");
  }
  document.getElementById(newActive).classList.add('active');
}

function getBotField() {
  //Random field pick
  /*
  var botRow = Math.floor(Math.random() * 3);
  var botCol = Math.floor(Math.random() * 3);

  //Do reroll while field is not empty
  while (playField[botRow][botCol] != 0) {
    var botRow = Math.floor(Math.random() * 3);
    var botCol = Math.floor(Math.random() * 3);
  } */

  //Init
  var botRow = 0;
  var botCol = 0;
  var stop = false;
  var ctr = 0;


  //1. first check: possible to win, already 2 in a row
  for (var i = 0; i < toCheck.length; i++) {
    for (var j = 0; j < toCheck[i].length; j++) {
      var r = toCheck[i][j].r;
      var c = toCheck[i][j].c;
      //console.log('Checking: ' + r + ', ' + c);

      if (playField[r][c] == 'O') {
        ctr += 1;
      }

      if (ctr == 2) {
        //console.log('ctr == 2');
        for (var k = 0; k < toCheck[i].length; k++) {
          var r = toCheck[i][k].r;
          var c = toCheck[i][k].c;
          //console.log('Check_2: ' + r + ', ' + c);

          for (var l = 0; l < 3; l++) {
            if (playField[r][c] == 0) {
              return {
                r: r,
                c: c,
              }
            }
          }
        }
      }
    }
    ctr = 0;
  }
  ctr = 0;

  //2. check: possiblility to block player from winning
  for (var i = 0; i < toCheck.length; i++) {
    for (var j = 0; j < toCheck[i].length; j++) {
      var r = toCheck[i][j].r;
      var c = toCheck[i][j].c;
      console.log('Checking: ' + r + ', ' + c);

      if (playField[r][c] == 'X') {
        ctr += 1;
      }

      if (ctr == 2) {
        console.log('ctr == 2');
        for (var k = 0; k < toCheck[i].length; k++) {
          var r = toCheck[i][k].r;
          var c = toCheck[i][k].c;
          console.log('Check_2: ' + r + ', ' + c);

          for (var l = 0; l < 3; l++) {
            if (playField[r][c] == 0) {
              return {
                r: r,
                c: c,
              }
            }
          }
        }
      }
    }
    ctr = 0;
  }
  ctr = 0;


  //3. adjacent field empty
  for (var i = 0; i < playField.length; i++) {
    for (var j = 0; j < playField.length; j++) {
      if (playField[i][j] == 'O') {
        for (var k = 0; k < adjacentFields[i][j].length; k++) {
          console.log('AdjacentFields: ' + adjacentFields[i][j][k].r + ', ' + adjacentFields[i][j][k].c);
          if (playField[adjacentFields[i][j][k].r][adjacentFields[i][j][k].c] == '0') {
            return {
              r: adjacentFields[i][j][k].r,
              c: adjacentFields[i][j][k].c,
            }
          }
        }
      }
    }
  }

  //4. Else take empty field
  for (var i = 0; i < playField.length; i++) {
    for (var j = 0; j < playField.length; j++) {
      if (playField[i][j] == 0) {
        return {
          r: i,
          c: j,
        }
      }
    }
  }
}

/**
 * Helper Function
 **/
function contains(arr, element) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      if (arr[i][j] == element) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Helper Function
 **/
function printArray(arr) {
  var output = '';
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      output += arr[i][j] + ' ';
    }
    output += '\n';
  }
  console.log(output);
}

/**
 * Helper Function
 **/
function equals(n1, n2, n3) {
  if (n1 == n2 && n2 == n3) {
    return true;
  }
  return false;
}


//----------TESTING-------------------------------------------------------------
function test() {



}
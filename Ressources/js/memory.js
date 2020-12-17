var imgIDs = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14];
var flippedCardsAmount;
var moveAmount;
var reverseMove;
var cardCtr;
var playField;
var foundPairsCtr;
var first;
var sec;
var waiting;
var theme;

//Game Logic
$(document).ready(function() {
  $('.card').click(function() {
    if (!waiting) {

      //Rotating (Reveals 2 cards)
      /*
      //Player need to flip each open card
      if ($(this).hasClass('show_info') && !($(this).hasClass('finished'))) {
        $(this).removeClass('show_info open');
        flippedCardsAmount -= 1;
        if (reverseMove && flippedCardsAmount == 0) {
          reverseMove = false;
        }
      } else {
        if (flippedCardsAmount < 2 && !reverseMove && !($(this).hasClass('finished'))) {
          $(this).addClass('show_info open');
          flippedCardsAmount += 1;
        }
      } */

      //Auto hide cards on "3.click"
      if (!$(this).hasClass('show_info') && !($(this).hasClass('finished'))) {
        if (flippedCardsAmount + 1 == 3) {
          flippedCardsAmount = 0;
          $('.open').removeClass('show_info open');
        }
        $(this).addClass('show_info open');
        flippedCardsAmount += 1;
      }
      console.log(flippedCardsAmount);


      if (flippedCardsAmount == 2) {
        moveAmount += 1;
        reverseMove = true;

        //Check if both cards have same image
        var shownCards = document.getElementsByClassName("open");

        first = shownCards[0];
        var card1Row = first.id.charAt(4);
        var card1Col = first.id.charAt(5);

        sec = shownCards[1];
        var card2Row = sec.id.charAt(4);
        var card2Col = sec.id.charAt(5);
        if (playField[card1Row][card1Col] == playField[card2Row][card2Col]) {
          waiting = true;
          setTimeout(function() {
            //Make card pair invisible and unclickable
            first.style.opacity = '0.1';
            sec.style.opacity = '0.1';
            reverseMove = false;
            flippedCardsAmount = 0;
            waiting = false;
          }, 1000);
          first.classList.add("finished");
          first.classList.remove("open");
          sec.classList.add("finished");
          sec.classList.remove("open");
          foundPairsCtr += 1;
          if (foundPairsCtr == 15) {
            //Win screen
            document.getElementById('win_screen').style.display = 'block';
            document.getElementById('score').innerHTML = 'Score: ' + moveAmount;
          }
        }
      }
    }
  });
});

//Add Card
function addCard(r, c) {
  var front = document.createElement('div');
  front.className = 'front';

  var back = document.createElement('div');
  back.className = 'back';
  back.style.backgroundImage = "url('./content/cards/" + imgIDs[cardCtr] + ".png')";
  playField[r][c] = imgIDs[cardCtr];

  var card = document.createElement('div');
  card.id = 'card' + r + c;
  card.className = 'card';

  card.appendChild(front);
  card.appendChild(back);
  document.getElementById('playField').children[0].appendChild(card);
  cardCtr += 1
}

//Initiate Game with 30 Cards
function initiateGame() {
  //Init variables
  flippedCardsAmount = 0;
  moveAmount = 0;
  reverseMove = false;
  cardCtr = 0;
  foundPairsCtr = 0;
  waiting = false;
  theme = 'light';

  playField = [
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
  ];

  //Shuffle card img
  shuffle(imgIDs);

  //Hide win screen
  document.getElementById('win_screen').style.display = 'none';

  //Remove all old cards
  var elemToDelete = document.getElementsByClassName('card');
  while (elemToDelete.length > 0) {
    elemToDelete[0].parentNode.removeChild(elemToDelete[0]);
  }

  //Add cards to playField
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 6; j++) {
      addCard(i, j);
    }
  }

  //Testing
  console.log(playField);
}

//Shuffles array
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

//Start new Game
function newGame() {
  location.reload();
}

//Change color theme
function changeTheme(newTheme) {
  if (newTheme == 'light' && theme != 'light') {
    theme = 'light';
    document.getElementsByTagName('body')[0].classList.remove('dark_theme_bg');
    document.getElementById('dark_theme').classList.remove('dark_theme_switcher_d');
    document.getElementById('main_headline').classList.remove('dark_theme_font_color');
    document.getElementById('themes_headline').classList.remove('dark_theme_font_color');
    var cardsToChange = document.getElementsByClassName('card');
    for (var i = 0; i < cardsToChange.length; i++) {
      cardsToChange[i].classList.remove('dark_theme_bg');
    }
    cardsToChange = document.getElementsByClassName('front');
    for (var i = 0; i < cardsToChange.length; i++) {
      cardsToChange[i].classList.remove('dark_theme_card_front');
    }
  } else if (newTheme == 'dark' && theme != 'dark') {
    theme = 'dark';
    document.getElementsByTagName('body')[0].classList.add('dark_theme_bg');
    document.getElementById('dark_theme').classList.add('dark_theme_switcher_d');
    document.getElementById('main_headline').classList.add('dark_theme_font_color');
    document.getElementById('themes_headline').classList.add('dark_theme_font_color');
    var cardsToChange = document.getElementsByClassName('card');
    for (var i = 0; i < cardsToChange.length; i++) {
      cardsToChange[i].classList.add('dark_theme_bg');
    }
    cardsToChange = document.getElementsByClassName('front');
    for (var i = 0; i < cardsToChange.length; i++) {
      cardsToChange[i].classList.add('dark_theme_card_front');
    }
  }
}
var imgIDs = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
var flippedCardsAmount;
var moveAmount;
var reverseMove;
var cardCtr;
var playField;
var foundPairsCtr;
var first;
var sec;
var waiting;

//Game Logic
$(document).ready(function() {
    $("#playField").on("click", ".card", function() {
        if (!waiting) {
            //Auto hide second card if 2 cards are flipped and click on one of them
            if ($(this).hasClass('show_info') && flippedCardsAmount == 2) {
                clickedCardID = $(this)[0].id;
                if ($('.open')[0].id != $(this)[0].id) {
                    $('#' + $('.open')[0].id).removeClass('show_info open');
                } else {
                    $('#' + $('.open')[1].id).removeClass('show_info open');
                }
                flippedCardsAmount = 1;
            } else if (!$(this).hasClass('show_info') && !($(this).hasClass('finished'))) {
                //Auto hide both cards on "3.click on other card"
                if (flippedCardsAmount + 1 == 3) {
                    flippedCardsAmount = 0;
                    $('.open').removeClass('show_info open');
                }
                $(this).addClass('show_info open');
                flippedCardsAmount += 1;
            }

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
    back.style.backgroundImage = "url('cards/" + imgIDs[cardCtr] + ".png')";
    playField[r][c] = imgIDs[cardCtr];

    var card = document.createElement('div');
    card.id = 'card' + r + c;
    card.className = 'card';

    card.appendChild(front);
    card.appendChild(back);
    document.getElementById('playField').children[0].appendChild(card);
    cardCtr += 1
}

//Initiate Game with 20 Cards
function initiateGame() {
    //Init variables
    flippedCardsAmount = 0;
    moveAmount = 0;
    reverseMove = false;
    cardCtr = 0;
    foundPairsCtr = 0;
    waiting = false;

    playField = [
        ['x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x'],
    ];

    //Shuffle card img
    shuffle(imgIDs);

    //Remove all old cards
    var elemToDelete = document.getElementsByClassName('card');
    while (elemToDelete.length > 0) {
        elemToDelete[0].parentNode.removeChild(elemToDelete[0]);
    }

    //Add cards to playField
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 5; j++) {
            addCard(i, j);
        }
    }
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
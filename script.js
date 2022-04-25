var gameBoard = document.querySelector(".gameBoard");
var start = document.querySelector("button");
var win = document.querySelector(".win");
var cards = document.getElementsByClassName("cards");
var fCard, sCard;
var count = 0;
var img = document.querySelectorAll(".front");
var imgsrc = ['image/yami.png','image/DMG.png','image/tea.png','image/DMI.png','image/kaiba.png','image/kuriboh.png','image/yami.png','image/DMG.png','image/tea.png','image/DMI.png','image/kaiba.png','image/kuriboh.png'];
imgsrc = imgsrc.sort(()=> Math.random() -0.5);
for(var i=0; i<imgsrc.length; i++)
{
    img[i].src = imgsrc[i];
}

function StartGame()
{
    start.style.display = "none";
    gameBoard.style.display = "block";
}

function winner()
{
    if(count == cards.length)
    {
        setTimeout(function(){
            gameBoard.style.display = "none";
            win.style.display = "block";
        },500);
    }
}

for(var i=0; i<cards.length; i++)
{
    cards[i].addEventListener("click",flipCard);
}

let hasFlippedCard = false;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  this.lastElementChild.style.display = "inline-Block";
    this.firstElementChild.style.display="none";
  if (this.lastElementChild === fCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    fCard = this.lastElementChild;
    return;
  }

  sCard = this.lastElementChild;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = fCard.src == sCard.src;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  fCard.removeEventListener('click', flipCard);
  sCard.removeEventListener('click', flipCard);
  count+=2;
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    fCard.style.display = "none";
    fCard.previousElementSibling.style.display="inline-Block";
    sCard.style.display = "none";
    sCard.previousElementSibling.style.display="inline-Block";
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [fCard, sCard] = [null, null];
  winner();
}

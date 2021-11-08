// Selectors
const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 10;

// Lives count
playerLivesCount.textContent = playerLives;

// Data 16 cards (array of objects)
const getData = () => [
  { imgSrc: "./images/dog1.jpg", name: "dog1"},
  { imgSrc: "./images/dog2.jpg", name: "dog2"},
  { imgSrc: "./images/dog3.jpg", name: "dog3"},
  { imgSrc: "./images/dog4.jpg", name: "dog4"},
  { imgSrc: "./images/dog5.jpg", name: "dog5"},
  { imgSrc: "./images/dog6.jpg", name: "dog6"},
  { imgSrc: "./images/dog7.jpg", name: "dog7"},
  { imgSrc: "./images/dog8.jpg", name: "dog8"},
  { imgSrc: "./images/dog1.jpg", name: "dog1"},
  { imgSrc: "./images/dog2.jpg", name: "dog2"},
  { imgSrc: "./images/dog3.jpg", name: "dog3"},
  { imgSrc: "./images/dog4.jpg", name: "dog4"},
  { imgSrc: "./images/dog5.jpg", name: "dog5"},
  { imgSrc: "./images/dog6.jpg", name: "dog6"},
  { imgSrc: "./images/dog7.jpg", name: "dog7"},
  { imgSrc: "./images/dog8.jpg", name: "dog8"},
];

// Randomise cards function
// sort and inside use the Math.random function
// return the new array object
const randomise = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// Card Generator function
const cardGenerator = () => {
  const cardData = randomise();
  // Generate HTML
  cardData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    // Attach the image source and name to cards
    face.src = item.imgSrc;
    card.setAttribute('name', item.name);
    // Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    // Event listener
    card.addEventListener('click', (e) => {
      card.classList.toggle('toggleCard');
      checkCards(e);
    })
  });
};

// Check cards function
// when clicked (e.target), add a class "flipped"
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  console.log(clickedCard);
  const toggleCard = document.querySelectorAll('.toggleCard');
  // Logic
  // if 2 cards are flipped (length). Check 1st and 2nd card
  if (flippedCards.length === 2 ) {
    if (flippedCards[0].getAttribute('name') ===
        flippedCards[1].getAttribute('name'))
        {
      console.log("match");
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
        // remove flipped, make it unclickable with pointerEvents = none in CSS
      });
    } else {
      console.log('wrong');
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        // by removing classList flipped, the card goes back to unflipped state
        // code and logic runs instantly, delay animation by 1100ms
        setTimeout(() => card.classList.remove('toggleCard'), 1100);
      });
      // reduce the player lives count
      playerLives--;
      playerLivesCount.textContent = playerLives;
      // When it's 0, restart
      if(playerLives === 0) {
        restart('Try again 💔');
      };
    };
  };
  // Run a check if player won
  if (toggleCard.length === 16) {
    restart('Well done! 🎉');
  };
};

// Restart - flip cards to original
const restart = (text) => {
  let cardData = randomise();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  // nothing is clickable until game has reset
  section.style.pointerEvents = 'none';
  // loop over the cards and remove toggleCard
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');
    // Timeout to wait for all cards to flip
    setTimeout(() => {
      // Randomise, add pointerevents, update card name
      cards[index].style.pointerEvents = 'all'
      faces[index].src = item.imgSrc;
      cards[index].setAttribute('name', item.name);
      // return pointer event so it's clickable
      section.style.pointerEvents = 'all';
    }, 1000);
  });
  // update HTML to playerLives = 10
  playerLives = 10;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => alert(text), 100);
}

cardGenerator();


let firstGroup = [[],[]];
let secondGroup = [[], []];
let thirdGroup = [[], []];

const coordinates = {
    "playerOne": [
        firstGroup, secondGroup, thirdGroup, {tries: 0}
    ], 
    "playerTwo": [
        firstGroup, secondGroup, thirdGroup, {tries: 0}
    ]
}

let firstPlayerTurn = true;
let secondPlayerTurn = false;

let firstContainer = [[],[]];
let secondContainer = [[],[]];
let thirdContainer = [[],[]];

let playerOneTries = document.getElementById("tries-player-one");
let playerTwoTries = document.getElementById("tries-player-two");

let shipsRemainingPlayerOne = document.getElementById("remaining-player-one");
let shipsRemainingPlayerTwo = document.getElementById("remaining-player-two");

shipsRemainingPlayerOne.innerText = "Ships remaining: 3";
shipsRemainingPlayerTwo.innerText = "Ships remaining: 3";

const allBoxesPlayerOne = document.querySelectorAll(".player-one");
const allBoxesPlayerTwo = document.querySelectorAll(".player-two");

const winner = document.getElementById("winner");
const turn = document.getElementById("turn");

const shipPositions = (index, coordinates, player) => {
    let randomNum = Math.floor(Math.random() * 26);

    for(let i = 1; i < 26; i++) {
        firstContainer[index].push(i)
    }

    if(randomNum < 23) {
        firstGroup[index] = firstContainer[index].slice(randomNum, randomNum + 3);
    } else if(randomNum === 23) {
        firstGroup[index] = firstContainer[index].slice(21, 24);
    } else if (randomNum >= 24) {
        firstGroup[index] = firstContainer[index].slice(22, 25);
    }
    
    for(let i = 1; i < 26; i++) {
        if(firstGroup[index].includes(i) === false) {
            secondContainer[index].push(i)
        }
    }

    let randomNumTwo = Math.floor(Math.random() * secondContainer[index].length);

    if(randomNumTwo <= 20) {
        secondGroup[index] = secondContainer[index].slice(randomNumTwo, randomNumTwo + 2)
    } else if (randomNumTwo >= 21) {
        secondGroup[index] = secondContainer[index].slice(secondContainer[index].length - 2, 22)
    }
    
    for(let i = 1; i < 26; i++) {
        if(firstGroup[index].includes(i) === false && secondGroup[index].includes(i) === false) {
            thirdContainer[index].push(i);
        }
    }
    
    let randomNumThree = Math.floor(Math.random() * thirdContainer[index].length);
    
    thirdGroup[index] = [thirdContainer[index][randomNumThree]];

    coordinates[player][0] = firstGroup[index];
    coordinates[player][1] = secondGroup[index];
    coordinates[player][2] = thirdGroup[index];

}
  
shipPositions(0, coordinates, "playerOne");
shipPositions(1, coordinates, 'playerTwo');


const shipSunk = () => {
    const shipOnePlayerOne = coordinates['playerOne'][0].length > 0 ? 1 : 0;
    const shipTwoPlayerOne = coordinates['playerOne'][1].length > 0 ? 1 : 0;
    const shipThreePlayerOne = coordinates['playerOne'][2].length > 0 ? 1 : 0;

    const shipOnePlayerTwo = coordinates['playerTwo'][0].length > 0 ? 1 : 0;
    const shipTwoPlayerTwo = coordinates['playerTwo'][1].length > 0 ? 1 : 0;
    const shipThreePlayerTwo = coordinates['playerTwo'][2].length > 0 ? 1 : 0;
    
    shipsRemainingPlayerOne.innerText = `Ships remaining: ${shipOnePlayerOne + shipTwoPlayerOne + shipThreePlayerOne}`;
    shipsRemainingPlayerTwo.innerText = `Ships remaining: ${shipOnePlayerTwo + shipTwoPlayerTwo + shipThreePlayerTwo}`;

    if(shipOnePlayerOne + shipTwoPlayerOne + shipThreePlayerOne === 0) {
        winner.innerText = "Player 1 won!";
        allBoxesPlayerOne.forEach((box) => {
            box.style.pointerEvents = "none"
        })
        allBoxesPlayerTwo.forEach((box) => {
            box.style.pointerEvents = "none"
        })
    } else if (shipOnePlayerTwo + shipTwoPlayerTwo + shipThreePlayerTwo === 0) {
        winner.innerText = "Player 2 won!";
        allBoxesPlayerOne.forEach((box) => {
            box.style.pointerEvents = "none"
        })
        allBoxesPlayerTwo.forEach((box) => {
            box.style.pointerEvents = "none"
        })
    } 
}

const shipHit = (num, location) => {
    if(coordinates[location][0].indexOf(num) > -1) {
        let index = coordinates[location][0].indexOf(num);
        coordinates[location][0].splice(index, 1);
        shipSunk();
    }
    if(coordinates[location][1].indexOf(num) > -1) {
        let index = coordinates[location][1].indexOf(num);
        coordinates[location][1].splice(index, 1);
        shipSunk();
    }
    if(coordinates[location][2].indexOf(num) > -1) {
        let index = coordinates[location][2].indexOf(num);
        coordinates[location][2].splice(index, 1);
        shipSunk();
    }
    
}

const hitOrMiss = (id, location) => {
    firstPlayerTurn = !firstPlayerTurn;
    secondPlayerTurn = !secondPlayerTurn;
    const box = document.getElementById(id);
    let num = Number(box.textContent);
    
    if(firstPlayerTurn === false) {
        allBoxesPlayerOne.forEach((box) => {
            box.style.pointerEvents = "none";
        })
    } else {
        allBoxesPlayerOne.forEach((box) => {
            box.style.pointerEvents = "auto"
        })
    }
    
    if(secondPlayerTurn === false) {
        allBoxesPlayerTwo.forEach((box) => {
            box.style.pointerEvents = "none"
        })
    } else {
        allBoxesPlayerTwo.forEach((box) => {
            box.style.pointerEvents = "auto"
        })
    }
 
  
    if(coordinates[location][0].includes(num) || coordinates[location][1].includes(num) || coordinates[location][2].includes(num)) {
        box.style.backgroundImage = "url('./images/ship1.jpg')";
        coordinates[location][3].tries ++;
        shipHit(num,location);
        box.style.pointerEvents = "none"
         
    } else {
        box.style.backgroundImage = "url('./images/missed.jpg')";
        coordinates[location][3].tries ++;
        box.style.pointerEvents = "none"; 
    }

    playerOneTries.innerText = `Tries: ${coordinates['playerOne'][3].tries}`;
    playerTwoTries.innerText = `Tries: ${coordinates['playerTwo'][3].tries}`;
    turn.innerText = `${firstPlayerTurn ? "Player 1 turn" : "Player 2 turn"}`;
}



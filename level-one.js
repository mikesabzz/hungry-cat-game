/*

Cat Game: Level One

*/

const board = document.querySelector('.board')
//output score
// const scoreElement = document.querySelector('.js-score')

// let score = 0

// const handleClickEvent = function() {
//     if (score < 50) {
//         score += 10
//         scoreElement.innerText = score
//     }
//     else if (score === 50) {
//         alert("Congrats move to level 2!")
//     }
// }
// console.log(handleClickEvent)

//create cat
//create Fish
const fishes = [
    { x: 5, y: 2 },
    { x: 8, y: 3 },
    { x: 1, y: 4 },
    { x: 7, y: 1 }
]
const cat = { x: 0, y: 0 }
const dogs = [{ x: 0, y: 4 },
    { x: 3, y: 2}]

//create Fish


window.onload = function() {

//create coordinates
const isCoordinateInGrid = function (x, y) {
    if (x < 1 || y < 0 || x > 10 || y > 4) {
        return false
    }
    return true
}

let dogElement;
let dogElementArr = document.getElementsByClassName('dog')
console.log(dogElementArr)
for (el in dogs){
    
    dogElement = document.createElement('div')
    dogElement.className = 'dog'
    board.appendChild(dogElement)
}

const moveDog = function(dog) {
    const randomX = Math.floor(Math.random()*3)-1
    const randomY = Math.floor(Math.random()*3)-1
    let proposedX = dogs[0].x + randomX
    let posY = dogs[0].y + randomY
    const aRandomX = Math.floor(Math.random()*3)-1
    const aRandomY = Math.floor(Math.random()*3)-1
    let aProposedX = dogs[1].x + aRandomX
    let aPosY = dogs[1].y + aRandomY
    // call a function to check if (dogs[0].x += Math.floor(Math.random()*3)-1) is inside the board, if it is return true otherwise return false
    if(isCoordinateInGrid(proposedX, posY)) {
        if(isCoordinateInGrid(aProposedX, aPosY)) { 
            // console.log("proposedX: ", proposedX)
            // console.log("dogs[0].x: ", dogs[1].x)
            console.log(dogs[1]);
            
            dogs[0].x += randomX
            dogs[1].x += aRandomX
            dog[0].style.left = dogs[0].x * 100 + 'px'
            dog[1].style.left = dogs[1].x * 100 + 'px'
            
            dogs[0].y += randomY
            dogs[1].y += aRandomY
            dog[0].style.top = dogs[0].y * 100 + 'px'
            dog[1].style.top = dogs[1].y * 100 + 'px'
        }
    }
}

setInterval(function(){
    moveDog(dogElementArr)
}, 200)

//To prevent the dogs from overlapping:
const isThereADogAt = function() {
    for (let i = 0; i < dogs.length; i++) {
        const dog = dogs[i]
        if (dog.proposedX === dog.aProposedX && dog.posY === dog.aPosY) {
            return false
        }
    }
    return true
}
isThereADogAt()


}



///add fish and remove fish
function renderFish() {

    const fishElements = document.querySelectorAll('.fish')
    for(let i = 0; i < fishElements.length; i++) {
        fishElements[i].remove()
    }

    for(let i = 0; i < fishes.length; i++) {
        const fish = fishes[i]
        const fishEl = document.createElement('div')
        fishEl.className = 'fish'
        fishEl.style.left = (fish.x * 100).toString() + 'px'
        fishEl.style.top = (fish.y * 100).toString() + 'px'
        document.querySelector('.board').appendChild(fishEl)
    }
}
renderFish()


const whereIsTheFish = function(x, y) {
    for(let i = 0; i < fishes.length; i++) {
        const fish = fishes[i]
        if(fish.x === x && fish.y === y) {
            return true
        }
    }
    return false
}
whereIsTheFish()

const removeFish = function(x, y) {
    for(let i = 0; i < fishes.length; i++) {
        const fish = fishes[i]
        if(fish.x === x && fish.y === y) {
            fishes.splice(i, 1)
        }
    }
}
removeFish()

//-------> fix




const isCoordinateInGrid = function (x, y) {
    if (x < 0 || y < 0 || x > 10 || y > 4) {
        console.log('Cannot move here!')
        return false
    }
    return true
}

//create a function where cat can move to
//needs more work
const canMoveTo = function (x, y) {
    if(!isCoordinateInGrid(x, y)) {
        return false
    }
    return true
}



//defining the switches:
function moveLeft () {
    if (canMoveTo(cat.x - 1, cat.y)) {
        cat.x -= 1
        moveCatTo(cat.x, cat.y)
    }
}

function moveRight () {
    if (canMoveTo(cat.x + 1, cat.y)) {
        cat.x += 1
        moveCatTo(cat.x, cat.y)
    }
}

function moveUp () {
    if (canMoveTo(cat.x, cat.y - 1)) {
        cat.y -= 1
        moveCatTo(cat.x, cat.y)
    }
}

function moveDown () {
    if (canMoveTo(cat.x, cat.y + 1)) {
        cat.y += 1
        moveCatTo(cat.x, cat.y)
    }
}

/*Defining the move cat to function
Work on this function more
*/
function moveCatTo(x, y) {
    const catElem = document.querySelector('.cat')
    catElem.style.left = (x * 100) + 'px'
    catElem.style.top = (y * 100) + 'px'
    if(whereIsTheFish(x, y)) {
        removeFish(x, y)
        renderFish()
        console.log(`Cat ate a fish. There are ${fishes.length} left.`)
    }
}

//Creating the switches and passing the event object
document.body.addEventListener('keydown', function (event) {
    const keyCode = event.keyCode
    const arrowKeys = [37, 38, 39, 40]
    if (arrowKeys.includes(keyCode)) {
        event.preventDefault()
    }
    switch (keyCode) {
        case 37:
            moveLeft()
            break
        case 38:
            moveUp()
            break
        case 39:
            moveRight()
            break
        case 40:
            moveDown()
            break
    }
}) 





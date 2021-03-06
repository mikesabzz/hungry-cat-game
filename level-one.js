const board = document.querySelector('.board')
const scoreElement = document.querySelector('.js-score')
let score = 0

const fishes = [
    { x: 5, y: 2 },
    { x: 8, y: 3 },
    { x: 1, y: 4 },
    { x: 7, y: 1 }
]
const cat = { x: 0, y: 0 }

const dogs = [
    { x: 3, y: 2 },
    { x: 3, y: 2 }
]

const increaseScore = function () {
    if (score < 100) {
        score += 25
        scoreElement.innerText = score
    }
    if (score === 100) {
        const winModal = document.getElementById("modal-win");
        winModal.style.display = "block";
    }
}

window.onload = function () {

    const isCoordinateInGrid = function (x, y) {
        if (x < 1 || y < 0 || x > 10 || y > 4) {
            return false
        }
        return true
    }

    let dogElement;
    let dogElementArr = document.getElementsByClassName('dog')
    for (el in dogs) {
        dogElement = document.createElement('div')
        dogElement.className = 'dog'
        board.appendChild(dogElement)
    }

    const moveDog = function (dog) { 
        const moveFirstDogAtRandomX = Math.floor(Math.random() * 3) - 1
        const moveFirstDogAtRandomY = Math.floor(Math.random() * 3) - 1
        let positionX = dogs[0].x + moveFirstDogAtRandomX
        let positionY = dogs[0].y + moveFirstDogAtRandomY
        const moveSecondDogAtRandomX = Math.floor(Math.random() * 3) - 1
        const moveSecondDogAtRandomY = Math.floor(Math.random() * 3) - 1
        let secondPositionX = dogs[1].x + moveSecondDogAtRandomX
        let secondPositionY = dogs[1].y + moveSecondDogAtRandomY
        if (isCoordinateInGrid(positionX, positionY)) {
            if (isCoordinateInGrid(secondPositionX, secondPositionY)) {
              
                dogs[0].x += moveFirstDogAtRandomX
                dogs[1].x += moveSecondDogAtRandomX
                dog[0].style.left = dogs[0].x * 100 + 'px'
                dog[1].style.left = dogs[1].x * 100 + 'px'

                dogs[0].y += moveFirstDogAtRandomY
                dogs[1].y += moveSecondDogAtRandomY
                dog[0].style.top = dogs[0].y * 100 + 'px'
                dog[1].style.top = dogs[1].y * 100 + 'px'
            }
        }
    }
    setInterval(function () {
        moveDog(dogElementArr)
    }, 200)
}

const whereIsDog = function (x, y) {
    for (let i = 0; i < dogs.length; i++) {
        const dog = dogs[i]
        if (dog.x === x && dog.y === y) {
            return true
        }
    }
    return false
}

const eatenByDog = function (x, y) {
    for (let i = 0; i < dogs.length; i++) {
        const dog = dogs[i]
        if (dog.x === x && dog.y === y) {
            const modal = document.getElementById("modal-lose");
            modal.style.display = "block";
        }
    }
}

function renderFish() {
    const fishElements = document.querySelectorAll('.fish')
    for (let i = 0; i < fishElements.length; i++) {
        fishElements[i].remove()
    }
    for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i]
        const fishEl = document.createElement('div')
        fishEl.className = 'fish'
        fishEl.style.left = (fish.x * 100).toString() + 'px'
        fishEl.style.top = (fish.y * 100).toString() + 'px'
        document.querySelector('.board').appendChild(fishEl)
    }
}
renderFish()


const whereIsTheFish = function (x, y) {
    for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i]
        if (fish.x === x && fish.y === y) {
            return true
        }
    }
    return false
}

const removeFish = function (x, y) {
    for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i]
        if (fish.x === x && fish.y === y) {
            fishes.splice(i, 1)
            increaseScore()
        }
    }
}

const isCoordinateInGrid = function (x, y) {
    if (x < 0 || y < 0 || x > 10 || y > 4) {
        return false
    }
    return true
}

const canMoveTo = function (x, y) {
    if (!isCoordinateInGrid(x, y)) {
        return false
    }
    return true
}

function moveLeft() {
    if (canMoveTo(cat.x - 1, cat.y)) {
        cat.x -= 1
        moveCatTo(cat.x, cat.y)
    }    
}

function moveRight() {
    if (canMoveTo(cat.x + 1, cat.y)) {
        cat.x += 1
        moveCatTo(cat.x, cat.y)
    }
}

function moveUp() {
    if (canMoveTo(cat.x, cat.y - 1)) {
        cat.y -= 1
        moveCatTo(cat.x, cat.y)
    }
}

function moveDown() {
    if (canMoveTo(cat.x, cat.y + 1)) {
        cat.y += 1
        moveCatTo(cat.x, cat.y)
    }
}

const catElem = document.querySelector('.cat')
function moveCatTo(x, y) {
    catElem.style.left = (x * 100) + 'px'
    catElem.style.top = (y * 100) + 'px'
    if (whereIsTheFish(x, y)) {
        removeFish(x, y)
        renderFish()
    }
    whereIsDog(x, y);
    eatenByDog(x, y);
}

const newCat = document.createElement('div')
newCat.classList.add('left-cat')
function newCatFace(){
    newCat.style.left = (cat.x * 100) + 'px'
    newCat.style.top = (cat.y * 100) + 'px'
}

document.body.addEventListener('keydown', function (event) {
    const keyCode = event.keyCode
    const arrowKeys = [37, 38, 39, 40]
    if (arrowKeys.includes(keyCode)) {
        event.preventDefault()
    }
    
    switch (keyCode) {
        case 37:
            moveLeft() 
            catElem.replaceWith(newCat)
            break
        case 38:
            moveUp()
            newCat.replaceWith(catElem)
            break
        case 39:
            moveRight()
            newCat.replaceWith(catElem)
            break
        case 40:
            moveDown()
            newCat.replaceWith(catElem)
            break
    }
    newCatFace()
})

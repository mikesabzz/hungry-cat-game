const board = document.querySelector('.board')
const scoreElement = document.querySelector('.js-score')
let score = 0

const cat = { x: 0, y: 0 }

const dogs = [
    { x: 3, y: 2 },
    { x: 2, y: 1 },
    { x: 5, y: 0 },
    { x: 6, y: 3 },
    { x: 4, y: 2 }
]

const fishes = [
    { x: 6, y: 1 },
    { x: 0, y: 4 },
    { x: 4, y: 2 },
    { x: 8, y: 2 },
    { x: 10, y: 4 },
]

const walls = [
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 8, y: 3 },
    { x: 8, y: 4 }
]

const increaseScore = function () {
    if (score < 100) {
        score += 20
        scoreElement.innerText = score
    }
    if (score === 100) {
        const winModal = document.getElementById("modal-win");
        winModal.style.display = "block";
    }
}

window.onload = function () {

    const coordinateInGrid = function (x, y) {
        if (x < 1 || y < 0 || x > 10 || y > 4) {
            return false
        }
        if (whereIsTheWall(x, y)) {
            console.log("cannot go here")
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
        const randomX = Math.floor(Math.random() * 3) - 1
        const randomY = Math.floor(Math.random() * 3) - 1
        let proposedX = dogs[0].x + randomX
        let posY = dogs[0].y + randomY
        const aRandomX = Math.floor(Math.random() * 3) - 1
        const aRandomY = Math.floor(Math.random() * 3) - 1
        let aProposedX = dogs[1].x + aRandomX
        let aPosY = dogs[1].y + aRandomY
        if (coordinateInGrid(proposedX, posY)) {
            if (coordinateInGrid(aProposedX, aPosY)) {

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
    setInterval(function () {
        moveDog(dogElementArr)
    }, 200)

    // function getRandomNumber() {        
    //     return Math.floor(Math.random() * 3) - 1
    // }

    const moreDogs = function (dog) {
        const randX = Math.floor(Math.random() * 3) - 1
        const randY = Math.floor(Math.random() * 3) - 1
        let propX = dogs[2].x + randX
        let posyY = dogs[2].y + randY
        const aRandX = Math.floor(Math.random() * 3) - 1
        const aRandY = Math.floor(Math.random() * 3) - 1
        let aPropX = dogs[3].x + aRandX
        let aPosyY = dogs[3].y + aRandY
        const theRandX = Math.floor(Math.random() * 3) - 1
        const theRandY = Math.floor(Math.random() * 3) - 1
        let thePropX = dogs[4].x + theRandX
        let thePosyY = dogs[4].y + theRandY
        if (coordinateInGrid(propX, posyY)) {
            if (coordinateInGrid(aPropX, aPosyY)) {
                if (coordinateInGrid(thePropX, thePosyY)) {
                    dogs[2].x += randX
                    dogs[3].x += aRandX
                    dogs[4].x += theRandX
                    dog[2].style.left = dogs[2].x * 100 + 'px'
                    dog[3].style.left = dogs[3].x * 100 + 'px'
                    dog[4].style.left = dogs[4].x * 100 + 'px'

                    dogs[2].y += randY
                    dogs[3].y += aRandY
                    dogs[4].y += theRandY
                    dog[2].style.top = dogs[2].y * 100 + 'px'
                    dog[3].style.top = dogs[3].y * 100 + 'px'
                    dog[4].style.top = dogs[4].y * 100 + 'px'

                }
            }
        }
    }
    setInterval(function () {
        moreDogs(dogElementArr)
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

function createWall() {
    for (const wall of walls) {
        const wallElement = document.createElement('div')
        wallElement.className = 'wall'
        wallElement.style.top = (wall.y * 100).toString() + 'px'
        wallElement.style.left = (wall.x * 100).toString() + 'px'
        document.querySelector('.board').appendChild(wallElement)
    }
}
createWall()

const whereIsTheWall = function (x, y) {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i]
        if (wall.x === x && wall.y === y) {
            return true
        }
    }
    return false
}

const canMoveTo = function (x, y) {
    if (!isCoordinateInGrid(x, y)) {
        return false
    }
    if (whereIsTheWall(x, y)) {
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

function moveCatTo(x, y) {
    const catElem = document.querySelector('.cat')
    catElem.style.left = (x * 100) + 'px'
    catElem.style.top = (y * 100) + 'px'
    if (whereIsTheFish(x, y)) {
        removeFish(x, y)
        renderFish()
    }
    whereIsDog(x, y);
    eatenByDog(x, y);
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
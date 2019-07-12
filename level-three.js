/*

Cat Game: Level Three

*/

//create cat
const cat = { x: 0, y: 0 }

//create dog
const dogs = [
    { x: 3, y: 2 },
    { x: 1, y: 4 },
    { x: 3, y: 0 },
    { x: 9, y: 3 },
    { x: 7, y: 2 }
]


//create Fish
const fishes = [
    { x: 6, y: 1 }
]

const walls = [
    { x: 4, y: 0 },
    { x: 4, y: 1 },
    { x: 8, y: 3 },
    { x: 8, y: 4 }
]

//iterate dog array
//create dog div
function runDog() {
    for (const dog of dogs) {
        const dogElement = document.createElement('div')
        dogElement.className = 'dog'
        dogElement.style.top = (dog.y * 100).toString() + 'px'
        dogElement.style.left = (dog.x * 100).toString() + 'px'
        document.querySelector('.board').appendChild(dogElement)
    }
}
runDog()

/* iterate fish
create fish div */
function fishFood() {
    for (let i = 0; i < fishes.length; i++) {
        const fish = fishes[i]
        const fishElement = document.createElement('div')
        fishElement.className = 'fish'
        fishElement.style.left = (fish.x * 100).toString() + 'px'
        fishElement.style.top = (fish.y * 100).toString() + 'px'
        document.querySelector('.board').appendChild(fishElement)
    }
}
fishFood()


//create coordinates
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

//Making the walls block the way
const whereIsTheWall = function (x, y) {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i]
        if (wall.x === x && wall.y === y) {
            return true
        }
    }
    return false
}


//create a function where cat can move to
const canMoveTo = function (x, y) {
    if(!isCoordinateInGrid(x, y)) {
        return false
    }
    if (whereIsTheWall(x, y)) {
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
}
console.log(document.body)

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
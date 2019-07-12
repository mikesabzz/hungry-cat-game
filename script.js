

function submit () {
    let input = document.querySelector('.form')
    let name = document.createElement('p')
    let formInput = document.getElementsByTagName('input')
    console.log(formInput[0].value)
    name.innerText = `Enjoy the game, ${formInput[0].value}!`
    input.appendChild(name)
    
    
}
submit()

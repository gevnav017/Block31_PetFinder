// fetch('http://localhost:8080/pets')
// .then(res => res.json())
// .then(data => pets.push(data))
// .catch(err => console.log(err))

const body = document.querySelector('body')
let pets

const getPets = async () => {
    const res = await fetch('http://localhost:8080/pets')
    const petsData = await res.json()
    return petsData
}

const getByOwner = () => {
    fetch('http://localhost:8080/pets/john')
    .then(res => res.json())
    .then((data) => {
        return data
    })
    .catch(err => console.log(err))
}

const renderPets = (pets) => {
    pets.map((pet) => {
        console.log(pet)
        const div = document.createElement('div')
        div.classList.add('pet-container')
        div.textContent = pet.name
        div.addEventListener('click', () => {
            modal(pet)
        })
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'X'
        deleteBtn.classList.add('deleteBtn')
        deleteBtn.addEventListener('click', () => {
            const petId = pet.id
            deletePet(petId)
        })
        div.appendChild(deleteBtn)
        body.appendChild(div)
    })
}

const renderOwners = (pets) => {
    pets.map((pet) => {
        const ownersDiv = document.getElementById('owners')
        const div = document.createElement('div')
        div.classList.add('owners-list')
        div.textContent = pet.owner
        ownersDiv.appendChild(div)
        div.addEventListener('click', () => {
            console.log(pet)
        })
    })
}

const modal = (pet) => {
    const modal = document.querySelectorAll('.modal')
    if (modal.length > 0) {
        modal.forEach(mod => mod.remove())
    }
    body.classList.add('overlay')
    const div = document.createElement('div')
    div.classList.add('modal-open')
    div.classList.add('modal')
    const header = document.createElement('h1')
    header.classList.add('modal-header')
    header.textContent = pet.name
    let details = []
    for (let i = 0; i < 4; i++) {
        details.push(document.createElement('p'))
    }
    details.forEach(detail => detail.classList.add('pet-details'))
    details[0].textContent = 'Breed: ' + pet.breed
    details[1].textContent = 'Owner: ' + pet.owner
    details[2].textContent = 'Age: ' + pet.age
    details[3].textContent = 'Phone: ' + pet.telephone
    div.appendChild(header)
    div.appendChild(details[0])
    div.appendChild(details[1])
    div.appendChild(details[2])
    div.appendChild(details[3])
    body.appendChild(div)

    const closeBtn = document.createElement('button')
    closeBtn.textContent = "X"
    closeBtn.classList.add('close-button')
    div.appendChild(closeBtn)
    closeBtn.addEventListener('click', () => {
        div.classList.add('modal-close')
        div.classList.remove('modal-open')
        body.classList.remove('overlay')
    })
}

const deletePet = (petId) => {
    const findPet = pets.findIndex(pet => pet.id === petId)
    pets.splice(findPet, 1)
}

const init = async () => {
    pets = await getPets()
    renderPets(pets)
    renderOwners(pets)
}

init()
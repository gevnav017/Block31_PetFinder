// import the pets array from data.js
const pets = require('./data')

// init express app
const express = require('express')
const cors = require('cors')
const app = express()
// app.use(express.static('public'))
app.use(cors())
app.use(express.json())

// serves the React app after npm run build within client folder
app.use(express.static(__dirname + '/app/dist'))

const PORT = 8080;

// get all pets from the database
app.get('/pets', (req, res) => {
    res.json(pets)
})

// get pet by owner with query string
app.get('/pets/:owner', (req, res) => {
    const owner = req.params.owner
    const petOwner = pets.find(pet => pet.owner.toLowerCase() === owner.toLowerCase())
    res.json(petOwner)
})

// get pet by name
app.get('/pets/:name', (req, res) => {
    const name = req.params.name
    const petName = pets.find(pet => pet.name.toLowerCase() === name.toLowerCase())
    res.json(petName)
})

// GET - / - returns homepage
// app.use('/', (req, res) => {
//     // serve up the public folder as static index.html file
//     res.send(__dirname + '/public/')
// });

app.listen(PORT, (err) => {
    if (err) {
        console.log(err) 
        return
    }
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
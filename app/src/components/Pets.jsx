import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Routes, Route, Link } from 'react-router-dom'
import PetsByName from './PetsByName';

const Pets = () => {
    const [allPets, setAllPets] = useState([])
    const [selectedOwner, setSelectedOwner] = useState("")

    useEffect(() => {
        fetch('http://localhost:8080/pets')
            .then(res => res.json())
            .then(data => setAllPets(data))
            .catch(err => console.log(err))
    }, [])

    const owners = []
    allPets.forEach(pet => {
        if (!owners.includes(pet.owner.toLowerCase())) {
            owners.push(pet.owner.toLowerCase())
        }
    })

    let filteredPets

    if (selectedOwner) {
        filteredPets = allPets.filter(pet => pet.owner.toLowerCase().includes(selectedOwner.toLowerCase()))
    }
    else {
        filteredPets = allPets
    }

    const filterByOwner = (e) => {
        const owner = e.target.innerText
        setSelectedOwner(owner)
    }

    const showAllPets = () => {
        setSelectedOwner("")
    }

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
                Filter by owner
                {
                    owners.map((owner, idx) =>
                        <Button
                            key={idx}
                            onClick={(e) => filterByOwner(e)}
                        >
                            {owner}
                        </Button>
                    )
                }
                <Button
                    onClick={showAllPets}
                >
                    ALL
                </Button>
                <Button
                    onClick={showAllPets}
                >
                    <Link to="/pets/:name">Pets by name</Link>
                </Button>
                <Routes>
                    <Route path="/pets/:name" element={<PetsByName />}/>
                </Routes>
            </div>
            <Box sx={{ minWidth: 275 }}>
                {
                    filteredPets.map((pet) =>
                        <Card
                            key={pet.id}
                            style={{ margin: "10px", padding: "10px" }}
                        >
                            {pet.name}
                        </Card>
                    )
                }
            </Box>
        </>
    )
}

export default Pets
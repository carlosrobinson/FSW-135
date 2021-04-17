const express = require("express")
const itemsRouter = express.Router()
const { v4: uuidv4 } = require('uuid');


const inventory= [
    {
        name: "apple",
        quantity: 1,
        cost: .79,
        aisle: 5,
        _id: uuidv4()
    },
    {
        name: "lettuce",
        quantity: 1,
        cost: 1.09,
        aisle: 1,
        _id: uuidv4()
    },
    {
        name: "Oreos",
        quantity: 1,
        cost: 3.65,
        aisle: 9,
        _id: uuidv4()
    },
    {
        name: "Coca Cola",
        cost: .79,
        quantity: 1,
        aisle: 2,
        _id: uuidv4()
    }
]

itemsRouter.get('/', (req, res) => {
    res.send(inventory)
})

module.exports = itemsRouter
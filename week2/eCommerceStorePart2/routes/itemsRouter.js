const express = require("express")
const itemsRouter = express.Router()
const Inventory = require('../models/inventory.js')


//Get All
itemsRouter.get('/', (req, res, next) => {
    Inventory.find((err, inventory) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(inventory)
    })
})

// Get one
itemsRouter.get("/:inventoryId", (req, res, next) => {
 Inventory.find(
     {_id: req.params.inventoryId},
    (err, foundInventory) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(foundInventory)
        }
     )
  })

// Post One
itemsRouter.post("/", (req, res, next) => {
    const newInventory = new Inventory(req.body)
    newInventory.save((err, savedInventory) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedInventory)
    })
})

// Delete One
itemsRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete(
        {_id: req.params.inventoryId},
        (err, deletedInventory) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted item ${deletedInventory.item} from the database!`)
        }
    )
}) 

// update One
itemsRouter.put("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndUpdate(
        {_id: req.params.inventoryId},
        req.body,
        {new: true},
        (err, updatedInventory) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedInventory)
        }
    ) 
})

module.exports = itemsRouter  
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const InventorySchema = new Schema ({
    item: {
        type: String,
        require: true
    },
    quantity: {
        type:Number,
        required: true
    },
    cost: {
        type:Number,
        required: true
    },
    aisle: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Inventory', InventorySchema)
const mongoose = require("mongoose")
const schema = mongoose.Schema

const InventorySchema = new Schema ({
    name: {
        name: String,
        quantity: Number,
        cost: Number,
        aisle: Number,
        required: true
    },
})

module.exports = mongoose.model('inventory', InventorySchema)
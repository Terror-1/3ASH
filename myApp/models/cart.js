const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    username : {
        type: String,
        required : true
    },
    items : {
        type: "array"
    }
});
const Cart = mongoose.model('Cart',cartSchema)
module.exports = Cart
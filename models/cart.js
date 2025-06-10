import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    prodId: String,
    title: String,
    price: Number,
    qty: Number
});

const cartSchema = new mongoose.Schema({
    cartId: { type: String, default: null },  
    items: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
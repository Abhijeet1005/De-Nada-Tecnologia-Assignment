import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Item count must be at least 1"]
    },
    category: {
        type: String,
        enum: ["Stationary","Grocery","Electronics","Other"],
        default: "Other"
    },
}, {timestamps: true});

const Item = mongoose.model("Item", itemSchema);

export default Item;
import mongoose from "mongoose";
import Item from "./item.model.js";

const billSchema = new mongoose.Schema({
    billItems: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Item",
            required: true
        },
        count: {
            type: Number,
            required: true,
            min: [1, "Count must be at least 1"]
        }
    }],
    billAmount: {
        type: Number,
        required: true,
        default: 0 // Default to 0 initially
    }
}, { timestamps: true });

// Pre-save hook to calculate the bill amount
billSchema.pre("save", async function (next) {
    try {
        const bill = this;

        // Fetch all item details based on the item IDs in billItems
        const itemIds = bill.billItems.map(billItem => billItem.item);
        const items = await Item.find({ _id: { $in: itemIds } });

        // Calculate the total bill amount
        let totalAmount = 0;
        bill.billItems.forEach(billItem => {
            const item = items.find(it => it._id.equals(billItem.item));
            if (item) {
                totalAmount += item.price * billItem.count;
            }
        });

        // Update the billAmount field
        bill.billAmount = totalAmount;

        next();
    } catch (err) {
        next(err);
    }
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;

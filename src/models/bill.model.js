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
        default: 0
    }
}, { timestamps: true });


billSchema.pre("save", async function (next) {
    try {
        const bill = this;

        const itemIds = bill.billItems.map(billItem => billItem.item);
        const items = await Item.find({ _id: { $in: itemIds } });

        let totalAmount = 0;
        bill.billItems.forEach(billItem => {
            const item = items.find(it => it._id.equals(billItem.item));
            if (item) {
                totalAmount += item.price * billItem.count;
            }
        });


        bill.billAmount = totalAmount;

        next();
    } catch (err) {
        next(err);
    }
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;

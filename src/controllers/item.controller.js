import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import Item from "../models/item.model.js";

export const getAllItems = asyncHandler(async (req, res, next) => {
    const items = await Item.find();
    res.status(200).json(new ApiResponse(200, "Items fetched successfully", items));
});

export const getItemById = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    const item = await Item.findById(id);
    if (!item) {
        throw new ApiError(404, "Item not found");
    }
    res.status(200).json(new ApiResponse(200, "Item fetched successfully", item));
});

export const createItem = asyncHandler(async (req, res, next) => {

    const { name, description, price, quantity, category } = req.body;

    if (!name || !price || !quantity || !category) {
        throw new ApiError(400, "Fill the necessary fields");
    }

    const item = await Item.create({
        name,
        description,
        price,
        quantity,
        category
    })
    res.status(201).json(new ApiResponse(201, "Item created successfully", item));
});

export const updateItem = asyncHandler(async (req, res, next) => {
    const { id } = req.query;

    const update = {};
    for (const key of Object.keys(req.body)) {
        if (req.body[key] !== '' && req.body[key] !== undefined) {
            update[key] = req.body[key];
        }
    }

    const item = await Item.findByIdAndUpdate(
        id,
        { $set: update }, 
        { new: true, runValidators: true } 
    );

    if (!item) {
        throw new ApiError(404, "Item not found");
    }

    res.status(200).json(new ApiResponse(200, "Item updated successfully", item));
});



export const deleteItem = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    const item = await Item.findById(id);
    if (!item) {
        throw new ApiError(404, "Item not found");
    }
    await item.remove();
    res.status(200).json(new ApiResponse(200, "Item deleted successfully"));
});
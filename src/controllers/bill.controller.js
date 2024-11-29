import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import Bill from "../models/bill.model.js";

export const createBill = asyncHandler(async (req, res, next) => {
    const { billItems } = req.body;
    if (!billItems || billItems.length === 0) {
        throw new ApiError(400, "Bill items are required");
    }
    const bill = await Bill.create({
        billItems,
    });
    res.status(200).json(new ApiResponse(200, "Bill created successfully", bill));
});

export const getAllBills = asyncHandler(async (req, res, next) => {
    const bills = await Bill.find();
    res.status(200).json(new ApiResponse(200, "Bills fetched successfully", bills));
});

export const getBillById = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    const bill = await Bill.findById(id);
    if (!bill) {
        throw new ApiError(404, "Bill not found");
    }
    res.status(200).json(new ApiResponse(200, "Bill fetched successfully", bill));
});

export const updateBill = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    const { billItems } = req.body;
    const bill = await Bill.findById(id);
    if (!bill) {
        throw new ApiError(404, "Bill not found");
    }
    bill.billItems = billItems;
    await bill.save();
    res.status(200).json(new ApiResponse(200, "Bill updated successfully", bill));
});

export const deleteBill = asyncHandler(async (req, res, next) => {
    const { id } = req.query;
    const bill = await Bill.findById(id);
    if (!bill) {
        throw new ApiError(404, "Bill not found");
    }
    await bill.remove();
    res.status(200).json(new ApiResponse(200, "Bill deleted successfully"));
});

export const getBillByDate = asyncHandler(async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const bills = await Bill.find({ createdAt: { $gte: startDate, $lte: endDate } });
    res.status(200).json(new ApiResponse(200, "Bills fetched successfully", bills));
});
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { createBill,getAllBills,getBillById,updateBill,deleteBill,getBillByDate } from "../controllers/bill.controller.js";

const router = Router();

router.route("/createBill").post(asyncHandler(createBill));
router.route("/getAllBills").post(asyncHandler(getAllBills));
router.route("/getBillById").post(asyncHandler(getBillById));
router.route("/updateBill").post(asyncHandler(updateBill));
router.route("/deleteBill").post(asyncHandler(deleteBill));
router.route("/getBillByDate").post(asyncHandler(getBillByDate));

export default router;
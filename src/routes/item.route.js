import { Router } from "express";
import { getAllItems,getItemById,createItem,updateItem,deleteItem } from "../controllers/item.controller.js";

const router = Router();

router.route("/getAllItems").post(getAllItems);
router.route("/getItemById").post(getItemById);
router.route("/createItem").post(createItem);
router.route("/updateItem").post(updateItem);
router.route("/deleteItem").post(deleteItem);

export default router;
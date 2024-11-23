import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  createController,
  deleteController,
  editController,
  homeController,
  showController,
} from "../Controller/homeController.js";
const router = express.Router();

router.get("/", wrapAsync(homeController));
router.get("/show/:id", wrapAsync(showController));
// create post code
router.post("/", wrapAsync(createController));
// A Journey Through the Mountains
router.put("/show/:id", wrapAsync(editController));
router.delete("/show/:id", wrapAsync(deleteController));

export default router;

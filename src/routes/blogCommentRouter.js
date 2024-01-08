import express from "express";
import blogCommentController from "../controllers/blogCommentController.js";
import verifyUser from "../middlewares/verifyUser.js";
const router = express.Router();

router.post("/add/", verifyUser, blogCommentController.addBlogComment);
router.get("/get/", verifyUser, blogCommentController.getBlogComments);
router.put("/update/", verifyUser, blogCommentController.updateBlogComment);
router.delete("/delete", verifyUser, blogCommentController.deleteBlogComment);

export default router;

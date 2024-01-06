import express from "express";
import blogController from "../controllers/blogController.js";
import verifyUser from "../middlewares/verifyUser.js";
const router = express.Router();

router.post("/add", verifyUser, blogController.createBlog);
router.get("/get/:id", verifyUser, blogController.getBlog);
router.get("/getAll", verifyUser, blogController.getAllBlogs);
router.put("/update/:id", verifyUser, blogController.updateBlog);
router.delete("/delete/:id", verifyUser, blogController.deleteBlog);

export default router;

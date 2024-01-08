import BlogComment from "../models/blogComment";
import mongoose from "mongoose";

const addBlogComment = async (req, res) => {
  try {
    const { comment, blogId } = req.body;
    const { _id: userId } = req.user;

    const newComment = new BlogComment({
      blogId,
      comment,
      userId,
    });
    await newComment.save();
    return res.status(201).send({ message: "Blog comment added successfully" });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Failed to add blog comment", error: error });
  }
};
const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.query;
    const blogComments = await BlogComment.find({
      blogId: mongoose.Types.ObjectId(blogId),
    });
    return res
      .status(201)
      .send({
        message: "Blog comments fetched successfully",
        data: blogComments,
      });
  } catch (error) {
    return res
      .status(400)
      .send({ message: "Failed to get blog comments", error: error });
  }
};
const updateBlogComment = async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedBlogComment = { title, description };
    const { blogId, commentId } = req.query;

    const { _id: userId } = req.user;
    const blogComment = await BlogComment.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(commentId),
        userId: new mongoose.Types.ObjectId(userId),
        blogId: new mongoose.Types.ObjectId(blogId),
      },
      { $set: updatedBlogComment },
      { new: true }
    );
    return res
      .status(201)
      .send({
        message: "Blog comment updated successfully",
        data: blogComment,
      });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Failed to update blog comment", error: error });
  }
};
const deleteBlogComment = async (req, res) => {
  try {
    const { blogId, commentId } = req.query;
    const { _id: userId } = req.user;
    const blog = await BlogComment.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(commentId),
      userId: new mongoose.Types.ObjectId(userId),
      blogId: new mongoose.Types.ObjectId(blogId),
    });
    return res
      .status(201)
      .send({ message: "Blog comment deleted successfully" });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Failed to delete blog comment", error: error });
  }
};

export default {
  addBlogComment,
  getBlogComments,
  updateBlogComment,
  deleteBlogComment,
};

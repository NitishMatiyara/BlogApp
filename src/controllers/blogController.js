import Blog from "../models/blog.js";

const createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
     const { _id: userId } = req.user;
    const newBlog = new Blog({ title, description, userId });
    await newBlog.save();
    return res.status(201).send({ message: "Blog added successfully" });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Failed to add blog", error: error });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const blog = await Blog.find({ user: userId });
    return res
      .status(201)
      .send({ message: "Blogs fetched successfully", data: blog });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Failed to fetch blogs", error: error });
  }
};
const getBlog = async (req, res) => {
  try {
    const id = req.params;
    const blog = await Blog.findById({ _id: id });
    return res
      .status(201)
      .send({ message: "Blog fetched successfully", data: blog });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Failed to fetch blog", error: error });
  }
};
const updateBlog = async (req, res) => {
  try {
    const updatedBlog = { title, description };
    const { _id: userId } = req.user;
    const id = req.params;
    const blog = await Blog.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updatedBlog },
      { new: true }
    );
    return res
      .status(201)
      .send({ message: "Blog updated successfully", data: blog });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Failed to fetch blogs", error: error });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const id = req.params;
    const blog = await Blog.findOneAndDelete({ _id: id, user: userId });
    return res.status(201).send({ message: "Blog deleted successfully" });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Failed to delete blog", error: error });
  }
};

export default { createBlog, deleteBlog, getBlog, updateBlog, getAllBlogs };

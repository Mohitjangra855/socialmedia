import { Posts } from "../Models/Posts.js";

// home route code
export const homeController = async (req, res) => {
  const data = await Posts.find({});
  res.status(200).json({ data });
};
// show route code
export const showController = async (req, res) => {
  let { id } = req.params;
  const data = await Posts.findById(id)
  res.status(200).json({ data });
};
//   create post route code

export const createController = async (req, res) => {
  const data = req.body;
  const post = await Posts.create(data);
  await post.save();
  res.status(200).json({ success: "new post created successfully." });
};

//   edit route code

export const editController = async (req, res) => {
  const post = req.body;
  const { id } = req.params;
  const updatedPost = await Posts.findByIdAndUpdate(id, post);
  await updatedPost.save();
  res.status(200).json({ success: "updated successfully" });
};

// Update post by ID

//   delete post route code
export const deleteController = async (req, res) => {
  try {
    let { id } = req.params;
    const post = await Posts.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).send({ message: "Error deleting post" });
  }
};

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = Schema({
  title: String,
  content: String,
  image: {
    url: String,
    filename: String,
  },
  description: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  owner:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Posts = mongoose.model("Posts", postSchema);

export  {Posts};

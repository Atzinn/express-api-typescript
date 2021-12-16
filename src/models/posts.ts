import { model, connect } from "mongoose";
import { Post, postSchema } from '../schemas/post';


const PostModel = model<Post>('Post', postSchema);

async function addPostModel(title: string, body: string) {
  try {
    await connect('mongodb://localhost:27017/posts');
    const doc = new PostModel({
      title,
      body
    });
    await doc.save();
    return doc

  } catch(err) {
    console.error(err);
  }
 
}

async function getPostsModel() {
  await connect('mongodb://localhost:27017/posts');
  const docs = await PostModel.find();
  return docs;
}

async function getOnePostModel(id: string) {
  await connect('mongodb://localhost:27017/posts');
  const doc = await PostModel.findById(id);
  return doc;
}

export {
  addPostModel,
  getPostsModel,
  getOnePostModel
}
// This module will handle all the API logic
import { Request, Response, NextFunction, json } from 'express';
import axios, { AxiosResponse } from 'axios';
import { addPostModel, getPostsModel, getOnePostModel } from '../models/posts'

interface Post {
  userId: Number,
  id: Number,
  title: String,
  body: String
};


//Getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const results = await getPostsModel();
  const posts = results;
  res.status(200).json({
    posts
  })
};

// Getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  // Get id of the post from the request params
  const id: string = req.params.id;
  const result = await getOnePostModel(id);
  return res.status(200).json({
    message: result
  });
};

// Updating a post
// const updatePost = async (req: Request, res: Response, next: NextFunction) => {
//   // Get id of the post from the request params
//   const id: string = req.params.id;
//   // get the title/data to put from the request body
//   const title: string = req.body.title;
//   const body: string = req.body.body;
//   // Update the post
//   const response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
//     ...(title && { title }),
//     ...(body && { body })
//   });

//   return res.status(200).json({
//     message: response.data
//   });
// };

// Deleting a post
// const deletePost = async (req: Request, res: Response, next: NextFunction) => {
//   // Get id of the post from the request params
//   const id: string = req.params.id;
//   // Delete the post
//   const response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
//   return res.status(200).json({
//     message: 'Post deleted successfully'
//   });
// };

// Adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const title: string = req.body.title;
  const body: string = req.body.body;
  const result = await addPostModel(title, body);
  res.status(200).json({
    message: "Created Post successfully",
    postId: result?._id
  })
};

export default {
  getPosts,
  getPost,
  //updatePost,
  //deletePost,
  addPost
}
// This module will handle all the API logic
import { Request, Response, NextFunction, json } from 'express';
import axios, { AxiosResponse } from 'axios';

interface Post {
  userId: Number,
  id: Number,
  title: String,
  body: String
};


//Getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  const results: AxiosResponse = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const posts: [Post] = results.data;
  return res.status(200).json({
    message: posts
  });
};

// Getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  // Get id of the post from the request params
  const id: string = req.params.id;
  const result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = result.data;
  return res.status(200).json({
    message: post
  });
};

// Updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  // Get id of the post from the request params
  const id: string = req.params.id;
  // get the title/data to put from the request body
  const title: string = req.body.title;
  const body: string = req.body.body;
  // Update the post
  const response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    ...(title && { title }),
    ...(body && { body })
  });

  return res.status(200).json({
    message: response.data
  });
};

// Deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  // Get id of the post from the request params
  const id: string = req.params.id;
  // Delete the post
  const response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.status(200).json({
    message: 'Post deleted successfully'
  });
};

// Adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  //Get the data of the new post from request body
  const title: string = req.body.title;
  const body: string = req.body.body;
  //Add the post
  const response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts/`, {
    title,
    body
  });
  
  return res.status(200).json({
    message: response.data
  });
};

export default {
  getPosts,
  getPost,
  updatePost,
  deletePost,
  addPost
}
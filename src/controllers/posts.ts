// This module will handle all the API logic
import { Request, Response, NextFunction, json } from 'express';
import PostModel from '../models/posts';


interface Post {
  userId: Number,
  id: Number,
  title: String,
  body: String
};


//Getting all posts
const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
  } catch(err) {
    res.status(404).json({
      error: err
    });
  }
};

// Getting a single post
const getPost = async (req: Request, res: Response, next: NextFunction) => {
  // Get id of the post from the request params
  try {
    const id: string = req.params.id;
    const result = await PostModel.findById(id);
    return res.status(200).json(result);
  } catch(err) {
    res.status(404).json({
      error: "Post not found"
    })
  }
};

// Updating a post
const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  // Get id of the post from the request params
  const id: string = req.params.id;
  // get the title/data to put from the request body
  const title: string = req.body.title;
  const body: string = req.body.body;
  const newPostInfo = {
    title,
    body
  }
  if(!newPostInfo.title || !newPostInfo.body) {
    res.status(400).json({
      message: 'Missing the new post info'
    })
    return;
  }

  try {
    const newPost = await PostModel.findByIdAndUpdate(id, newPostInfo, { new: true });
    res.status(201).json(newPost);
  } catch(err) {
    res.status(400).json({
      error: err
    })
  }
};

// Deleting a post
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  // Get id of the post from the request params
  const id: string = req.params.id;
  // Delete the post
  try {
    const result = await PostModel.findByIdAndDelete(id);
    return res.status(204).end();
  } catch(err) {
    res.status(400).json({
      error: err
    })
  }
};

// Adding a post
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  const title: string = req.body.title;
  const body: string = req.body.body;
  
  if(!title || !body) {
    res.status(400).json({
      message: "Missing title or body of the post"
    })
    return;
  }

  const newPost = new PostModel({
    title,
    body
  })

  try {
    const savedNote = await newPost.save();
    res.status(201).json(savedNote);
  } catch(err) {
    res.status(400).json({
      error: err
    })
  }
  
};

export default {
  getPosts,
  getPost,
  updatePost,
  deletePost,
  addPost
}
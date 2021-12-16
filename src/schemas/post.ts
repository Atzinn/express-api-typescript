import { Schema } from "mongoose";

export interface Post {
  id: number,
  title: string,
  body: string
};

export const postSchema = new Schema<Post>({
  title: {
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  }
});
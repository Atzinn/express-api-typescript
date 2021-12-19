import { model, Schema } from "mongoose";

interface Post {
  id: number,
  title: string,
  body: string
};

const postSchema = new Schema<Post>({
  title: {
    type: String,
    required: true
  },
  body:{
    type: String,
    required: true
  }
});

postSchema.set('toJSON', {
  transform: (document, returnedObject): void => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

const PostModel = model<Post>('Post', postSchema);

export default PostModel;

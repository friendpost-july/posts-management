import pkg from 'mongoose';
const { Schema, model } = pkg;

export const postModal = model(
  'posts',
  new Schema(
    {
      userId: { type: String, required: true },
      postId: { type: Number },
      text: { type: String, require: true },
      visibility: { type: String, required: true, enum: ['private', 'public'] }
    },
    {
      collection: 'posts'
    }
  )
);

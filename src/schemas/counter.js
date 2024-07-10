import pkg from 'mongoose';
const { Schema, model } = pkg;

export const counterModal = model(
  'sequence',
  new Schema(
    {
      postId: { type: Number, default: 0 }
    },
    {
      collection: 'sequence'
    }
  )
);

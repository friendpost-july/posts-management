import { counterModal } from '../schemas/counter.js';

export const getPostID = async () => {
  const postCounter = await counterModal
    .findOneAndUpdate({}, { $inc: { postId: 1 } }, { new: true })
    .lean();
  console.log(postCounter);
  return postCounter.postId;
};

export const createCounterCollection = async () => {
  const isCollectionExist = await counterModal.find({});
  if (!isCollectionExist.length) {
    await counterModal.findOneAndUpdate(
      {},
      { $set: { postId: 0 } },
      { upsert: 1 }
    );
    console.log('successfully inserted document');
  }
};

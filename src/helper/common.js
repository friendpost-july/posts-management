import { counterModal } from '../schemas/counter.js';

const getPostID = async () => {
  const postCounter = await counterModal.findOneAndUpdate({}, { $inc: { postId: 1 } }, { new: true }).lean();
  console.log(postCounter);
  return postCounter.postId;
};
export default getPostID;

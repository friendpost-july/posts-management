import { postModal } from '../schemas/posts.js';
import { getPostID } from '../helper/common.js';

export async function createNewPost(userId, text, visibility) {
  try {
    //Check if input is valid
    if (!userId || !text || !visibility) {
      throw new Error('userId, text, or visibility is missing or undefined');
    }
    let counter = await getPostID();
    await postModal.create({ userId, text, visibility, postId: counter });
    return {
      status: 200,
      message: { postId: counter, visibility: visibility }
    };
  } catch (error) {
    return { status: 400, success: false, message: error };
  }
}

import { postModal } from '../schemas/posts.js';
import { getPostID } from '../helper/common.js';

export async function createNewPost(userId, text, visibility) {
  try {
    console.log(userId, text, visibility);
    //Check if input is valid
    if (!userId || !text || !visibility) {
      console.log(userId);
      throw new Error('userId, text, or visibility is missing or undefined');
    }
    let counter = await getPostID();
    console.log('Creating new posts');
    await postModal.create({ userId, text, visibility, postId: counter });
    console.log('Created new posts successfully');
    return {
      status: 200,
      message: { postId: counter, visibility: visibility },
    };
  } catch (error) {
    return { status: 400, success: false, message: error };
  }
}

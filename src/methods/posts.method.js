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
      data: { postId: counter, visibility: visibility },
    };
  } catch (error) {
    return { status: 400, success: false, message: error };
  }
}

export async function deletePost(postId) {
  try {
    console.log(`Deleting post with postId: ${postId}`);
    const deletedPost = await postModal.findOneAndDelete({ postId });

    if (!deletedPost) {
      return {
        status: 404,
        message: 'Post not found',
      };
    }
    console.log('Post deleted successfully');
    return {
      status: 200,
      message: 'Post deleted successfully',
    };
  } catch (error) {
    return { status: 400, success: false, message: error.message };
  }
}

export const getPostByID = async (postId) => {
  try {
    const post = await postModal.findOne({ postId: postId });
    return { status: post ? 200 : 404, data: post };
  } catch (error) {
    return { status: 500, success: false, message: error };
  }
};

export async function getAllPosts(
  userIds = [],
  visibility = '',
  limit = 100,
  skip
) {
  let query = {};
  if (
    (!userIds.length && visibility.toLowerCase() === 'public') ||
    (!userIds.length && !visibility)
  ) {
    query.visibility = 'public';
  }
  if (userIds.length) {
    query.userId = userIds;
    if (visibility)
      query.visibility = visibility == 'public' ? 'public' : 'private';
  }
  console.log(query);
  const results = await postModal.find(query).limit(limit).skip(skip);

  console.log(results);
  if (!results.length)
    return {
      status: 200,
      posts: [],
      totalPosts: 0,
    };
  const totalPosts = await postModal.countDocuments(query);
  return {
    status: 200,
    posts: results,
    totalPosts,
  };
}

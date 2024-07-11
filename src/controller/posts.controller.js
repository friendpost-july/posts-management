import { createNewPost, getAllPosts } from '../methods/posts.method.js';
import { deletePost } from '../methods/posts.method.js';

export async function apiCreatePost(req, res) {
  try {
    const userId = req.body.userId;
    const text = req.body.text;
    const visibility = req.body.visibility;
    //  const { userId, text, visibility } = req.body;

    const result = await createNewPost(userId, text, visibility);
    res.status(result.status).json({
      data: result.data || null,
      message: result.message,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: err.message || 'Internal server err' });
  }
}

export async function apiDeletePostByID(req, res) {
  console.log(req);
  try {
    const postId = req.params.postId;
    const result = await deletePost(postId);
    res.status(result.status).json({
      message: result.message,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server error',
    });
  }
}

export async function apiGetAllPosts(req, res) {
  try {
    const filter = req.body.filter;
    if (!filter || !Object.keys(filter).length) {
      res.status(400).json({
        message: 'Provide valid filters.',
      });
    }
    const userIds = filter.userIds;
    const visibility = filter.visibility;
    const limit = req.body.limit;
    const skip = req.body.skip;

    const results = await getAllPosts(userIds, visibility, limit, skip);
    res.status(results.status).json({
      posts: results.posts,
      totalPosts: results.totalPosts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || 'Internal server err',
    });
  }
}

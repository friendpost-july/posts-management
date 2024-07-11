import { Router } from 'express';
import {
  apiCreatePost,
  apiDeletePost,
} from '../controller/posts.controller.js';

const router = new Router();

router.route('/').post(apiCreatePost);

router
  .route('/:postId')
  .get(apiGetPostByID)
  .put(apiUpdatePostByID)
  .delete(apiDeletePostByID);

export default router;

import { Router } from 'express';
import {
  apiCreatePost,
  apiDeletePostByID,
  apiGetPostByID,
} from '../controller/posts.controller.js';

const router = new Router();

router.route('/').post(apiCreatePost);

router.route('/:postId').delete(apiDeletePostByID).get(apiGetPostByID);

export default router;

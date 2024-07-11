import { Router } from 'express';
import {
  apiCreatePost,
  apiDeletePostByID,
} from '../controller/posts.controller.js';

const router = new Router();

router.route('/').post(apiCreatePost);

router.route('/:postId').delete(apiDeletePostByID);




export default router;

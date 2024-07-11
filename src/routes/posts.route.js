import { Router } from 'express';
import { apiCreatePost, apiDeletePostByID, apiDeletePostsByUserID, apiGetPostByID } from '../controller/posts.controller.js';

const router = new Router();

router.route('/').post(apiCreatePost);

router.route('/:postId').delete(apiDeletePostByID).get(apiGetPostByID);
router.route('/users/:userId').delete(apiDeletePostsByUserID);

export default router;

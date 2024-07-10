import { Router } from 'express';
import { apiCreatePost } from '../controller/posts.controller.js';

const router = new Router();
router.route('/').post(apiCreatePost);

export default router;

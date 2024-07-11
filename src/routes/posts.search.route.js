import { Router } from 'express';
import { apiGetAllPosts } from '../controller/posts.controller.js';

export const searchRouter = new Router();
router.route('/').post(apiGetAllPosts);



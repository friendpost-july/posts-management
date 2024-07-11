import { Router } from 'express';
import { apiGetAllPosts } from '../controller/posts.controller.js';

export const searchRouter = new Router();
searchRouter.route('/').post(apiGetAllPosts);



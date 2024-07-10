import { Router } from 'express';

const router = new Router();
router.route('/').post(apiCreatePost);

export default router;

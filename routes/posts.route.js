import { Router } from 'express';

export async function apiCreatePost(req, res) {
  try {
    const loggedInUser = req.user;
    const result = await createNewProduct(req.body, loggedInUser);
    res.status(result.status).json({
      success: result.success,
      data: result.data || null,
      message: result.message,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: err.message || 'Internal server err' });
  }
}

Router.route('/').post(apiCreatePost);

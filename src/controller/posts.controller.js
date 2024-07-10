 import { createNewPost } from "../methods/posts.method";
 
 export async function apiCreatePost(req, res) {
   try {
    const userId = req.body.userId;
    const text = req.body.text;
    const visibility = req.body.visibility;
    //  const { userId, text, visibility } = req.body;
     const result = await createNewPost(userId, text, visibility);
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
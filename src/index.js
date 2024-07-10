import express from 'express';
import bodyParser from 'body-parser';
import { dbInit } from './dbInit.js';
import postsRoute from './routes/posts.route.js';

const app = express();
const port = process.env.port || 8080;

// Middleware
app.use(bodyParser.json());
dbInit(); //Initializing DB

//Create a post
app.use('/posts', postsRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

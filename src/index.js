import express from 'express';
import bodyParser from 'body-parser';
import { dbInit } from './dbInit.js';
import postsRoute from './routes/posts.route.js';
import { createCounterCollection } from './helper/common.js';
import { searchRouter } from './routes/posts.search.route.js';

const app = express();
const port = process.env.LISTEN_PORT || 8080;

// Middleware
app.use(bodyParser.json());
dbInit(); //Initializing DB
//creating counter collection
createCounterCollection();
//Create a post
app.use('v1/posts', postsRoute);

app.use('v1/searchposts', searchRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

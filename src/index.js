const express = require('express');
const bodyParser = require('body-parser');
const initDb = require('./dbInit');
const postsRoute = require('router');

const app = express();
const port = process.env.port;

// Middleware
app.use(bodyParser.json());
initDb(); //Initializing DB

//Create a post
app.use('/posts', postsRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

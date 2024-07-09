const express = require('express')
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port;

// Middleware
app.use(bodyParser.json());


//Create a post
app.post('/posts/', (req, res) => {
    // res.json(items);
 });

//Get posts
app.get('/posts/', (req, res) => {
    // res.json(items);
    res.send('OK')
 });

 //Update a post
app.patch('/posts/:postId', (req, res) => {
    // res.json(items);
 });

  //Delete a post
app.delete('/posts/:postId', (req, res) => {
    // res.json(items);
 });

  //Delete a post
app.delete('/user/:userId', (req, res) => {
    // res.json(items);
 });



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
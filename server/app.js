const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { Post } = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, resp, next) => {
  resp.setHeader('Access-Control-Allow-Origin', '*');
  resp.setHeader(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  resp.setHeader(
    'Access-Control-Allow-Methods', 
    'GET, PUT, POST, PATCH, DELETE, OPTIONS'
  );
  console.log("First Middleware");
  next();
});

app.post("/api/posts", (req, resp, next) => {
  Post.create({ title: req.body.title, content: req.body.content }).then(post => {
    console.log("post's auto-generated ID:", post.id);
    resp.status(201).json({
      message: 'Post saved successfully',
      post_id: post.id
    });
  });
  
});

app.get("/api/posts", (req, resp, next) => {
  
  Post.findAll().then( posts => {
    resp.status(200).json(
    {
      message: 'Fetching posts success',
      posts: posts
    });
  });
  
});

app.delete("/api/posts/:id", (req, resp, next) => {

  Post.destroy({
    where: {
      id: req.params.id
    }
  }).then( post => {
    resp.status(200).json({
      message: 'Post Deleted Successfully'
    });
  });
});

module.exports = app;
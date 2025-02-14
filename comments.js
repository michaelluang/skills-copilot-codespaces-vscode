// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Parse application/json
app.use(bodyParser.json());

// Set up the server
var server = app.listen(3000, function () {
    console.log('Server is running..');
});

// Set up the database
var comments = [];

// Get all comments
app.get('/comments', function (req, res) {
    res.send(comments);
});

// Get a comment by id
app.get('/comments/:id', function (req, res) {
    var id = req.params.id;
    var comment = comments[id];
    if (comment) {
        res.send(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

// Create a new comment
app.post('/comments', function (req, res) {
    var comment = req.body;
    comments.push(comment);
    res.status(201).send('Comment created');
});

// Update a comment by id
app.put('/comments/:id', function (req, res) {
    var id = req.params.id;
    var comment = req.body;
    comments[id] = comment;
    res.status(200).send('Comment updated');
});

// Delete a comment by id
app.delete('/comments/:id', function (req, res) {
    var id = req.params.id;
    comments.splice(id, 1);
    res.status(200).send('Comment deleted');
});
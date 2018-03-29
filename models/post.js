const mongoose = require('mongoose');
const genreSchema = require('./post').schema;

const postSchema = mongoose.Schema({
    genre: genreSchema,
    title: String,
    description: String,
    image: String,
    video: String
    
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);
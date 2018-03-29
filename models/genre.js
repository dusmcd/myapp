const mongoose = require('mongoose');

genreSchema = mongoose.Schema({
    title: String
});

module.exports = mongoose.model('Genre', genreSchema);
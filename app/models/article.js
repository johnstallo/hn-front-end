var mongoose = require('mongoose');

module.exports = mongoose.model('Article', {
    url: {
        type: String,
        default: '',
        required: true
    },
    title: {
        type: String,
        default: '',
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
});
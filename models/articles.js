const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({

    comment: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

const ArticleSchema = new Schema({
    /*created: {
        type: Date,
        default: Date.now
    },*/
    content: {
        type: String,
        default: '',
        trim: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

var Articles = mongoose.model('Articles', ArticleSchema);
module.exports = Articles;
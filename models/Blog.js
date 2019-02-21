const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const blogSchema = new Schema({
    title: String,
    content: String,
    createdAt: {
        type: Date,
        defailt: Date.now()
    },
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Blog', blogSchema);
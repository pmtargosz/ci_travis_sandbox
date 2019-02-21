const router = require('express').Router();
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');

const Blog = mongoose.model('Blog');

router.get('/current_user', (req, res, next) => {
    res.send(req.user);
});

router.get('/blogs/:id', requireLogin, async (req, res, next) => {
    const blog = await Blog.findOne({
        _user: req.user.id,
        _id: req.params.id
    });

    res.send(blog);
});

router.get('/blogs', requireLogin, async (req, res, next) => {
    const blogs = await Blog.find({
        _user: req.user.id
    }).cache({
        key: req.user.id
    });

    res.send(blogs);
});

router.post('/blogs', requireLogin, async (req, res, next) => {
    const {
        title,
        content
    } = req.body;

    const blog = new Blog({
        title,
        content,
        _user: req.user.id
    })

    try {
        await blog.save();
        res.send(blog);
    } catch (err) {
        res.status(400);
        res.send(err);
    }
});

module.exports = router;
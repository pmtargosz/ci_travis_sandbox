module.exports = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        res.send({
            error: 'You must log in!'
        });
    }
    next();
}
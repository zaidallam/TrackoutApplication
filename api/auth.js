module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.status(400).json({message: "You don't have permission to access this resource"})
    } 
}
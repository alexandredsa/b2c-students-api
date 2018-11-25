const isAdmin = (req, res, next) => {
    const role = req.params.user.role;
    if (role !== "ADMIN") {
        res.send(403);
    } else {
        next();
    }
}

module.exports = isAdmin;
export function canUpdate(req, res, next) {
    let user = req.user;
    if (user.role === "admin" || user.id == req.params.id) {
        next();
    } else {
        res.status(403).send({ error: "You are not authorized to perform this action" });
    }
}

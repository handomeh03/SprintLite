export function CanupdateRole(req, res, next) {
    let user = req.user;
    if (user.role === "admin") {
        next();
    } else {
        res.status(403).send({ error: "You are not authorized to change role" });
    }
}

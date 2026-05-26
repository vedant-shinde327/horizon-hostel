const isLoggedOut = (req, res, next) => {
    if(req.session.user) {
        return res.redirect("/dashboard");
    }
    next();
}
export default isLoggedOut;
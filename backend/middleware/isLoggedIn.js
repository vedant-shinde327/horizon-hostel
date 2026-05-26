const isLoggedIn = (req, res, next) => {
    if(!req.session.user) {
        return res.redirect("/pages/login.html");
    }
    next();
};
export default isLoggedIn;
const jwt = require("jsonwebtoken");

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send(" require login!");
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent("already LoggedIn");
        res.redirect(`/?error=${message}`);
    }
};

exports.verifyToken = (req, res, next) => {
    try {
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        if (error.name === "TokenExpriedError") {
            return res.status(419).json({
                code: 419,
                message: "토큰이 만료되었습니다.",
            });
        }
        return res.status(401).json({
            code: 401,
            message: "유효하지 않는 토큰입니다.",
        });
    }
};
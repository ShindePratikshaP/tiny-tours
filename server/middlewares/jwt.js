const chechJWT = (req, res, next) => {
    const {authorization} = req.headers;
    const token =authorization && authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.json({
            success: false,
            message: 'Invalid token',
            data: null
        });
    }};

export default chechJWT;
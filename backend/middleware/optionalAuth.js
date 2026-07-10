import jwt from 'jsonwebtoken'

const optionalAuth = async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
        req.body.userId = 'guest_' + Date.now();
        return next();
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export default optionalAuth

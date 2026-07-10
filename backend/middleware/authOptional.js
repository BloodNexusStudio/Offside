import jwt from 'jsonwebtoken'

const authOptional = async (req, res, next) => {

    const { token } = req.headers;

    // If token exists, try to extract userId just like authUser does
    if (token) {
        try {
            const token_decode = jwt.verify(token, process.env.JWT_SECRET)
            req.body.userId = token_decode.id
        } catch (error) {
            console.log("Token verification failed, proceeding as guest:", error.message)
        }
    }

    // If no token, or token was invalid, assign a guest ID
    if (!req.body.userId) {
        req.body.userId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    }

    next()
}

export default authOptional

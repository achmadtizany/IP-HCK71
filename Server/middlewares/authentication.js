const { User } = require("../models/index")
const { verifyToken } = require("../helpers/jwt")

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization) throw { name: "Invalid Token" }

        const [type, token] = authorization.split(" ")

        if (type !== "Bearer" || !token) throw { name: "Invalid Token" }

        const data = verifyToken(token)

        const user = await User.findByPk(data.id)

        if (!user) throw { name: "Invalid Token" }

        req.user = {
            id: user.id, role: user.role
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authentication }
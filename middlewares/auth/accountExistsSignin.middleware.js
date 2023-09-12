import User from "../../models/User.js"

export const accountExistsSignin = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if(user) {
        req.user = {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            country: user.country,
            photo: user.photo,
            password: user.password,
            online: user.online,
            verified: user.verified
        }
        return next()
    }
    return res.status(400).json({
        success: false,
        mesagge: "Usuario no registrado"
    })
}
import crypto from "crypto"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { verify } from "../helpers/google-verify.js"

const controller = {
    signup: async (req, res, next) => {
        try {
            req.body.verified_code = crypto.randomBytes(10).toString("hex")
            req.body.password = bcryptjs.hashSync(req.body.password, 10)

            const user = await User.create(req.body)

            return res.status(201).json({
                success: true,
                message: "Successfully registered user"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error registering user"
            })
        } 
    },
    signin: async (req, res, next) => {
        try {
            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: true },
                { new: true }
            )
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    lastName: user.lastName
                },
                process.env.SECRET_TOKEN,
                {expiresIn: "12h"}
            )

            user.password = null

            return res.status(200).json({
                success: true,
                message: "Usuario logueado con exito",
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        photo: user.photo
                    },
                }
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al autenticar el usuario"
            })
        } 
    },
    googleSignIn: async (req, res, next) => {
        const { token_id } = req.body
        console.log(req.body);
        try {
            // Verifica el token de Google que viene del front
            const {name, email, photo} = await verify(token_id)

            //Verifica si el usuario existe
            let user = await User.findOne({email})
            // Si no existe, se crea
            if (!user) {
                const data = {
                    name,
                    email,
                    photo,
                    password: bcryptjs.hashSync(process.env.STANDARD_PASS, 10),
                    google: true,
                    verify_code: crypto.randomBytes(10).toString("hex")
                }
                user = await User.create(data)
            }
            //Si el usuario ya existe
            //Loguearlo
            user.online = true
            await user.save()

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    photo: user.photo
                },
                process.env.SECRET_TOKEN,
                { expiresIn: "10h" }
            )

            //Devuelvo lo mismo q mi signIn
            return res.status(200).json({
                success: true,
                message: "Usuario logueado con Google",
                response: {
                    token,
                    user: {
                        name: user.name,
                        email: user.email,
                        photo: user.photo
                    },
                }
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al autenticar con Google",
                error: error.message
            })
        } 
    },
    signout: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate(
                {email: req.user.email},
                {online: false},
                {new: true}
            )
            return res.status(200).json({
                success: true,
                message: "Usuario deslogueado"
            })
        } catch(error) {
            res.status(500).json({
                success: false,
                message: "Error al autenticar el usuario"
            })
        }

    },
    token: async (req, res, next) => {
        const { user } = req
        try {
            return res.status(200).json({
                user: {
                    name: user.name,
                    email: user.email,
                    photo: user.photo
                }
            })
        } catch(error) {
            next(error)
        }
    }
}

export default controller
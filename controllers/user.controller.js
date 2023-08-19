import User from "../models/User.js"

const controller = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find()
            return res.status(200).json({
                success: true,
                users
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to get information"
            })
        }
    },
    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body)
            return res.status(200).json({
                success: true,
                message: "User created"
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to create user"
            })
        }
    },
    deleteUser: () => {},
}

export default controller;
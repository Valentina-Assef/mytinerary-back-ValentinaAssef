import City from "../models/City.js";

const controller = {
    getCities: async (req, res) => {
        try {
            const cities = await City.find()
            return res.status(200).json({
                success: true,
                cities
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to get information"
            })
        }
    },
    createCity: async (req, res) => {
        try {
            const newCity = await City.create(req.body)
            return res.status(201).json({
                success: true,
                message: "City created"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to create"
            })
        }
    },
    postCity: () => {},
    deleteCity: () => {},
}

export default controller;
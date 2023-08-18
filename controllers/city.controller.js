import City from "../models/City.js";

const controller = {
    getCities: (req, res) => {
        res.json({
            cities: [
                {name: 'Barcelona'},
                {name: 'Paris'}
            ]
        });
    },
    createCity: async (req, res) => {
        try {
            const newCity = await City.create(req.body);
            return res.status(201).json({
                success: true,
                message: "City created"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error creating city"
            })
        }
    },
    postCity: () => {},
    deleteCity: () => {},
}

export default controller;
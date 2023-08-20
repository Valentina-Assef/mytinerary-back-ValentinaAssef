import City from "../models/City.js";

const controller = {
    //Todas las cities
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
    //City By Id
    getCityById: async (req, res) => {
        try {
            const oneCity = await City.findById(req.params.id)
            if(oneCity){
                return res.status(200).json({
                    success: true,
                    oneCity
                })
            }
            return res.status(404).json({
                success: false,
                message: "City not found"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to get city"
            })
        }
    },
    //Search
    getCities: async (req, res) => {
        let queries = {}
        if(req.query.name){
            queries.name = new RegExp(`^${req.query.name}`, 'i')
        }
        try {
            const cities = await City.find(queries).populate("user")
            if(cities.length > 0){
                return res.status(200).json({
                    success: true,
                    cities
                })
            }
            return res.status(404).json({
                success: false,
                message: "City not found"
            }) 
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to get information"
            })
        }
    },
    //Crear City
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
                message: "Failed to create city"
            })
        }
    },
    //Actualizar City
    updateCity: async (req, res) => {
        try {
            await City.updateOne({_id: req.params.id}, req.body)
            return res.status(200).json({
                success: true,
                message: "City update"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Failed to update city"
            })
        }
    },
    //Borrar City
    deleteCity: async (req, res) => {
        try {
            await City.deleteOne({_id: req.params.id})
            return res.status(200).json({
                success: true,
                message: "City deleted"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Failed to delete city"
            })
        }
    }
}

export default controller;
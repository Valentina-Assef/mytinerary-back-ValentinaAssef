import Itinerary from "../models/Itinerary.js";

const controller = {
    //Create Itinerary
    createItinerary: async (req, res) => {
        try {
            const newItinerary = await Itinerary.create(req.body)
            return res.status(201).json({
                success: true,
                message: "Itinerary created"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to create itinerary"
            })
        }
    },
    //All itineraries
    getItineraries: async (req, res) => {
        try {
            const itineraries = await Itinerary.find()
            return res.status(200).json({
                success: true,
                itineraries
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to get information"
            })
        }
    },
    //Itinerary By Id
    getItineraryById: async (req, res) => {
        try {
            const oneItinerary = await Itinerary.findById(req.params.id)
            if(oneItinerary){
                return res.status(200).json({
                    success: true,
                    oneItinerary
                })
            }
            return res.status(404).json({
                success: false,
                message: "Itinerary not found"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to get itinerary"
            })
        }
    },
    //Update Itinerary
    updateItinerary: async (req, res) => {
        try {
            await Itinerary.updateOne({_id: req.params.id}, req.body)
            return res.status(200).json({
                success: true,
                message: "Itinerary update"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Failed to update itinerary"
            })
        }
    },
    //Delete Itinerary
    deleteItinerary: async (req, res) => {
        try {
            await Itinerary.deleteOne({_id: req.params.id})
            return res.status(200).json({
                success: true,
                message: "Itinerary deleted"
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Failed to delete itinerary"
            })
        }
    }
}

export default controller;
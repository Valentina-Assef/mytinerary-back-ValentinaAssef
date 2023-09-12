import express from "express";
import itineraryController from "../controllers/itinerary.controller.js"
import passport from "../middlewares/passport.js";

const router = express.Router();
const {getItineraries, getItineraryById, getItinerariesByCity, createItinerary, updateItinerary, deleteItinerary } = itineraryController;

router.get('/', getItineraries);
router.get('/:id', getItineraryById);
router.get('/city/:cityId', getItinerariesByCity);
router.post('/', passport.authenticate("jwt", { session: false }), /* isAdmin, */ createItinerary);
router.put('/:id', passport.authenticate("jwt", { session: false }), /* isAdmin, */ updateItinerary);
router.delete('/:id', passport.authenticate("jwt", { session: false }), /* isAdmin, */ deleteItinerary);

export default router;
import { Schema, model, Types } from "mongoose";

const collection = "itineraries";
const schema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    hashtags: [{ type: String, required: true }],
    user: {
        user_name: { type: String, required: true },
        user_img: { type: String, required: true },
    },
    comment: { type: String, required: true },
    city: { type: Types.ObjectId, ref: "cities" }
},{
    timestamps: true
});

const Itinerary = model(collection, schema);

export default Itinerary;
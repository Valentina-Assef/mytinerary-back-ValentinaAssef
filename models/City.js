import { Schema, model, Types } from "mongoose";

const collection = "cities";
const schema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    img: { type: String, required: true },
    user: { type: Types.ObjectId, ref: "users" }
},{
    timestamps: true
});

const City = model(collection, schema);

export default City;
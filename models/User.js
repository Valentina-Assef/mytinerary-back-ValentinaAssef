import { Schema, model, Types } from "mongoose";

const collection = "users";
const schema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true }
},{
    timestamps: true
});

const User = model(collection, schema);

export default User;
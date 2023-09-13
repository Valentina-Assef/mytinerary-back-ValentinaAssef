import { Schema, model, Types } from "mongoose";

const collection = "users";
const schema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    country: { type: String },
    photo: { type: String },
    password: { type: String, required: true },
    google: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    verified: { type: Boolean, default: true },
    verified_code: { type: String }
},{
    timestamps: true
});

const User = model(collection, schema);

export default User;
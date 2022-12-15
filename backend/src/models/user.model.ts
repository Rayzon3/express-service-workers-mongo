import mongoose from "mongoose";

const User = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    mobileNum: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    linkedinURL: {type: String, required: true},
    contactCSV_urn: {type: String, default: ""}
}, {
    collection: "user-data"
})

const model = mongoose.model("UserData", User)

export default model 
const mongoose = require("mongoose")

const markSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: "student"
    },
    subject: {
        type: mongoose.Types.ObjectId,
        ref: "subject"
    },
    score: {
        type: Number,
        require: true
    },

}, { timestamps: true })

module.exports = mongoose.model("mark", markSchema)
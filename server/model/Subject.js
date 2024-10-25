const mongoose = require("mongoose")

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
}, { timestamps: true })

module.exports = mongoose.model("subject", subjectSchema)
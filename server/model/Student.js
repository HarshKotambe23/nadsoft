const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
}, { timestamps: true })

module.exports = mongoose.model("student", studentSchema)
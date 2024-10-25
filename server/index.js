const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config({ path: "./.env" })


const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.NODE_ENV === "dev" ? "http://localhost:5173" : process.env.LIVE_SERVER,
    credentials: true
}))


app.use("/api/admin", require("./routes/admin.routes"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource not found" })
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "some thing went wrong" || err.message })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongo connected");
    app.listen(process.env.PORT, console.log(`SERVER RUNNING AT : http://localhost:${process.env.PORT}`))
})
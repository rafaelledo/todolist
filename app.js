const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.set("view engine", "ejs")

app.get("/", function(req, res) {
    let today = new Date()
    let currentDay = today.getDay()
    let dayType = ""

    if (currentDay === 6 || currentDay === 0) {
        dayType = "Weekend"
    } else {
        dayType = "Weekday"
    }

    res.render("list", {DayType: dayType})
})


app.listen(3000, function() {
    console.log("Servert started on port 3000")
})
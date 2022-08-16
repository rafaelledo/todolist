const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded())
app.use(express.static("public"))

let items = ["Buy Yu-Gi-Oh! cards", "Open the deck", "Play with friends"]

app.get("/", function(req, res) {
    let today = new Date()
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US", options)


    res.render("list", {
        day: day,
        items: items
    })
})

app.post("/", (req, res) => {
    const newItem = req.body.newItem

    items.push(newItem)

    res.redirect("/")
})


app.listen(3000, function() {
    console.log("Servert started on port 3000")
})
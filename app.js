const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")

const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded())
app.use(express.static("public"))

const items = ["Buy Yu-Gi-Oh! cards", "Open the deck", "Play with friends"]
const games = ["League of Legends", "Genshin Impact", "Dbz Budokai T 3"]

app.get("/", function(req, res) {
    const day = date.getDate()

    res.render("list", {
        listTitle: day,
        items: items
    })
})

app.post("/", (req, res) => {
    const newItem = req.body.newItem

    if (req.body.button === "Games") {
        games.push(newItem)
        res.redirect("/games")
    } else {
        items.push(newItem)
        res.redirect("/")
    }
})

app.get("/games", (req, res) => {
    res.render("list", {
        listTitle: "Games List",
        items: games
    })
})

app.get("/about", (req, res) => {
    res.render("about")
})

app.listen(3000, function() {
    console.log("Server started on port 3000")
})
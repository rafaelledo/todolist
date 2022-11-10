const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const _ = require("lodash")

const app = express()

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))
// password removed for secure reasons
mongoose.connect("mongodb+srv://rgnh55:@rafael-cluster.xsxmtkv.mongodb.net/todolistDB")

const itemSchema = new mongoose.Schema({
    name: String,
    type: String
})

const Item = mongoose.model("Item", itemSchema)

const obelisk = new Item({
    name: "Obelisk The Tormentor",
    type: "Divine Beast"
})

const dragon_ra = new Item({
    name: "The Winged Dragon of Ra",
    type: "Divine Beast"
})

const blue_eyes_dragon = new Item({
    name: "Blue-Eyes White Dragon",
    type: "Dragon"
})

const defaultItems = [obelisk, dragon_ra, blue_eyes_dragon]

const listSchema = {
    name: String,
    items: [itemSchema]
}

const List = mongoose.model("List", listSchema)

app.get("/", function (req, res) {
    Item.find({}, (err, items) => {
        if (items.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (!err) {
                    console.log("Root route populated")
                }
            })
            res.redirect("/")
        } else {
            res.render("list", {
                listTitle: "Today",
                items: items
            })
        }
    })
})

app.get("/:foo", (req, res) => {
    const foo = _.capitalize(req.params.foo)

    List.findOne({ name: foo }, (err, result) => {
        if (!result) {
            const list = new List({
                name: foo,
                items: defaultItems
            })
            list.save()
            res.redirect("/" + foo)
        } else {
            res.render("list", { listTitle: result.name, items: result.items })
        }
    })
})

app.post("/", (req, res) => {
    const itemName = req.body.newItem
    const listName = req.body.list
    const item = new Item({
        name: itemName
    })

    if (listName === "Today") {
        item.save()
        res.redirect("/")
    } else {
        List.findOne({ name: listName }, (err, foundList) => {
            foundList.items.push(item)
            foundList.save()
            res.redirect("/" + listName)
        })
    }
})

app.post("/delete", (req, res) => {
    const itemId = req.body.deleteItem
    const listName = req.body.listName

    if (listName === "Today") {
        Item.deleteOne({ _id: itemId }, (err) => {
            if (!err) {
                console.log("Deleted document from root route")
            }
        })
        res.redirect("/")
    } else {
        List.findOneAndUpdate(
            { name: listName },
            { $pull: { items: { _id: itemId } } },
            (err, foundList) => {
                if (!err) {
                    res.redirect("/" + listName)
                }
            }
        )
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

app.listen(3000, function () {
    console.log("Server started on port 3000")
})
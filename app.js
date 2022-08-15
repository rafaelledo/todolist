const express = requite("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.urlencoded({urlencoded:true}))

app.get("/", function(req, res) {
    res.send("Hello")
})






app.listen(3000, function() {
    console.log("Server started on port 3000")
})
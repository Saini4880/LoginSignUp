const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require('./mongodb')
const Collection1 = require("./mongodb")

const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("Login")
})

app.get("/signup", (req, res) => {
    res.render("Signup")
})

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }
    await Collection1.insertMany([data])
    res.render("home")
})

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name:req.body.name})
        if (check.password === req.body.password) {
            res.render("home")
        }
        else {
            res.send("Paswword is wrong")
        }

    }

    // catch {
    //     res.send("Wrong Details")

    // }
    catch(error){
        res.status(500).json(message, error.message)
    }



})

app.listen(3000, () => {
    console.log('port connected');
})

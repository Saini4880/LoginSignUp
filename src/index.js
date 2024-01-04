const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt"); // Add bcrypt for password hashing

const collection = require("./mongodb");

const templatePath = path.join(__dirname, "../templates");

app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use(
  session({
    secret: "your-secret-key", // Change this to a random secret key
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("Login");
});

app.get("/signup", (req, res) => {
  res.render("Signup");
});

app.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
    const data = {
      name: req.body.name,
      password: hashedPassword,
    };
    await collection.insertMany([data]);
    res.render("home");
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await collection.findOne({ name: req.body.name });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      req.session.user = user; // Store user in session
      res.cookie("user", user.name); // Set user cookie
      res.render("home");
    } else {
      res.send("Username or password is incorrect");
    }
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("port connected");
});

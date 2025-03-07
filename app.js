const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");


app.use(express.json());

// Static File
app.use(express.static(__dirname + "/public"));


// Routing 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});
app.get("/cart", (req, res) => {
    res.sendFile(__dirname + "/public/cart.html");
});

// API
app.post("/api/add-to-cart", (req, res) => {
  const product = req.body;
  console.log(product)
  const cartPath = path.join(__dirname, "data", "file.json");
  fs.readFile(cartPath, "utf8", (err, data) => {
    if (err) {
      return res.json({ message: "Failed"})
    }

    let cart = JSON.parse(data);
    cart.push(product);
    fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
      if (err) {
        return res.json({error: "failed"})
      }
      res.json({message: "Product added to cart"})
    })
  })
})

app.get("/api/cart", (req, res) => {
  const cartPath = path.join(__dirname, "data", "file.json");
  fs.readFile(cartPath, "utf8", (err, data) => {
    if (err) {
      return res.json({message: "Failed"})
    }
    let cart = JSON.parse(data);
    if (!Array.isArray(cart)) {
      cart = [];
    }

    res.json(cart);
  })
})

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000}`);
});


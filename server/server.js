require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const seedrandom = require("seedrandom");

const port = process.env.PORT;
const mongo_url = process.env.MONGO_URI;

const app = express();

const Orders = require("./orders");
const Products = require("./products");

// Middleware
app.use(cors());
app.use(express.json());
//app.use(express.static(path.join(__dirname, './public/dist')));

// Connect to MongoDB
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
// Fetch all past orders
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Orders.find().select("-_id -__v");
    if (!orders) {
      return res.status(404).json({ error: "Past orders unavailable" });
    }
    res.json(orders);
  } catch (error) {
    console.error("Error fetching past orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch past order by order ID
app.get("/api/orders/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Orders.findOne({ order_id: id }).select("-_id -__v");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(`Error fetching order id=${id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add new order to database
app.post("/api/orders", async (req, res) => {
  try {
    // Generate unique numeric order ID
    const orderCount = await Orders.countDocuments();
    const orderId = orderCount + 1;

    const orderData = {
      ...req.body,
      order_id: orderId,
      timestamp: new Date(),
    };

    const newOrder = new Orders(orderData);
    await newOrder.save();

    res.status(201).json({
      success: true,
      order: newOrder,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error(`Error adding order:`, error);
    res.status(500).json({
      success: false,
      error: "Failed to place order",
      details: error.message,
    });
  }
});

// Fetch list of categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Products.find({}, { _id: 0, category: 1 });
    if (!categories) {
      return res.status(404).json({ error: "Categories unavailable" });
    }

    const catList = categories.map((item) => item.category);
    const catUnique = [...new Set(catList)].sort();

    res.json(catUnique);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch top level categories
app.get("/api/categories/top", async (req, res) => {
  try {
    const categories = await Products.find({}, { _id: 0, category: 1 });
    if (!categories) {
      return res.status(404).json({ error: "Categories unavailable" });
    }

    const catList = categories.map((item) => {
      return item.category
        .split("|")[0]
        .split("&")[0]
        .split(/(?=[A-Z])/)[0];
    });
    const catUnique = [...new Set(catList)].sort();

    res.json(catUnique);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch entire catalog (lightweight)
app.get("/api/products/catalog", async (req, res) => {
  const filter =
    "-about_product -user_id -user_name -review_id -review_title -review_content -product_link";
  try {
    const catalog = await Products.find().select(filter);
    if (!catalog) {
      return res.status(404).json({ error: "Catalog unavailable" });
    }
    res.json(catalog);
  } catch (error) {
    console.error("Error fetching product catalog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch catalog by category
app.get("/api/products/catalog/:cat", async (req, res) => {
  const cat = req.params.cat;
  const categoryAmp = cat.replace(" ", "&");
  const categoryJoin = cat.replace(" ", "");

  const filter =
    "-about_product -user_id -user_name -review_id -review_title -review_content -product_link";
  try {
    const catalog = await Products.find().select(filter);
    if (!catalog) {
      return res.status(404).json({ error: "Catalog unavailable" });
    }

    const catalogFlt = catalog.filter((product) => {
      return (
        product.category.startsWith(categoryAmp) ||
        product.category.startsWith(categoryJoin)
      );
    });

    res.json(catalogFlt);
  } catch (error) {
    console.error("Error fetching product catalog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch 'num' products from catalog
app.get("/api/products/catalog/n/:num", async (req, res) => {
  const num = req.params.num;
  const filter =
    "-about_product -user_id -user_name -review_id -review_title -review_content -product_link";
  try {
    const catalog = await Products.find()
      .select(filter)
      .sort({ _id: 1 })
      .limit(num);
    if (!catalog) {
      return res.status(404).json({ error: "Catalog unavailable" });
    }
    res.json(catalog);
  } catch (error) {
    console.error("Error fetching product catalog:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch featured products
app.get("/api/products/featured/:num", async (req, res) => {
  const numFeatured = req.params.num;
  const filter =
    "-about_product -user_id -user_name -review_id -review_title -review_content -product_link";
  try {
    const catalog = await Products.find().select(filter);
    if (!catalog) {
      return res.status(404).json({ error: "Featured products unavailable" });
    }

    let topRated = catalog.filter((product) => {
      return parseFloat(product.rating) > 4.4;
    });
    //console.log(`Found ${topRated.length} products rated >4.4`);

    let featured = [];
    let len = topRated.length;
    let ind = 0;
    const seed = new Date().getDate();
    const rng = seedrandom(seed);

    while (featured.length < numFeatured) {
      ind = ((rng.int32() % len) + len) % len;
      featured = [...featured, topRated[ind]];
      delete topRated[ind];
      len -= 1;
    }

    res.json(featured);
  } catch (error) {
    console.error(`Error fetching featured products:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch item listing by product ID
app.get("/api/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Products.findOne({ product_id: id }).select(
      "-_id -__v"
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(`Error fetching product id=${id}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

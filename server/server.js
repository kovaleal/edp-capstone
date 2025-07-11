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

// Recommendation service configuration
const RECOMMENDATION_SERVICE_URL =
  process.env.RECOMMENDATION_SERVICE_URL || "http://localhost:5001";

// Helper function to call recommendation service
async function callRecommendationService(endpoint) {
  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch(`${RECOMMENDATION_SERVICE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Recommendation service error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to call recommendation service:", error);
    throw error;
  }
}

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

// Recommendation endpoints
// Health check for recommendation service
app.get("/api/recommendations/health", async (req, res) => {
  try {
    const health = await callRecommendationService("/health");
    res.json({
      status: "success",
      recommendation_service: health,
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      message: "Recommendation service unavailable",
      error: error.message,
    });
  }
});

// Get recommendations for a product by product ID
app.get("/api/recommendations/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const recommendations = await callRecommendationService(
      `/api/recommendations/product/${productId}`
    );

    // Transform the recommendations to match frontend format
    const transformedRecommendations = recommendations.recommendations.map(
      (rec) => ({
        id: rec.product_id,
        name: rec.product_name,
        price: parseFloat(rec.discounted_price.replace(/[^0-9.-]+/g, "") || 0),
        originalPrice: parseFloat(
          rec.actual_price.replace(/[^0-9.-]+/g, "") || 0
        ),
        rating: parseFloat(rec.rating || 0),
        ratingCount: parseInt(rec.rating_count.replace(/,/g, "") || 0),
        category: rec.category,
        image: rec.img_link,
        onSale:
          parseFloat(rec.discounted_price.replace(/[^0-9.-]+/g, "") || 0) <
          parseFloat(rec.actual_price.replace(/[^0-9.-]+/g, "") || 0),
        stock: Math.floor(Math.random() * 50) + 1, // Random stock since it's not in data
        similarity: rec.similarity_score,
        sameCategory: rec.same_category,
      })
    );

    res.json({
      success: true,
      query_product: recommendations.query_product,
      recommendations: transformedRecommendations,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch recommendations",
      message: error.message,
    });
  }
});

// Get recommendations by product index (for internal use)
app.get("/api/recommendations/index/:index", async (req, res) => {
  try {
    const { index } = req.params;
    const recommendations = await callRecommendationService(
      `/api/recommendations/${index}`
    );
    res.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations by index:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch recommendations",
      message: error.message,
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Normalize category names to match top categories format
const normalizeCategoryName = (category) => {
  if (!category) return "";

  // Handle special cases and extract the first meaningful word
  const normalizedMap = {
    HomeImprovements: "Home",
    HomeImprovement: "Home",
    "Home&Garden": "Home",
    HomeGarden: "Home",
    "Computers&Accessories": "Computers",
    ComputersAccessories: "Computers",
    MusicalInstruments: "Musical",
    "Musical Instruments": "Musical",
    OfficeProducts: "Office",
    "Office Products": "Office",
    Electronics: "Electronics",
    Clothing: "Clothing",
    Sports: "Sports",
    Beauty: "Beauty",
    Books: "Books",
    Toys: "Toys",
  };

  // Check if we have a direct mapping
  if (normalizedMap[category]) {
    return normalizedMap[category];
  }

  // Extract first word before special characters
  const firstWord = category.split(/[&|,\s]+/)[0];

  // Return the first word, with special handling for known patterns
  if (firstWord.toLowerCase().startsWith("home")) {
    return "Home";
  } else if (firstWord.toLowerCase().startsWith("computer")) {
    return "Computers";
  } else if (firstWord.toLowerCase().startsWith("musical")) {
    return "Musical";
  } else if (firstWord.toLowerCase().startsWith("office")) {
    return "Office";
  }

  return firstWord;
};

// Transform backend product data to frontend format
const transformProduct = (backendProduct) => {
  if (!backendProduct) return null;
  const INR_to_USD = 0.01165;

  return {
    id: backendProduct.product_id,
    name: backendProduct.product_name,
    price: INR_to_USD * parseFloat(
      backendProduct.discounted_price.replace(/[^0-9.-]+/g, "") || 0
    ),
    originalPrice: INR_to_USD * parseFloat(
      backendProduct.actual_price.replace(/[^0-9.-]+/g, "") || 0
    ),
    rating: parseFloat(backendProduct.rating || 0),
    ratingCount: parseInt(backendProduct.rating_count || 0),
    category: normalizeCategoryName(backendProduct.category),
    image: backendProduct.img_link,
    description: backendProduct.about_product,
    onSale:
      parseFloat(
        backendProduct.discounted_price.replace(/[^0-9.-]+/g, "") || 0
      ) <
      parseFloat(backendProduct.actual_price.replace(/[^0-9.-]+/g, "") || 0),
    stock: Math.floor(Math.random() * 50) + 1, // Backend doesn't have stock, using random for now
    discountPercentage: backendProduct.discount_percentage,
  };
};

// Transform backend order data to frontend format
const transformOrder = (backendOrder) => {
  if (!backendOrder) return null;

  return {
    id: backendOrder.order_id,
    ...backendOrder,
  };
};

// API service class
class ApiService {
  // Helper method for making requests
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Fallback sample data for testing when backend is not available
  getSampleProducts() {
    return [
      {
        product_id: "sample_1",
        product_name: "Premium Wireless Headphones",
        category: "Electronics",
        discounted_price: "$299.99",
        actual_price: "$399.99",
        discount_percentage: "25%",
        rating: "4.8",
        rating_count: "1250",
        about_product:
          "High-quality wireless headphones with noise cancellation and premium sound quality.",
        img_link:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      },
      {
        product_id: "sample_2",
        product_name: "Smart Fitness Watch",
        category: "Electronics",
        discounted_price: "$249.99",
        actual_price: "$249.99",
        discount_percentage: "0%",
        rating: "4.6",
        rating_count: "890",
        about_product:
          "Advanced fitness tracking with heart rate monitoring and GPS.",
        img_link:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      },
      {
        product_id: "sample_3",
        product_name: "Minimalist Desk Lamp",
        category: "Home",
        discounted_price: "$89.99",
        actual_price: "$129.99",
        discount_percentage: "31%",
        rating: "4.7",
        rating_count: "456",
        about_product:
          "Modern LED desk lamp with adjustable brightness and sleek design.",
        img_link:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
      },
      {
        product_id: "sample_4",
        product_name: "Organic Cotton T-Shirt",
        category: "Clothing",
        discounted_price: "$34.99",
        actual_price: "$34.99",
        discount_percentage: "0%",
        rating: "4.5",
        rating_count: "723",
        about_product:
          "Comfortable organic cotton t-shirt in various colors and sizes.",
        img_link:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      },
      {
        product_id: "sample_5",
        product_name: "Professional Camera Lens",
        category: "Electronics",
        discounted_price: "$899.99",
        actual_price: "$899.99",
        discount_percentage: "0%",
        rating: "4.9",
        rating_count: "234",
        about_product:
          "Professional grade camera lens for stunning photography.",
        img_link:
          "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop",
      },
      {
        product_id: "sample_6",
        product_name: "Yoga Exercise Mat",
        category: "Sports",
        discounted_price: "$49.99",
        actual_price: "$69.99",
        discount_percentage: "29%",
        rating: "4.4",
        rating_count: "567",
        about_product:
          "Non-slip yoga mat perfect for all types of exercises and meditation.",
        img_link:
          "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
      },
    ];
  }

  getSampleCategories() {
    return [
      "Electronics",
      "Clothing",
      "Home",
      "Sports",
      "Musical",
      "Office",
      "Car",
      "Health",
    ];
  }

  // Products API
  async getProducts(limit = null) {
    try {
      const endpoint = limit
        ? `/api/products/catalog/${limit}`
        : "/api/products/catalog";
      const data = await this.request(endpoint);
      return data.map(transformProduct).filter((product) => product !== null);
    } catch (error) {
      console.error(
        "Failed to fetch products from backend, using sample data:",
        error
      );
      // Fallback to sample data when backend is not available
      const sampleData = this.getSampleProducts();
      const transformedData = sampleData
        .map(transformProduct)
        .filter((product) => product !== null);
      return limit ? transformedData.slice(0, limit) : transformedData;
    }
  }

  async getProductById(id) {
    try {
      const data = await this.request(`/api/products/${id}`);
      return transformProduct(data);
    } catch (error) {
      console.error(
        `Failed to fetch product ${id} from backend, trying sample data:`,
        error
      );
      // Fallback to sample data when backend is not available
      const sampleData = this.getSampleProducts();
      const sampleProduct = sampleData.find((p) => p.product_id === id);
      return sampleProduct ? transformProduct(sampleProduct) : null;
    }
  }

  // Categories API
  async getCategories() {
    try {
      const data = await this.request("/api/categories/top");
      return data;
    } catch (error) {
      console.error(
        "Failed to fetch categories from backend, using sample data:",
        error
      );
      // Fallback to sample data when backend is not available
      return this.getSampleCategories();
    }
  }

  // Orders API
  async getOrders() {
    try {
      const data = await this.request("/api/orders");
      return data.map(transformOrder);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      return [];
    }
  }

  async getOrderById(id) {
    try {
      const data = await this.request(`/api/orders/${id}`);
      return transformOrder(data);
    } catch (error) {
      console.error(`Failed to fetch order ${id}:`, error);
      return null;
    }
  }

  async createOrder(orderData) {
    try {
      const response = await this.request("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      // The backend returns { success: true, order: {...}, message: "..." }
      if (response.success) {
        return {
          success: true,
          order: transformOrder(response.order),
          message: response.message,
        };
      } else {
        throw new Error(response.error || "Failed to create order");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      return {
        success: false,
        error: error.message || "Failed to create order",
      };
    }
  }

  // Search and filtering methods
  async searchProducts(query, category = null) {
    try {
      const products = await this.getProducts();

      let filtered = products;

      // Filter by category if specified
      if (category) {
        const normalizedSearchCategory = normalizeCategoryName(category);
        filtered = filtered.filter(
          (product) =>
            product.category.toLowerCase() ===
            normalizedSearchCategory.toLowerCase()
        );
      }

      // Filter by search query if specified
      if (query) {
        const searchLower = query.toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(searchLower) ||
            product.category.toLowerCase().includes(searchLower) ||
            (product.description &&
              product.description.toLowerCase().includes(searchLower))
        );
      }

      return filtered;
    } catch (error) {
      console.error("Failed to search products:", error);
      return [];
    }
  }

  // Get featured products
  async getFeaturedProducts(limit = 8) {
    try {
      const data = await this.request(`/api/products/featured/${limit}`);
      return data.map(transformProduct).filter((product) => product !== null);
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
      // Fallback to sample data when backend is not available
      return this.getSampleProducts()
        .slice(0, limit)
        .map(transformProduct)
        .filter((product) => product !== null);
    }
  }

  // Get products by category with count
  async getProductsByCategory() {
    try {
      const [products, categories] = await Promise.all([
        this.getProducts(),
        this.getCategories(),
      ]);

      return categories.map((category) => {
        const categoryProducts = products.filter(
          (p) => p.category.toLowerCase() === category.toLowerCase()
        );

        return {
          name: category,
          description: this.getCategoryDescription(category),
          image: this.getCategoryImage(category),
          itemCount: `${categoryProducts.length} items`,
          href: `/products?category=${encodeURIComponent(category)}`,
        };
      });
    } catch (error) {
      console.error("Failed to fetch products by category:", error);
      return [];
    }
  }

  // Helper methods for category data
  getCategoryDescription(category) {
    const descriptions = {
      Electronics: "Latest tech gadgets and innovations",
      Clothing: "Trendy clothing and accessories",
      Home: "Beautiful home decor and essentials",
      Sports: "Gear for active lifestyles",
      Books: "Knowledge and entertainment for all ages",
      Toys: "Fun and educational toys for children",
      Beauty: "Premium beauty and personal care products",
      Computers: "Computing devices and accessories",
      Musical: "Musical instruments and audio equipment",
      Office: "Office supplies and productivity tools",
      Car: "Automotive parts and accessories",
      Health: "Health and wellness products",
    };
    return descriptions[category] || "Quality products at great prices";
  }

  getCategoryImage(category) {
    const images = {
      Electronics:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
      Clothing:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      Home: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      Sports:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
      Books:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop",
      Toys: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=400&fit=crop",
      Beauty:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
      Computers:
        "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&h=400&fit=crop",
      Musical:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      Office:
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=600&h=400&fit=crop",
      Car: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop",
      Health:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    };
    return (
      images[category] ||
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
    );
  }

  // Health check
  async healthCheck() {
    try {
      await this.request("/api/products/catalog/1");
      return true;
    } catch (error) {
      console.error("Backend health check failed:", error);
      return false;
    }
  }

  // Recommendations API
  async getRecommendations(productId) {
    try {
      const data = await this.request(
        `/api/recommendations/product/${productId}`
      );
      if (data.success) {
        return {
          success: true,
          queryProduct: data.query_product,
          recommendations: data.recommendations,
        };
      } else {
        throw new Error(data.error || "Failed to get recommendations");
      }
    } catch (error) {
      console.error("Failed to fetch recommendations:", error);
      return {
        success: false,
        error: error.message,
        recommendations: [],
      };
    }
  }

  async checkRecommendationHealth() {
    try {
      const data = await this.request("/api/recommendations/health");
      return data;
    } catch (error) {
      console.error("Recommendation service health check failed:", error);
      return {
        status: "error",
        message: "Service unavailable",
      };
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
export { normalizeCategoryName };

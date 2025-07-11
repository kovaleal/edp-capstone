from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import NearestNeighbors
import os

app = Flask(__name__)
CORS(app)

# Global variables
df = None
knn = None
scaled_features = None
label_encoder = None


def initialize_model():
    """Load data and train the KNN model"""
    global df, knn, scaled_features, label_encoder

    csv_file = "data/amazon.csv"
    if not os.path.exists(csv_file):
        print(f"Error: {csv_file} not found")
        return False

    try:
        df = pd.read_csv(csv_file)
        print(f"Loaded {len(df)} products from CSV")

        # Clean data
        df["price_clean"] = (
            df["discounted_price"]
            .astype(str)
            .str.replace("₹", "")
            .str.replace(",", "")
            .astype(float)
        )
        df["rating_clean"] = pd.to_numeric(df["rating"], errors="coerce")
        df["rating_count_clean"] = (
            df["rating_count"].astype(str).str.replace(",", "").astype(float)
        )
        df["category_clean"] = df["category"].astype(str).str.strip()

        df = df.dropna(
            subset=["price_clean", "rating_clean", "rating_count_clean", "category"]
        )

        # Encode categories
        label_encoder = LabelEncoder()
        df["category_encoded"] = label_encoder.fit_transform(df["category_clean"])

        # Feature engineering
        features = df[
            ["price_clean", "rating_clean", "rating_count_clean", "category_encoded"]
        ].copy()
        features["rating_count_clean"] = np.log1p(
            features["rating_count_clean"]
        )  # Log transform to lower discrepancy between large rating counts
        max_price = features["price_clean"].max()
        features["price_clean"] = (
            max_price - features["price_clean"]
        )  # Invert pricing to make cheaper goods more valuable

        # Scale and weight features
        scaler = StandardScaler()
        scaled_features = scaler.fit_transform(features)
        weights = np.array(
            [0.35, 0.25, 0.2, 0.2]
        )  # 35% price, 25% rating, 20% rating_count, 20% category
        scaled_features = scaled_features * weights

        # Train model
        knn = NearestNeighbors(n_neighbors=6, metric="euclidean")  # Request 6 neighbors
        knn.fit(scaled_features)

        print(f"Model trained successfully with {len(df)} products")
        return True
    except Exception as e:
        print(f"Error initializing model: {e}")
        return False


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify(
        {
            "status": "healthy",
            "model_ready": df is not None and knn is not None,
            "products_loaded": len(df) if df is not None else 0,
        }
    )


@app.route("/api/recommendations/product/<product_id>", methods=["GET"])
def get_recommendations_by_id(product_id):
    """Get recommendations for a product by product_id"""
    if df is None or knn is None:
        return jsonify({"error": "Model not initialized"}), 500

    # Find product by product_id
    product_row = df[df["product_id"] == product_id]
    if product_row.empty:
        return jsonify({"error": "Product not found"}), 404

    product_index = product_row.index[0]
    return get_recommendations_by_index(product_index)


@app.route("/api/recommendations/<int:product_index>", methods=["GET"])
def get_recommendations(product_index):
    """Get recommendations for a product by index"""
    return get_recommendations_by_index(product_index)


def get_recommendations_by_index(product_index):
    """Helper function to get recommendations by index"""
    if df is None or knn is None:
        return jsonify({"error": "Model not initialized"}), 500

    if product_index < 0 or product_index >= len(df):
        return jsonify({"error": "Invalid product index"}), 400

    distances, indices = knn.kneighbors(scaled_features[product_index].reshape(1, -1))

    query_product = df.iloc[product_index]
    recommendations = []

    # Skip the first result (index 0) since it's the same product
    # Take the next 5 results (indices 1-5)
    for i, (dist, idx) in enumerate(zip(distances[0][1:], indices[0][1:])):
        similarity = 1 / (1 + dist)
        product = df.iloc[idx]

        recommendations.append(
            {
                "product_id": product["product_id"],
                "product_name": product["product_name"],
                "discounted_price": product["discounted_price"],
                "actual_price": product["actual_price"],
                "rating": product["rating"],
                "rating_count": product["rating_count"],
                "category": product["category"],
                "img_link": product["img_link"],
                "same_category": product["category_clean"]
                == query_product["category_clean"],
                "similarity_score": round(similarity, 3),
            }
        )

    return jsonify(
        {
            "query_product": {
                "product_id": query_product["product_id"],
                "product_name": query_product["product_name"],
                "discounted_price": query_product["discounted_price"],
                "rating": query_product["rating"],
                "category": query_product["category_clean"],
            },
            "recommendations": recommendations,
        }
    )


if __name__ == "__main__":
    print("Initializing recommendation service...")
    if initialize_model():
        port = int(os.environ.get("PORT", 5001))
        print(f"Starting Flask server on port {port}...")
        app.run(port=port)
    else:
        print("Failed to initialize model. Exiting.")

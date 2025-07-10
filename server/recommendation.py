import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

csv_file = "data/amazon.csv"
df = pd.read_csv(csv_file)

print(f"Loaded {len(df)} products")

# Cleaning data
df['price_clean'] = df['discounted_price'].astype(str).str.replace('₹', '').str.replace(',', '').astype(float)
df['rating_clean'] = pd.to_numeric(df['rating'], errors='coerce')
df['rating_count_clean'] = df['rating_count'].astype(str).str.replace(',', '').astype(float)

# Remove rows with missing values
df = df.dropna(subset=['price_clean', 'rating_clean', 'rating_count_clean'])
print(f"After cleaning: {len(df)} products")

# Feature engineering
features = df[['price_clean', 'rating_clean', 'rating_count_clean']].copy()
features['rating_count_clean'] = np.log1p(features['rating_count_clean'])  # Log transform to lower discrepancy between large rating counts
max_price = features['price_clean'].max()
features['price_clean'] = max_price - features['price_clean']  # Invert pricing to make cheaper goods more valuable

# Scale features
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# Weights: 40% price, 30% rating, 30% rating_count
weights = np.array([0.4, 0.3, 0.3])
scaled_features = scaled_features * weights

# Train KNN model
knn = NearestNeighbors(n_neighbors=6, metric='euclidean')
knn.fit(scaled_features)

print("Model trained!")

def get_recommendations(product_index, n_recs=5):
    """Get recommendations for a product"""
    distances, indices = knn.kneighbors(scaled_features[product_index].reshape(1, -1))
    
    print(f"\nQuery Product: {df.iloc[product_index]['product_name']}")
    print(f"Price: {df.iloc[product_index]['discounted_price']}")
    print(f"Rating: {df.iloc[product_index]['rating']}")
    
    print(f"\nTop {n_recs} Similar Products:")
    for i, (dist, idx) in enumerate(zip(distances[0][1:n_recs+1], indices[0][1:n_recs+1])):
        similarity = 1 / (1 + dist)
        product = df.iloc[idx]
        print(f"{i+1}. {product['product_name'][:50]}...")
        print(f"   Price: {product['discounted_price']} | Rating: {product['rating']} | Similarity: {similarity:.3f}")

# Test with a random product
random_idx = np.random.randint(0, len(df))
get_recommendations(random_idx)
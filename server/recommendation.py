import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import NearestNeighbors

csv_file = "data/amazon.csv"
df = pd.read_csv(csv_file)

print(f"Loaded {len(df)} products")

# Cleaning data
df['price_clean'] = df['discounted_price'].astype(str).str.replace('₹', '').str.replace(',', '').astype(float)
df['rating_clean'] = pd.to_numeric(df['rating'], errors='coerce')
df['rating_count_clean'] = df['rating_count'].astype(str).str.replace(',', '').astype(float)
df['category_clean'] = df['category'].astype(str).str.strip()

# Remove rows with missing values
df = df.dropna(subset=['price_clean', 'rating_clean', 'rating_count_clean', 'category'])
print(f"After cleaning: {len(df)} products")

# Label Encoder for categories
label_encoder = LabelEncoder()
df['category_encoded'] = label_encoder.fit_transform(df['category_clean'])

# Feature engineering
features = df[['price_clean', 'rating_clean', 'rating_count_clean', 'category_encoded']].copy()
features['rating_count_clean'] = np.log1p(features['rating_count_clean'])  # Log transform to lower discrepancy between large rating counts
max_price = features['price_clean'].max()
features['price_clean'] = max_price - features['price_clean']  # Invert pricing to make cheaper goods more valuable

# Scale features
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# Weights: 35% price, 25% rating, 20% rating_count, 20% category
weights = np.array([0.35, 0.25, 0.2, 0.2])
scaled_features = scaled_features * weights

# Train KNN model
knn = NearestNeighbors(n_neighbors=6, metric='euclidean')
knn.fit(scaled_features)

print("Model trained!")

def get_recommendations(product_index, n_recs=5):
    """Get recommendations for a product"""
    distances, indices = knn.kneighbors(scaled_features[product_index].reshape(1, -1))
    
    query_product = df.iloc[product_index]
    query_category = query_product['category_clean']
    
    print(f"\nQuery Product: {query_product['product_name']}")
    print(f"Price: {query_product['discounted_price']}")
    print(f"Rating: {query_product['rating']}")
    print(f"Category: {query_category}")
    
    print(f"\nTop {n_recs} Similar Products:")    
    for i, (dist, idx) in enumerate(zip(distances[0][1:n_recs+1], indices[0][1:n_recs+1])):
        similarity = 1 / (1 + dist)
        product = df.iloc[idx]
        
        # Check if categories match
        same_category = product['category_clean'] == query_category
        if same_category:
            category_indicator = "✓ SAME CATEGORY"
        else:
            category_indicator = "✗ Different category"
        
        print(f"{i+1}. {product['product_name'][:50]}...")
        print(f"   Price: {product['discounted_price']} | Rating: {product['rating']} | Similarity: {similarity:.2f}")
        print(f"   Category Match: {category_indicator}")
    

# Test with a random product
random_idx = np.random.randint(0, len(df))
get_recommendations(random_idx)
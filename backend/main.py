from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = FastAPI()

# Enable CORS to allow frontend requests from http://localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load products from CSV
products = pd.read_csv("products.csv")

# Vectorize tags using TF-IDF
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(products["tags"])

# Compute cosine similarity matrix
similarity_matrix = cosine_similarity(tfidf_matrix)

# Define request model for browsing history
class History(BaseModel):
    history: list[int]

@app.get("/products")
def get_products():
    """Return all products."""
    return products.to_dict(orient="records")

@app.post("/recommend")
def recommend(history: History):
    """Generate 3 product recommendations based on browsing history."""
    history_ids = history.history
    if not history_ids:
        raise HTTPException(status_code=400, detail="Browsing history is empty")

    # Get indices of products in browsing history
    history_indices = []
    for pid in history_ids:
        idx = products[products["id"] == pid].index
        if len(idx) == 0:
            raise HTTPException(status_code=404, detail=f"Product ID {pid} not found")
        history_indices.append(idx[0])
    history_indices = np.array(history_indices)

    # Get indices of products not in history
    other_indices = np.array([i for i in range(len(products)) if i not in history_indices])

    if len(other_indices) == 0:
        return {"recommendations": []}

    # Compute similarity scores (max similarity to any product in history)
    sim_submatrix = similarity_matrix[np.ix_(other_indices, history_indices)]
    scores = np.max(sim_submatrix, axis=1)
    top_indices = np.argsort(scores)[::-1][:3]  # Get top 3
    top_product_indices = other_indices[top_indices]
    top_products = products.iloc[top_product_indices]

    return {"recommendations": top_products.to_dict(orient="records")}
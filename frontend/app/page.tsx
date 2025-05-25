'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [history, setHistory] = useState<number[]>([]);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  // Fetch all products on mount
  useEffect(() => {
    fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  // Add product to browsing history
  const addToHistory = (productId: number) => {
    if (!history.includes(productId)) {
      setHistory([...history, productId]);
    }
  };

  // Fetch recommendations based on browsing history
  const getRecommendations = () => {
    if (history.length === 0) {
      alert('Please click on some products first to build a browsing history!');
      return;
    }
    
    fetch('http://localhost:8000/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history })
    })
      .then(res => res.json())
      .then(data => setRecommendations(data.recommendations))
      .catch(err => console.error('Error fetching recommendations:', err));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Product Recommendation System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <p className="mb-2 text-sm text-gray-600">Click on products to add them to your browsing history</p>
          <ul className="border rounded-lg divide-y">
            {products.map(product => (
              <li
                key={product.id}
                onClick={() => addToHistory(product.id)}
                className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">{product.category} - ${product.price}</div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Browsing History</h2>
          {history.length > 0 ? (
            <ul className="border rounded-lg divide-y mb-6">
              {history.map(id => {
                const product = products.find(p => p.id === id);
                return (
                  <li key={id} className="p-3">
                    {product ? product.name : 'Unknown Product'}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 mb-6">No browsing history yet. Click on some products!</p>
          )}

          <button
            onClick={getRecommendations}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Recommendations
          </button>

          <h2 className="text-xl font-semibold mt-8 mb-4">Recommended For You</h2>
          {recommendations.length > 0 ? (
            <ul className="border rounded-lg divide-y">
              {recommendations.map(product => (
                <li key={product.id} className="p-3">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.category} - ${product.price}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recommendations yet. Add products to your history and click "Get Recommendations"!</p>
          )}
        </div>
      </div>
    </div>
  );
}
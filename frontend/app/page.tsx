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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:8000/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product to browsing history
  const addToHistory = (productId: number) => {
    if (!history.includes(productId)) {
      setHistory([...history, productId]);
      // Visual feedback
      const element = document.getElementById(`product-${productId}`);
      if (element) {
        element.classList.add('bg-green-50');
        setTimeout(() => {
          element.classList.remove('bg-green-50');
        }, 500);
      }
    }
  };

  // Fetch recommendations based on browsing history
  const getRecommendations = async () => {
    if (history.length === 0) {
      alert('Please click on some products first to build a browsing history!');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:8000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history })
      });
      
      if (!res.ok) throw new Error('Failed to fetch recommendations');
      
      const data = await res.json();
      setRecommendations(data.recommendations);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to get recommendations. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear browsing history
  const clearHistory = () => {
    setHistory([]);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Smart Shop</h1>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">AI-Powered Recommendations</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 dark:bg-red-900/30 dark:text-red-300">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Column */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Available Products
              </h2>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Click on products to add them to your browsing history
              </p>
              
              {isLoading && products.length === 0 ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400"></div>
                </div>
              ) : (
                <ul className="border dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                  {products.map(product => (
                    <li
                      id={`product-${product.id}`}
                      key={product.id}
                      onClick={() => addToHistory(product.id)}
                      className="p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.category}</div>
                        </div>
                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {product.tags}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* History and Recommendations Column */}
          <div>
            {/* Browsing History */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Browsing History
                </h2>
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              {history.length > 0 ? (
                <ul className="border dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 mb-4">
                  {history.map(id => {
                    const product = products.find(p => p.id === id);
                    return (
                      <li key={id} className="p-3 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2"></span>
                        <span className="text-gray-800 dark:text-gray-200">
                          {product ? product.name : 'Unknown Product'}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 border dark:border-gray-700 border-dashed rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p>No browsing history yet</p>
                  <p className="text-sm mt-1">Click on products to add them here</p>
                </div>
              )}

              <button
                onClick={getRecommendations}
                disabled={isLoading || history.length === 0}
                className={`w-full px-4 py-2 rounded-md transition-colors flex items-center justify-center ${history.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'}`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  'Get Recommendations'
                )}
              </button>
            </div>

            {/* Recommendations */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Recommended For You
              </h2>
              
              {recommendations.length > 0 ? (
                <ul className="border dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700">
                  {recommendations.map(product => (
                    <li key={product.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{product.category}</div>
                        </div>
                        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                          ${product.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        {product.tags}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400 border dark:border-gray-700 border-dashed rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <p>No recommendations yet</p>
                  <p className="text-sm mt-1">Browse products and click "Get Recommendations"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© 2023 Smart Shop. All rights reserved.</p>
          <p className="mt-2">Powered by AI recommendation engine</p>
        </div>
      </footer>
    </div>
  );
}
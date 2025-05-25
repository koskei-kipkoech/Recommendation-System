# Product Recommendation System

A full-stack application that demonstrates a product recommendation system using TF-IDF and cosine similarity.

## Project Structure

This project consists of two main components:

### Backend

- Located in the `/backend` directory
- Built with FastAPI and scikit-learn
- Provides API endpoints for product listing and recommendations
- Uses TF-IDF vectorization and cosine similarity for recommendation algorithm

### Frontend

- Located in the `/frontend` directory
- Built with Next.js, React, and TypeScript
- Provides a user interface for browsing products and getting recommendations
- Uses Tailwind CSS for styling

## Getting Started

### 1. Start the Backend

```bash
cd backend
pipenv install  # Install dependencies from Pipfile
pipenv shell    # Activate virtual environment
uvicorn main:app --reload  # Start the server
```

The backend will be available at http://localhost:8000

### 2. Start the Frontend

```bash
cd frontend
npm install  # Install dependencies
npm run dev  # Start the development server
```

The frontend will be available at http://localhost:3000

## How It Works

1. The system uses a sample product dataset with tags for each product
2. When a user browses products, their browsing history is tracked
3. The recommendation algorithm uses TF-IDF to vectorize product tags
4. Cosine similarity is calculated between products in the browsing history and other products
5. Products with the highest similarity scores are recommended to the user

## Technologies Used

- **Backend**: FastAPI, pandas, scikit-learn, numpy
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Data Processing**: TF-IDF vectorization, cosine similarity

## Future Improvements

- Add user authentication
- Implement more advanced recommendation algorithms
- Add product images and more detailed information
- Implement caching for better performance
- Add unit and integration tests

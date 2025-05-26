# Product Recommendation System

A full-stack application that demonstrates an AI-powered product recommendation system using TF-IDF vectorization and cosine similarity algorithms.

<div align="center">
  <!-- Frontend Technologies -->
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <!-- Backend Technologies -->
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="scikit-learn" />
  <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" alt="Pandas" />
</div>

## Project Overview

This project showcases a modern approach to product recommendations by analyzing browsing history and finding similar products using natural language processing techniques. The system consists of two main components:

### Backend (FastAPI)

- Located in the `/backend` directory
- Built with FastAPI, pandas, scikit-learn, and numpy
- Provides RESTful API endpoints for product listing and recommendations
- Implements TF-IDF vectorization and cosine similarity for recommendation algorithm
- Handles CORS for seamless frontend integration

### Frontend (Next.js)

- Located in the `/frontend` directory
- Built with Next.js, React, TypeScript, and Tailwind CSS
- Provides a responsive user interface for browsing products and getting recommendations
- Features interactive browsing history tracking and visual feedback
- Supports both light and dark modes

## Getting Started

### Prerequisites

- **Backend**: Python 3.9+, pipenv
- **Frontend**: Node.js 18+, npm or yarn

### 1. Setting Up the Backend

```bash
# Navigate to the backend directory
cd backend

# Install dependencies using pipenv
pipenv install

# Activate the virtual environment
pipenv shell

# Start the FastAPI server with hot-reload
uvicorn main:app --reload
```

The backend server will be available at http://localhost:8000

You can also access the API documentation at http://localhost:8000/docs

### 2. Setting Up the Frontend

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

The frontend application will be available at http://localhost:3000

## How It Works

### Recommendation Algorithm

1. **Data Preparation**: The system uses a product dataset with tags for each product
2. **Vectorization**: TF-IDF (Term Frequency-Inverse Document Frequency) is used to convert product tags into numerical vectors
3. **Similarity Calculation**: When a user browses products, the system tracks their history and calculates cosine similarity between those products and others in the catalog
4. **Ranking**: Products with the highest similarity scores are recommended to the user

### Data Flow

1. **Initial Load**: The frontend fetches all products from the backend's `/products` endpoint
2. **User Interaction**: As users click on products, they're added to the browsing history with visual feedback
3. **Recommendation Request**: When the user clicks "Get Recommendations", their browsing history is sent to the backend's `/recommend` endpoint
4. **Processing**: The backend analyzes the browsing history using the pre-computed similarity matrix
5. **Response**: The backend returns the top 3 most similar products not already in the browsing history
6. **Display**: The frontend displays the recommended products in the UI

## API Endpoints

### GET /products

Returns all available products.

**Response:**

```json
[
  {
    "id": 1,
    "name": "Smartphone X",
    "price": 799.99,
    "category": "Electronics",
    "tags": "smartphone mobile camera battery"
  },
  ...
]
```

### POST /recommend

Generates product recommendations based on browsing history.

**Request Body:**

```json
{
  "history": [1, 3, 5]
}
```

**Response:**

```json
{
  "recommendations": [
    {
      "id": 2,
      "name": "Laptop Pro",
      "price": 1299.99,
      "category": "Electronics",
      "tags": "laptop computer high-performance battery"
    },
    ...
  ]
}
```

## Project Structure

```
/recommendation/
├── backend/
│   ├── main.py           # FastAPI application with recommendation logic
│   ├── products.csv      # Product dataset with tags
│   ├── Pipfile          # Python dependencies
│   └── README.md        # Backend documentation
│
├── frontend/
│   ├── app/             # Next.js application
│   │   ├── page.tsx     # Main application component
│   │   └── layout.tsx   # Root layout component
│   ├── public/          # Static assets
│   ├── package.json     # JavaScript dependencies
│   └── README.md        # Frontend documentation
│
└── README.md            # Project overview (this file)
```

## Technologies Used

### Backend

- **FastAPI**: Modern, high-performance web framework for building APIs
- **pandas**: Data manipulation and analysis library
- **scikit-learn**: Machine learning library for TF-IDF and cosine similarity
- **numpy**: Numerical computing library
- **pipenv**: Python dependency management

### Frontend

- **Next.js**: React framework for production-grade applications
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## Development

### Building for Production

#### Backend

```bash
# From the backend directory
pipenv install --deploy
```

#### Frontend

```bash
# From the frontend directory
npm run build
# or
yarn build

# Start the production server
npm run start
# or
yarn start
```

## Troubleshooting

### Common Issues

1. **Backend Connection Errors**

   - Ensure the backend server is running at http://localhost:8000
   - Check that CORS is properly configured in the backend

2. **Missing Dependencies**

   - For backend: `pipenv install`
   - For frontend: `npm install` or `yarn install`

3. **Data Format Issues**
   - Ensure the `products.csv` file has the correct format with id, name, price, category, and tags columns

## Future Improvements

- User authentication and personalized recommendations
- More advanced recommendation algorithms (collaborative filtering, deep learning)
- Product images and more detailed information
- Performance optimizations (caching, pagination)
- Comprehensive test suite (unit, integration, and end-to-end tests)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- FastAPI team for the backend framework
- Next.js team for the frontend framework
- scikit-learn for the recommendation algorithm implementation
- Tailwind CSS for the utility-first CSS framework

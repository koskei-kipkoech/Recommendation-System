# Product Recommendation Backend

This is a FastAPI backend for a product recommendation system that uses TF-IDF and cosine similarity to generate recommendations based on browsing history.

## Setup

### Prerequisites

- Python 3.9 or higher
- pipenv (for dependency management)

### Installation

1. Install pipenv if you don't have it already:

```bash
pip install pipenv
```

2. Install dependencies using the Pipfile:

```bash
pipenv install
```

### Running the Server

1. Activate the virtual environment:

```bash
pipenv shell
```

2. Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The server will be available at http://localhost:8000

## API Endpoints

### GET /products

Returns all available products.

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

## Data

The system uses a `products.csv` file with the following structure:

- `id`: Unique product identifier
- `name`: Product name
- `price`: Product price
- `category`: Product category
- `tags`: Space-separated keywords used for recommendation calculations

# Product Recommendation Frontend

This is a Next.js frontend for a product recommendation system that connects to a FastAPI backend.

## Features

- Browse products
- Build a browsing history by clicking on products
- Get personalized product recommendations based on your browsing history
- Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18+ installed
- Backend server running at http://localhost:8000

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Make sure the backend server is running:

```bash
cd ../backend
pipenv shell
uvicorn main:app --reload
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## How It Works

1. The application fetches all products from the backend when it loads
2. When you click on products, they're added to your browsing history
3. Clicking "Get Recommendations" sends your browsing history to the backend
4. The backend uses TF-IDF and cosine similarity to find similar products
5. Recommended products are displayed in the UI

## Project Structure

- `app/page.tsx`: Main application component with product listing and recommendations
- `app/layout.tsx`: Root layout component with font configuration
- `app/globals.css`: Global styles and Tailwind CSS imports

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4

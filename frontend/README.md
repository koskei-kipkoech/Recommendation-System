# Product Recommendation Frontend

This is a Next.js frontend application for an AI-powered product recommendation system that connects to a FastAPI backend. The application provides a modern, responsive UI for browsing products and receiving personalized recommendations based on browsing history.

![Smart Shop UI](https://via.placeholder.com/800x450.png?text=Smart+Shop+UI)

## Features

- **Product Browsing**: View a comprehensive list of available products with details
- **Interactive Browsing History**: Build a browsing history by clicking on products of interest
- **Visual Feedback**: Get immediate visual confirmation when adding products to history
- **Personalized Recommendations**: Receive AI-generated product recommendations based on browsing patterns
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Error Handling**: Graceful error handling with user-friendly messages
- **Loading States**: Visual indicators during data fetching operations

## Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm** : For package management
- **Backend Server**: Running at http://localhost:8000 (see backend setup instructions below)
- **Web Browser**: Modern browser with JavaScript enabled

## Installation

### 1. Clone the Repository

If you haven't already cloned the repository:

```bash
git clone <repository-url>
cd recommendation/frontend
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Environment Setup

The application is configured to connect to the backend at `http://localhost:8000`. If your backend is running on a different URL, you'll need to update the API endpoint URLs in `app/page.tsx`.

## Running the Application

### 1. Start the Backend Server

Before running the frontend, make sure the backend server is running:

```bash
cd ../backend
pipenv shell
uvicorn main:app --reload
```

The backend should be accessible at http://localhost:8000.

### 2. Start the Development Server

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

The application uses Turbopack for faster development builds.

### 3. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

## How It Works

### Data Flow

1. **Initial Load**: The application fetches all products from the backend's `/products` endpoint when it loads
2. **Building History**: When you click on products, they're added to your browsing history with visual feedback
3. **Requesting Recommendations**: Clicking "Get Recommendations" sends your browsing history to the backend's `/recommend` endpoint
4. **AI Processing**: The backend uses TF-IDF vectorization and cosine similarity to find products similar to your browsing history
5. **Displaying Results**: Recommended products are displayed in the UI with all relevant details

### API Integration

The frontend interacts with two main API endpoints:

1. **GET /products**

   - Retrieves the complete list of available products
   - No parameters required
   - Returns an array of product objects

2. **POST /recommend**
   - Accepts a JSON body with browsing history
   - Request format: `{ "history": [1, 2, 3] }` where numbers are product IDs
   - Returns an object with a `recommendations` array containing product objects

### UI Components

- **Header**: Contains the application name and branding
- **Products List**: Displays all available products with details
- **Browsing History**: Shows products you've clicked on with option to clear history
- **Recommendations Panel**: Displays personalized product recommendations
- **Error Notifications**: Shows user-friendly error messages when API calls fail
- **Loading Indicators**: Displays spinners during data fetching operations

## Project Structure

- `app/page.tsx`: Main application component with product listing and recommendations logic
- `app/layout.tsx`: Root layout component with font configuration and metadata
- `app/globals.css`: Global styles and Tailwind CSS imports
- `public/`: Static assets like images and icons
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `next.config.ts`: Next.js configuration

## Technologies Used

- **Next.js 15**: React framework for production-grade applications
- **React 19**: JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better developer experience
- **Tailwind CSS 4**: Utility-first CSS framework
- **Turbopack**: Incremental bundler for faster development builds

## Troubleshooting

### Common Issues

1. **Products Not Loading**

   - Ensure the backend server is running at http://localhost:8000
   - Check browser console for network errors
   - Verify that CORS is properly configured on the backend

2. **Recommendations Not Working**

   - Make sure you've clicked on at least one product to build a browsing history
   - Check that the backend's `/recommend` endpoint is functioning correctly
   - Verify the format of the request being sent to the backend

3. **UI Display Issues**
   - Clear your browser cache and reload the page
   - Ensure you're using a supported browser version
   - Check for CSS conflicts if you've modified the styles

## Contributing

Contributions are welcome! Here's how you can contribute to the project:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

### Development Guidelines

- Follow the existing code style and conventions
- Write clean, maintainable, and testable code
- Update documentation for any new features or changes
- Add appropriate error handling and loading states
- Test your changes thoroughly before submitting a pull request

## Acknowledgements

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- FastAPI for the backend framework
- scikit-learn for the recommendation algorithm

# Deployment Guide for KIIT Rentals

This guide explains how to deploy the KIIT Rentals project with the backend on Render and the frontend on Netlify.

## Backend Deployment (Render)

1. **Create a Render account**:
   - Sign up at [https://render.com/](https://render.com/)

2. **Create a new Web Service**:
   - Click "New" and select "Web Service"
   - Connect your GitHub repository
   - Choose the repository and branch

3. **Configure the Web Service**:
   - **Name**: kiit-rentals-backend (or your preferred name)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node Backend/server.js`
   - **Root Directory**: Leave empty (or set to the root of your repository)
   
4. **Add Environment Variables**:
   - Go to "Environment" tab
   - Add the following variables:
     - `NODE_ENV`: production
     - `PORT`: 10000 (Render will automatically set its own PORT)
     - `MONGO_URI`: your MongoDB connection string
     - `JWT_SECRET`: your JWT secret key

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for the deployment to complete
   - Note your service URL (e.g., https://kiit-rentals-backend.onrender.com)

## Frontend Deployment (Netlify)

1. **Update environment variables**:
   - In the frontend/.env.production file, update the VITE_API_URL to your Render backend URL:
     ```
     VITE_API_URL=https://kiit-rentals-backend.onrender.com/api
     ```

2. **Create a Netlify account**:
   - Sign up at [https://netlify.com/](https://netlify.com/)

3. **Deploy via Netlify UI**:
   - Click "Add new site" > "Import an existing project"
   - Connect to your GitHub repository
   - Choose the repository and branch

4. **Configure build settings**:
   - **Base directory**: frontend
   - **Build command**: npm run build
   - **Publish directory**: frontend/dist
   
5. **Deploy the site**:
   - Click "Deploy site"
   - Wait for the deployment to complete
   - Your site will be available at a Netlify subdomain (e.g., https://kiit-rentals.netlify.app)
   - You can set up a custom domain in Netlify's Domain settings

## Verifying Deployment

1. Test your frontend by visiting your Netlify URL
2. Confirm that your frontend can connect to your backend by:
   - Logging in with existing credentials
   - Creating a new account
   - Browsing products

If you encounter any issues:
1. Check the deployment logs on both platforms
2. Verify that your environment variables are set correctly
3. Ensure CORS is configured properly in the backend 
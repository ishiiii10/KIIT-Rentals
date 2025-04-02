# Deploying the KIIT Rentals Frontend to Vercel

This guide walks you through deploying the KIIT Rentals frontend on Vercel while the backend is on Render.

## Prerequisites

1. Your backend is already deployed on Render at https://kiit-rentals-backend.onrender.com
2. You have a GitHub repository with your code pushed
3. You have a Vercel account (or will create one)

## Deployment Steps

### 1. Prepare Your Repository

Ensure your repository has:
- The `frontend/vercel.json` file (already added)
- The `frontend/.env.production` file with the correct backend URL (already configured)

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com/) and sign up or log in
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
5. In "Environment Variables", add:
   - Name: VITE_API_URL
   - Value: https://kiit-rentals-backend.onrender.com/api
6. Click "Deploy"

### 3. Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Add your custom domain and follow Vercel's instructions for verification

### 4. Verify Deployment

1. After deployment is complete, Vercel will provide a deployment URL
2. Visit the URL and test your application's functionality:
   - User registration and login
   - Product browsing
   - Any other features specific to your app

### Troubleshooting

If you encounter issues:

1. **Frontend can't connect to backend**:
   - Verify the VITE_API_URL environment variable is set correctly in Vercel
   - Ensure CORS is properly configured on your backend to allow requests from your Vercel domain

2. **Build fails**:
   - Check the Vercel build logs for specific errors
   - Verify your package.json and build commands are correctly set

3. **Routing issues**:
   - The vercel.json file includes a rewrite rule to handle client-side routing
   - If you see 404 errors on page refresh, check these settings

## Additional Resources

- [Vite deployment guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Vercel documentation](https://vercel.com/docs) 
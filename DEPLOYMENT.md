# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository with the frontend code

### Steps
1. **Connect Repository**
   ```bash
   # Push to GitHub first
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as root directory
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

## Backend Deployment (Render)

### Prerequisites
- Render account
- MongoDB Atlas cluster

### Steps
1. **Prepare Environment**
   ```bash
   # In backend folder
   cd backend
   npm install
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Root Directory: `backend`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: Free

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   PORT=3000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/student-task-manager?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

## MongoDB Atlas Setup

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a free cluster (M0)
   - Choose a cloud provider and region

2. **Configure Network Access**
   - Go to "Network Access"
   - Add IP: `0.0.0.0/0` (allows all IPs for development)
   - For production, add your backend's IP

3. **Create Database User**
   - Go to "Database Access"
   - Create new user with username and password
   - Note these credentials for the connection string

4. **Get Connection String**
   - Go to "Clusters" → "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

## Production Checklist

### Backend
- [ ] MongoDB Atlas cluster created
- [ ] Database user created with strong password
- [ ] Network access configured
- [ ] Environment variables set in Render
- [ ] JWT_SECRET is unique and secure
- [ ] CORS is properly configured
- [ ] Health check endpoint added

### Frontend
- [ ] Environment variables configured in Vercel
- [ ] API URL points to production backend
- [ ] Build process tested locally
- [ ] Error handling for API failures
- [ ] Responsive design tested

### Security
- [ ] JWT_SECRET is not hardcoded
- [ ] MongoDB password is strong
- [ ] HTTPS enforced
- [ ] Input validation on both frontend and backend
- [ ] Rate limiting considered (for production)

## Environment Variables Summary

### Backend (.env)
```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/student-task-manager?retryWrites=true&w=majority
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Testing Production

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.com/api/tasks
   ```

2. **Frontend Build Test**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

3. **End-to-End Testing**
   - Test user registration/login
   - Create, edit, delete tasks
   - Test search and filter functionality
   - Verify responsive design

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend allows frontend origin
- Check environment variables

**Database Connection**
- Verify MongoDB connection string
- Check network access settings
- Ensure user credentials are correct

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for TypeScript errors

**Deployment Failures**
- Review build logs
- Check environment variables
- Verify repository structure

## Monitoring

### Backend
- Use Render's built-in monitoring
- Check application logs
- Monitor database performance

### Frontend
- Use Vercel Analytics
- Monitor Core Web Vitals
- Check console for errors

## Scaling Considerations

### When to Scale
- High database usage
- Slow API response times
- Frequent timeouts

### Scaling Options
- **Database**: Upgrade MongoDB cluster
- **Backend**: Add more Render instances
- **Frontend**: Vercel automatically scales
- **CDN**: Consider for static assets

## Backup Strategy

### Database
- Enable MongoDB Atlas backups
- Regular export of critical data
- Document backup procedures

### Code
- Git version control
- Tag releases
- Maintain deployment history

# Deployment Guide

This guide covers deploying your Portfolio Backend API to various platforms.

## Pre-Deployment Checklist

### 1. Environment Variables Setup
Ensure you have all required environment variables:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Strong, unique secret key
- `CLOUDINARY_CLOUD_NAME` - From Cloudinary dashboard
- `CLOUDINARY_API_KEY` - From Cloudinary dashboard  
- `CLOUDINARY_API_SECRET` - From Cloudinary dashboard
- `NODE_ENV=production`
- `PORT` (usually auto-set by hosting platform)

### 2. Database Setup
- Set up MongoDB Atlas (recommended for production)
- Get connection string from MongoDB Atlas
- Whitelist IP addresses or use 0.0.0.0/0 for all IPs

### 3. Security Checklist
- [ ] Use strong JWT_SECRET (64+ characters)
- [ ] Set NODE_ENV=production
- [ ] Comment out or remove registration route in production
- [ ] Ensure CORS is configured for your frontend domain
- [ ] Use HTTPS in production

## Deployment Platforms

### 1. Heroku (Recommended for beginners)

#### Step 1: Install Heroku CLI
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

#### Step 2: Login and Create App
```bash
heroku login
heroku create your-portfolio-backend
```

#### Step 3: Set Environment Variables
```bash
heroku config:set MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/portfolio"
heroku config:set JWT_SECRET="your-super-long-secret-key-here"
heroku config:set CLOUDINARY_CLOUD_NAME="your-cloud-name"
heroku config:set CLOUDINARY_API_KEY="your-api-key"
heroku config:set CLOUDINARY_API_SECRET="your-api-secret"
heroku config:set NODE_ENV="production"
```

#### Step 4: Deploy
```bash
git add .
git commit -m "Ready for deployment"
git push heroku main
```

#### Step 5: Open App
```bash
heroku open
```

### 2. Railway

#### Step 1: Connect Repository
1. Go to [Railway](https://railway.app/)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository

#### Step 2: Configure Environment Variables
In Railway dashboard:
1. Go to your project
2. Click "Variables" tab
3. Add all environment variables

#### Step 3: Deploy
Railway automatically deploys when you push to your main branch.

### 3. Render

#### Step 1: Connect Repository
1. Go to [Render](https://render.com/)
2. Sign up/login
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

#### Step 2: Configure Service
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18 (or latest)

#### Step 3: Environment Variables
Add all environment variables in the Render dashboard.

### 4. DigitalOcean App Platform

#### Step 1: Create App
1. Go to [DigitalOcean](https://www.digitalocean.com/)
2. Create account/login
3. Apps → Create App
4. Connect GitHub repository

#### Step 2: Configure Build Settings
- **Build Command**: `npm install`
- **Run Command**: `npm start`
- **Environment**: Node.js

#### Step 3: Environment Variables
Add environment variables in app settings.

### 5. AWS (Advanced)

#### Using AWS Elastic Beanstalk
1. Install AWS CLI and EB CLI
2. Configure AWS credentials
3. Initialize Elastic Beanstalk: `eb init`
4. Create environment: `eb create production`
5. Set environment variables in AWS console
6. Deploy: `eb deploy`

#### Using AWS Lambda (Serverless)
1. Use Serverless Framework
2. Install: `npm install -g serverless`
3. Configure serverless.yml
4. Deploy: `serverless deploy`

## Post-Deployment Setup

### 1. Test API Endpoints
```bash
# Health check
curl https://your-app.herokuapp.com/

# Test auth endpoint
curl -X POST https://your-app.herokuapp.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpassword"}'
```

### 2. Create Admin User
Use your API testing tool (Postman, curl, etc.) to create the admin user:
```bash
curl -X POST https://your-deployed-api.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_secure_password"}'
```

### 3. Disable Registration (Security)
After creating your admin user, comment out the registration route in `routes/auth.js`:
```javascript
// Comment out this entire route in production
// router.post('/register', async (req, res) => {
//   // ... registration code
// });
```

### 4. Update Frontend Configuration
Update your frontend to use the production API URL:
```javascript
const API_URL = 'https://your-deployed-api.com/api';
```

## Environment-Specific Configurations

### Development
```env
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=3000
```

### Production
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
PORT=443
```

## Common Deployment Issues

### Issue 1: "Application Error" on Heroku
**Solution**: Check logs with `heroku logs --tail`
- Usually missing environment variables
- Or MongoDB connection issues

### Issue 2: CORS Errors
**Solution**: Update CORS configuration in `app.js`
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
  credentials: true
}));
```

### Issue 3: JWT Token Issues
**Solution**: Ensure JWT_SECRET is exactly the same between deployments
- Don't regenerate JWT_SECRET unless necessary
- All tokens become invalid when JWT_SECRET changes

### Issue 4: File Upload Issues
**Solution**: Verify Cloudinary credentials
- Double-check API keys in environment variables
- Ensure Cloudinary account is active

## Monitoring and Maintenance

### 1. Set up Monitoring
- Enable application monitoring (New Relic, DataDog)
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Configure error tracking (Sentry)

### 2. Database Backup
- MongoDB Atlas automatically backs up data
- For local MongoDB, set up regular backups

### 3. Log Management
- Use centralized logging (Papertrail, Loggly)
- Monitor error rates and response times

### 4. Security Updates
- Regularly update npm packages: `npm audit fix`
- Monitor for security vulnerabilities
- Keep Node.js version updated

## SSL/HTTPS Setup

Most modern hosting platforms (Heroku, Railway, Render) provide SSL certificates automatically. 

For custom domains:
1. Add custom domain in hosting platform dashboard
2. Configure DNS settings
3. SSL certificate is usually auto-generated

## Scaling Considerations

### Horizontal Scaling
- Use load balancers
- Deploy multiple instances
- Consider microservices architecture

### Database Scaling
- MongoDB Atlas handles scaling automatically
- Consider read replicas for high traffic
- Implement database indexing

### Caching
- Implement Redis for session storage
- Use CDN for static assets
- Cache frequently accessed data

---

**Need Help?** Check the hosting platform's documentation or create an issue in the repository.

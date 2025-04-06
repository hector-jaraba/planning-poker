# Docker Deployment Guide for Synology NAS

This guide provides detailed instructions for deploying the Planning Poker application on a Synology NAS using Docker.

## Prerequisites

- Synology NAS with Docker package installed
- MongoDB Atlas account or local MongoDB instance
- Domain name (optional, for SSL)
- Basic knowledge of Docker and Synology DSM

## Deployment Options

There are several ways to deploy the application on a Synology NAS:

1. **Using Docker Compose (Recommended)**
2. **Using Synology Docker UI**
3. **Using SSH and Command Line**

## Option 1: Using Docker Compose

### Step 1: Prepare Your Environment

1. Create a directory on your Synology NAS for the application:

   ```
   /volume1/docker/planning-poker
   ```

2. Copy the following files to this directory:
   - `Dockerfile`
   - `docker-compose.yml`
   - `.env.local` (with your environment variables)

### Step 2: Configure Environment Variables

Create a `.env.local` file with the following variables:

```
# MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/planning-poker?retryWrites=true&w=majority

# NextAuth configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key

# OAuth providers
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret

# Socket.io configuration
SOCKET_URL=https://your-domain.com
```

### Step 3: Build and Run with Docker Compose

1. SSH into your Synology NAS:

   ```
   ssh admin@your-synology-ip
   ```

2. Navigate to the application directory:

   ```
   cd /volume1/docker/planning-poker
   ```

3. Build and start the container:

   ```
   docker-compose up -d --build
   ```

4. Check the logs:
   ```
   docker logs planning-poker
   ```

## Option 2: Using Synology Docker UI

### Step 1: Build the Docker Image Locally

1. Build the Docker image on your local machine:

   ```
   docker build -t planning-poker:latest .
   ```

2. Save the image to a tar file:
   ```
   docker save planning-poker:latest > planning-poker.tar
   ```

### Step 2: Import the Image to Synology

1. Open Docker in the Synology DSM UI
2. Go to the "Image" tab
3. Click "Add" > "Add from File"
4. Select the `planning-poker.tar` file
5. Wait for the import to complete

### Step 3: Create a Container

1. Select the `planning-poker:latest` image
2. Click "Launch"
3. Configure the container:
   - Container name: `planning-poker`
   - Port settings: Map port 3000 to a host port (e.g., 3000)
   - Environment variables: Add all required environment variables
   - Volume settings: Map `/volume1/docker/planning-poker/public` to `/app/public`
4. Click "Apply" to create the container

## Option 3: Using SSH and Command Line

### Step 1: Build the Docker Image

1. SSH into your Synology NAS
2. Navigate to the application directory
3. Build the Docker image:
   ```
   docker build -t planning-poker:latest .
   ```

### Step 2: Run the Container

```
docker run -d \
  --name planning-poker \
  -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://username:password@your-cluster.mongodb.net/planning-poker?retryWrites=true&w=majority" \
  -e NEXTAUTH_URL="https://your-domain.com" \
  -e NEXTAUTH_SECRET="your-secret-key" \
  -e GOOGLE_ID="your-google-client-id" \
  -e GOOGLE_SECRET="your-google-client-secret" \
  -e SOCKET_URL="https://your-domain.com" \
  -v /volume1/docker/planning-poker/public:/app/public \
  planning-poker:latest
```

## Setting Up SSL with Nginx

### Option 1: Using Synology's Built-in Reverse Proxy

1. Open Control Panel > Application Portal > Reverse Proxy
2. Click "Create"
3. Configure the reverse proxy:
   - Source: Your domain name
   - Destination: `http://localhost:3000`
4. Enable SSL and configure your certificate
5. Click "OK" to save

### Option 2: Using Nginx in Docker

1. Create a `nginx.conf` file:

   ```
   server {
       listen 80;
       server_name your-domain.com;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       server_name your-domain.com;

       ssl_certificate /etc/nginx/certs/fullchain.pem;
       ssl_certificate_key /etc/nginx/certs/privkey.pem;

       location / {
           proxy_pass http://planning-poker:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

2. Create a Docker Compose file for Nginx:

   ```yaml
   version: "3"

   services:
     nginx:
       image: nginx:alpine
       container_name: nginx
       restart: unless-stopped
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./nginx.conf:/etc/nginx/conf.d/default.conf
         - ./certs:/etc/nginx/certs
       networks:
         - app-network
       depends_on:
         - planning-poker

   networks:
     app-network:
       driver: bridge
   ```

3. Run the Nginx container:
   ```
   docker-compose up -d
   ```

## Troubleshooting

### Common Issues

1. **Container fails to start**

   - Check the logs: `docker logs planning-poker`
   - Verify environment variables
   - Ensure MongoDB Atlas IP whitelist includes your Synology NAS IP

2. **Cannot connect to MongoDB**

   - Verify the MongoDB connection string
   - Check if MongoDB Atlas is accessible from your Synology NAS
   - Ensure your MongoDB user has the correct permissions

3. **Authentication issues**
   - Verify NEXTAUTH_URL is set correctly
   - Check if Google OAuth credentials are correct
   - Ensure cookies are working (check browser console)

### Logs and Debugging

1. View container logs:

   ```
   docker logs planning-poker
   ```

2. Access the container shell:

   ```
   docker exec -it planning-poker /bin/sh
   ```

3. Check MongoDB connection:
   ```
   curl https://your-domain.com/api/health
   ```

## Backup and Maintenance

### Backing Up Data

1. **MongoDB Data**

   - Use MongoDB Atlas backup features
   - Or export data manually: `mongodump --uri="your-connection-string"`

2. **Application Data**
   - Backup the `/volume1/docker/planning-poker/public` directory

### Updating the Application

1. Pull the latest changes:

   ```
   git pull
   ```

2. Rebuild and restart the container:
   ```
   docker-compose down
   docker-compose up -d --build
   ```

## Security Considerations

1. **Environment Variables**

   - Never commit `.env.local` to version control
   - Use strong, unique values for secrets

2. **Network Security**

   - Use SSL/TLS for all connections
   - Restrict access to your Synology NAS
   - Keep your Synology DSM and Docker updated

3. **MongoDB Security**
   - Use strong passwords
   - Restrict IP access in MongoDB Atlas
   - Enable authentication

## Additional Resources

- [Synology Docker Documentation](https://www.synology.com/en-global/dsm/packages/Docker)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)

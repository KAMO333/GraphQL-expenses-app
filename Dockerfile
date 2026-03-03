# Use a Node version that matches your Acer
FROM node:22

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# We don't run the app here; we'll use the compose file for tests
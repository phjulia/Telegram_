# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the application files into the working directory
COPY . /src

# Install the application dependencies
RUN npm install

# Expose port 3000
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]
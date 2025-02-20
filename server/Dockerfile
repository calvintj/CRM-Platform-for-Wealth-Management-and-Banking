# Use a lightweight Node image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Expose the port your app runs on (adjust if necessary)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]

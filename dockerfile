# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./
COPY yarn.lock* ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# If you have a build process for your TypeScript or need to transpile, uncomment the following line:
# RUN npm run build

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 3000

# Run the app using CMD which defines your runtime. Change `node index.js` as necessary
CMD ["node", "index.js"]

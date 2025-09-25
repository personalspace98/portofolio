FROM node:16-alpine
WORKDIR /app

# Copy package files from root path
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy source code from root path
COPY . ./

# Build application
RUN ng build

# Expose port
EXPOSE 4200

# Start application
CMD ["ng", "serve"]

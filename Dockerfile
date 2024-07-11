# Use the Bun image
FROM oven/bun:1

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install the dependencies
RUN bun install

# Set environment variable
ENV PORT=3000

# Expose the ports your app runs on
EXPOSE 3000
EXPOSE 5000

# Default command (will be overridden in docker-compose)
CMD ["bun", "run", "frontend"]

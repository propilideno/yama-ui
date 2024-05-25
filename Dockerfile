FROM oven/bun:1

# Set the working directory inside the container
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY . .

# Install the dependencies
ENV PORT 3000

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["bun", "run", "prod"]

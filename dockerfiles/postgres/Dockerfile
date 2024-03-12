# Use the official PostgreSQL image as a parent image
FROM postgres:latest

# Set environment variables (replace 'your_password' with your actual password)
ENV POSTGRES_PASSWORD=123

# Copy the SQL file into the Docker image
COPY init.sql /docker-entrypoint-initdb.d/
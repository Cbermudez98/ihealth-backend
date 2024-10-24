# IHealth Backend

## Overview

IHealth Backend is a NestJS application designed to handle various healthcare-related operations. This project utilizes TypeORM for database interactions, implements a modular architecture, and follows best practices for code organization, testing, and error handling.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Directory Structure](#directory-structure)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Docker](#docker)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Cbermudez98/ihealth-backend.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd ihealth-backend
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```

4. **Create the database**
    ```bash
    docker compose up -d
    ```
5. **Run the migrations**
    ```bash
    npm run migration:run
    ```
6. **Running the application**
    ```bash
    npm run start:dev
    ```

## Configuration

1. **Copy the example environment file**:

   - Create a copy of the provided environment example file.

2. **Update the `.env` file**:
   - Fill in your database and application configurations in the `.env` file as needed. See the `.env.example` file for reference.

## Directory Structure

- **`src/common`**: Contains common utilities, constants, and configurations.
- **`src/core`**: Contains core application logic, including filters and database configurations.
- **`src/lib`**: Contains business logic and domain-specific implementations.
- **`src/migrations`**: Contains database migration files.
- **`src/app.module.ts`**: The main application module.
- **`src/main.ts`**: The entry point of the application.

## Testing

1. **Run all tests**:

   ```bash
   npm run test
   ```

2. **Run end-to-end tests**:
   ```bash
   npm run test:e2e
   ```
## Error Handling

1. **Global error handling**:

   - The application implements a global error handling strategy.

2. **Custom exception filters**:
   - Exception filters are used to manage and format errors returned by the application.

## Docker

1. **Set up Docker Compose**:

   - Use the following command to build and start the database container:

   ```bash
   docker-compose up -d
   ```

2. **Build the application image**:
   - The application image can be built using the Dockerfile.
   ```bash
    docker build -t IHealth-backend:latest .
   ```
## Overview

Welcome to the Grocery API ! This Node.js application is designed to manage and order the grocery. This readme will guide you through two different methods for running the application:

1.  Installing packages locally and running the app
2.  Running the Docker Compose file

## Prerequisites

Before you proceed with either method, ensure you have the following prerequisites installed on your machine:

- Node.js
- npm (Node Package Manager)
- Docker
- Docker Compose

## Method 1: Installing Packages Locally and Running the App

### Step 1: Clone the Repository

```bash
git clone https://github.com/Souravpakhira/grocery-booking-api.git
cd grocery-booking-api
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Update the `.env` file

### Step 4: Run the Application

```bash
npm run build
npm run start:prod
```

The application should now be running locally. Open your web browser and navigate to `http://localhost:3000/api` to access the `Swagger Documentation`.

## Method 2: Running Docker Compose File

### Step 1: Build and Run Docker Containers

Dont update the .env file default will work

```bash
docker-compose up --build
```

This command will download the necessary images, build the application, and start the containers. Once the process is complete, the application should be accessible at http://localhost:3000/api.

### Step 3: Stop Docker Containers

To stop the Docker containers, use the following command:

```bash
docker-compose down
```

## Additional Configuration

- For Docker-specific configurations, refer to the `docker-compose.yml` file.

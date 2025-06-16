# Next.js Firebase Studio Starter with Genkit Integration

This is a starter project that combines Next.js with Firebase and Genkit to provide a robust foundation for building web applications with AI-powered features. It's designed to work seamlessly with Firebase Studio.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (v18 or later recommended)
* npm or yarn

### Cloning the Repository

First, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-name>
```

### Installing Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### Setting up Environment Variables

Create a `.env.local` file in the root of your project and add the necessary environment variables. This file is ignored by Git, so it's a safe place to store your sensitive configuration.

```bash
touch .env.local
```

Here are some common environment variables you might need. Replace the placeholder values with your actual Firebase project configuration.

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="YOUR_API_KEY"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
NEXT_PUBLIC_FIREBASE_APP_ID="YOUR_APP_ID"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID" # Optional

# Genkit Configuration (if applicable)
GENKIT_API_KEY="YOUR_GENKIT_API_KEY"
```

You can typically find your Firebase project configuration in the Firebase console:
Project settings > General > Your apps > SDK setup and configuration.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm run dev`

Runs the Next.js development server.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits.

### `npm run genkit:dev`

Starts the Genkit developer UI. This is useful for inspecting and debugging your AI flows.

### `npm run genkit:watch`

Watches for changes in your Genkit flows and restarts the Genkit developer UI automatically.

### `npm run build`

Builds the application for production to the `.next` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Starts the Next.js production server. This command should be run after building the application with `npm run build`.

### `npm run lint`

Runs ESLint to analyze your code for potential errors and style issues.

### `npm run typecheck`

Runs the TypeScript compiler to check for type errors in your codebase.

## Project Structure

The project follows a standard Next.js application structure, with some additions for Genkit and Firebase integration:

-   **`src/app/`**: Contains the core application routes, layouts, and pages, following the Next.js App Router conventions.
-   **`src/components/`**: Houses reusable UI components used throughout the application. This can include both client and server components.
-   **`src/lib/`**: Intended for utility functions, helper scripts, and Firebase configuration/initialization.
-   **`src/ai/`**: This directory is dedicated to Genkit-related code, such as defining AI flows, models, and any supporting logic for AI features.

## Main Technologies Used

This project leverages several modern technologies to provide a comprehensive development experience:

-   **Next.js**: A React framework for building server-rendered and statically generated web applications.
-   **Firebase**: A comprehensive platform by Google for building web and mobile applications, used here for backend services like authentication, database, and hosting.
-   **Genkit**: An open-source framework by Google for building AI-powered applications.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
-   **Radix UI**: A collection of unstyled, accessible UI components that can be easily customized.
-   **TypeScript**: A statically typed superset of JavaScript that adds type safety to your code.

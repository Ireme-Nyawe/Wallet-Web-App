# Wallet Web Application

This **Wallet Web Application** is designed to help users efficiently manage their financial transactions across multiple accounts, track income and expenses, generate reports, and set budgets with notifications. It provides a seamless way to stay on top of personal finances while offering clear insights through visual summaries.

---

## Features

### Core Functionalities
- **Transaction Tracking**: Track all incoming and outgoing transactions across different accounts (e.g., bank accounts, mobile money, cash).
- **Report Generation**: Generate detailed reports based on a specified time period.
- **Budget Notifications**: Set a budget and receive notifications if spending exceeds the limit.
- **Category Management**: Create and manage categories and subcategories for expenses.
- **Expense Linking**: Associate expenses with relevant categories or subcategories.
- **Visualized Summaries**: View transaction summaries with interactive graphs and charts.

---

## Project Structure

### Backend
The backend is implemented using **Node.js** with the following structure:
- **`src/`**:
  - **`index.js`**: Entry point for the backend server.
  - **`database/`**: Handles database configurations and connections.
  - **`helper/`**: Contains utility functions.
  - **`middleware/`**: Middleware for validation, error handling, and more.
  - **`modules/`**: Contains core business logic and data processing modules.
  - **`routes/`**: Defines REST API endpoints.
- **Deployed**: The backend is deployed on **Render** and is integrated with the frontend.

### Frontend
The frontend is implemented using **React.js** with the following structure:
- **`public/`**: Contains public assets like `index.html` and other static resources.
- **`src/`**:
  - **`assets/`**: Stores images and static resources.
  - **`components/`**: Reusable UI components.
  - **`pages/`**: Application pages (e.g., Dashboard, Reports, Transactions).
  - **`routes/`**: Handles application routing.
  - **`slices/`**: Manages state using Redux slices.
  - **`utils/`**: Contains utility functions.
  - **`App.jsx`**: Main application component.
  - **`index.css`**: Global styles.
  - **`main.jsx`**: Entry point for rendering the app.
- **Deployed**: The frontend is deployed on **Netlify**.

---

## How to Use

### Deployment Details
- **Frontend**: The application is accessible at:  
  [https://trans-wallet.netlify.app/](https://trans-accounts-wallet.netlify.app/)
- **Backend**: Hosted on **Render**, integrated into the frontend.

### Step-by-Step Usage
1. Visit the frontend URL: [https://trans-wallet.netlify.app/](https://trans-accounts-wallet.netlify.app/).
2. Use the provided credentials to log in:  
   - **Email**: `demo@user.com`  
   - **Password**: `password123`
3. Explore the features:
   - Add income or expense transactions across different accounts.
   - Set a budget limit and monitor notifications for exceeding it.
   - Categorize transactions by creating or selecting categories/subcategories.
   - Generate reports for any desired time period.
   - View visual summaries of transactions in the dashboard.

---

Let's Keep The Momentum!

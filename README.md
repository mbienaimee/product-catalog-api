# product-catalog-api

# 🛍️ Product Catalog API

## 📖 Overview

This is a **Product Catalog API** that allows you to **manage products, categories, inventory, and generate basic reports**.

## 🚀 Features

- **Product Management**: Create, Read, Update, Delete (CRUD) products.
- **Category Management**: Organize products into categories.
- **Product Search & Filtering**: Find products by name or category.
- **Inventory Management**: Track stock levels and receive low-stock alerts.
- **Basic Reporting**: Retrieve products with low stock.
- **API Documentation**: Fully documented with **Swagger**.

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **API Documentation**: Swagger

---

## ⚙️ Installation

### 1️⃣ Clone the repository:

```sh
git clone https://github.com/mbienaimee/product-catalog-api.git
cd product-catalog-api
```

### 2️⃣ Install dependencies:

```sh
npm install
```

### 3️⃣ Set up environment variables:

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4️⃣ Start the server:

```sh
npm start
```

The server will run on **http://localhost:5000**.

---

## 📌 API Endpoints

### 🛒 **Product Management**

| Method     | Endpoint            | Description          |
| ---------- | ------------------- | -------------------- |
| **GET**    | `/api/products`     | Get all products     |
| **GET**    | `/api/products/:id` | Get product by ID    |
| **POST**   | `/api/products`     | Create a new product |
| **PATCH**  | `/api/products/:id` | Update a product     |
| **DELETE** | `/api/products/:id` | Delete a product     |

### 📂 **Category Management**

| Method     | Endpoint              | Description           |
| ---------- | --------------------- | --------------------- |
| **GET**    | `/api/categories`     | Get all categories    |
| **POST**   | `/api/categories`     | Create a new category |
| **PATCH**  | `/api/categories/:id` | Update a category     |
| **DELETE** | `/api/categories/:id` | Delete a category     |

### 🔍 **Product Search & Filtering**

| Method  | Endpoint                                          | Description     |
| ------- | ------------------------------------------------- | --------------- |
| **GET** | `/api/products/search?name=laptop&category=12345` | Search products |

### 📊 **Inventory & Reporting**

| Method  | Endpoint                  | Description            |
| ------- | ------------------------- | ---------------------- |
| **GET** | `/api/products/low-stock` | Get low-stock products |

---

## 📜 API Documentation (Swagger)

Once the server is running, access **Swagger UI** at:

🔗 [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## 📌 Folder Structure

```
📦 product-catalog-api
├── 📂 config         # Configuration files (Swagger, DB)
├── 📂 controllers    # API controllers
├── 📂 models         # Mongoose models
├── 📂 routes         # API routes
├── 📂 middleware     # Custom middleware
├── server.js        # Main server file
└── package.json     # Dependencies & scripts
```

---

## 🛠️ Running Tests

To run tests (if applicable):

```sh
npm test
```

---

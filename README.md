```md
# 🔗 URL Shortener - Shortify

A simple and efficient URL shortener built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features
- Generate short URLs from long ones.
- Redirect users from short links to the original URL.
- Track the number of times a URL is visited.
- API for creating, fetching, and viewing analytics of short URLs.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Other**: dotenv, nanoid

## 📦 Installation

Follow these steps to set up and run the project:

### 1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

### 2. Install dependencies:
   ```sh
   npm install
   ```

### 3. Configure environment variables:
   Create a `.env` file in the root of the project and add the following:

   ```env
   MONGO_URI=mongodb://localhost:27017/url-shortener
   BASE_URL=http://localhost:3000
   ```

### 4. Start the server:
   ```sh
   npm start
   ```

   The server will start running on `http://localhost:3000`.

## 📌 API Endpoints

| Method | Endpoint              | Description                            |
|--------|-----------------------|----------------------------------------|
| POST   | `/url`                 | Shorten a long URL                    |
| GET    | `/:shortId`            | Redirect to the long URL associated with the short ID |
| GET    | `/url/analytics/:shortId` | Get analytics (click count) for a short URL |

### **POST `/url`**
- **Description**: Shorten a long URL.
- **Request Body (JSON)**:
  ```json
  {
    "url": "https://www.example.com"
  }
  ```
- **Response (JSON)**:
  ```json
  {
    "shortId": "abcdef12"
  }
  ```

### **GET `/:shortId`**
- **Description**: Redirect to the original URL associated with the given short ID.
- **Example**: 
  Accessing `http://localhost:3000/abcdef12` will redirect you to `https://www.example.com`.

### **GET `/url/analytics/:shortId`**
- **Description**: Get the analytics (click count) for a short URL.
- **Response (JSON)**:
  ```json
  {
    "totalClicks": 5,
    "analytics": [
      { "timestamp": 1678845840000 },
      { "timestamp": 1678845900000 }
    ]
  }
  ```

## 🏗️ Future Enhancements
- Support for **custom short URLs**.
- **User authentication** for managing URLs.
- **Expiry functionality** for short URLs.
- **Admin dashboard** to view all URLs and analytics.

## 🤝 Contributing
We welcome contributions! If you would like to help improve this project, feel free to fork the repository, create a branch, and submit a pull request. Please ensure your code follows the existing style and includes tests.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
```

---
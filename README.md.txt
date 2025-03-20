```md
# 🔗 URL Shortener - Shortify

A simple and efficient URL shortener built with **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features
- Generate short URLs from long ones.
- Redirect users from short links to the original URL.
- Track the number of times a URL is visited.
- API for creating and fetching URLs.

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: Mongoose, dotenv, shortid

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file and add:
   ```
   MONGO_URI=mongodb://localhost:27017/urlshortener
   BASE_URL=http://localhost:3000
   ```

4. Start the server:
   ```sh
   npm start
   ```

## 📌 API Endpoints
| Method | Endpoint          | Description            |
|--------|------------------|------------------------|
| POST   | `/api/shorten`   | Shorten a long URL    |
| GET    | `/:shortUrl`     | Redirect to long URL  |
| GET    | `/api/stats/:id` | Get URL visit count   |

## 🏗️ Future Enhancements
- Custom short URLs
- User authentication
- Expiry for short URLs
- Admin dashboard

## 🤝 Contributing
Pull requests are welcome! Feel free to contribute and improve the project.  

---
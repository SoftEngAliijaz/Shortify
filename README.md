```md
# 🔗 Shortify - URL Shortener

A clean, minimal, and powerful URL shortener built with **Node.js**, **Express**, and **MongoDB**.

Turn long, clunky URLs into short, shareable links while tracking visits — all with a simple API or user-friendly web interface.

---

## 🚀 Features

- 🔗 Shorten any valid URL with a unique short ID
- 🌐 Redirect to the original URL instantly via the short link
- 📊 View visit analytics for each short URL (timestamps, count)
- 🧩 Simple and extensible API for developers
- 🖥️ EJS-based UI to submit and view generated URLs

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Templating**: EJS (for the front-end)
- **Other Tools**: nanoid (ID generation), dotenv (env management), nodemon (dev server)

---

## 📦 Getting Started

### 1. 🚚 Clone the Repository

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### 2. 📦 Install Dependencies

```bash
npm install
```

### 3. ⚙️ Environment Setup

Create a `.env` file in the root directory and add:

```env
MONGO_URI=mongodb://localhost:27017/url-shortener
BASE_URL=http://localhost:3000
```

### 4. 🚀 Start the Development Server

```bash
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📌 API Endpoints

All API routes are prefixed with `/url`

| Method | Endpoint                         | Description                                  |
|--------|----------------------------------|----------------------------------------------|
| POST   | `/url`                           | Create a new short URL                       |
| GET    | `/url/getAllUrls`                | Fetch all stored short URLs                  |
| GET    | `/url/analytics/:shortId`        | Get analytics for a specific short URL       |
| GET    | `/url/:shortId`                  | Redirect to the original long URL            |

---

### 📤 POST `/url`

**Shorten a long URL.**

#### Request Body

```json
{
  "url": "https://www.example.com"
}
```

#### Response

```json
{
  "shortId": "abcdef12"
}
```

---

### 🔁 GET `/url/:shortId`

**Redirect to the original long URL.**

Example:  
Visiting `http://localhost:3000/url/abcdef12` redirects to `https://www.example.com`.

---

### 📊 GET `/url/analytics/:shortId`

**Get analytics for a short URL.**

#### Response

```json
{
  "totalClicks": 5,
  "analytics": [
    { "timestamp": 1678845840000 },
    { "timestamp": 1678845900000 }
  ]
}
```

---

## 🧪 Example Usage (UI)

Go to the root URL `/`, paste your long link in the form, and hit **Generate**.  
You'll receive a shortened version below the form and a table with all generated URLs and click counts.

---

## 🛠️ Planned Enhancements

- ✏️ **Custom short URL aliases**
- 🔒 **User authentication** to manage personal links
- 🗓️ **Expiration support** for temporary links
- 📈 **Admin dashboard** for managing and tracking all URLs
- 📤 **Export analytics** as CSV

---

## 🤝 Contributing

We welcome contributions!  
To contribute:

1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork
5. Submit a pull request

Please follow the coding standards and include comments/test cases where applicable.

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

> Built with 💚 using Node.js + MongoDB.
```

---
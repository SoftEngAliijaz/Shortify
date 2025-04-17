```md
# 🔗 Shortify - URL Shortener

A clean, minimal, and powerful URL shortener built with **Node.js**, **Express**, and **MongoDB**.

Turn long, clunky URLs into short, shareable links while tracking visits — all via a simple API or a user-friendly web interface.

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

## 🔧 Routes and Endpoints Overview

### 📌 1. Static Routes (Public)
Handled by: `staticRouter`

| Method | Path        | Description                          |
|--------|-------------|--------------------------------------|
| GET    | `/login`    | Show login form (`login.ejs`)        |
| GET    | `/signup`   | Show signup form (`signup.ejs`)      |
| GET    | `/`         | Home page (requires auth, shows URLs) |

---

### 📌 2. User Auth Routes
Handled by: `userRouter` (prefix: `/user`)

| Method | Path          | Description              |
|--------|---------------|--------------------------|
| POST   | `/signup`     | Register a new user      |
| POST   | `/login`      | Log in an existing user  |
| POST   | `/logout`     | Log out the current user |

---

### 📌 3. URL Shortener Routes
Handled by: `urlRouter` (prefix: `/url`)

| Method | Path                    | Description                                |
|--------|-------------------------|--------------------------------------------|
| POST   | `/`                     | Create a new short URL                     |
| GET    | `/analytics/:shortId`  | Get analytics for a specific short URL     |
| GET    | `/getAllUrls`          | Fetch all stored short URLs (optional)     |
| GET    | `/:shortId`            | Redirect to the original long URL          |

---

## 📤 Example: Create Short URL (API)

**POST `/url`**

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

## 🔁 Example: Redirect to Original URL

**GET `/url/:shortId`**

Example:  
Visiting `http://localhost:3000/url/abcdef12` redirects to `https://www.example.com`.

---

## 📊 Example: URL Analytics

**GET `/url/analytics/:shortId`**

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

## 🧪 Using the UI

Go to the root URL `/`, paste your long link in the form, and click **Generate**.  
You'll see:

- A shortened version of your link
- A table showing all generated URLs
- Click counts for each link

---

## 🛠️ Planned Enhancements

- ✏️ Custom short URL aliases
- 🔒 User authentication to manage personal links
- 🗓️ Expiration support for temporary links
- 📈 Admin dashboard for managing and tracking all URLs
- 📤 Export analytics as CSV

---

## 🤝 Contributing

We welcome contributions!

To contribute:

1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork
5. Submit a pull request

Please follow the coding standards and include comments or test cases where applicable.

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

> Built with 💚 using Node.js + MongoDB.
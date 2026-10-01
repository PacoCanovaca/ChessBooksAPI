# ♟️ ChessBooksAPI

REST API for managing a catalogue of chess books, authors and users.

ChessBooksAPI is a Node.js backend built with **Express** and **MongoDB/Mongoose**. It provides CRUD operations for books and authors, search and filtering endpoints, JWT-based authentication with role-based authorization, and image uploads through **Cloudinary**.

The project is designed as a backend-focused application for practising REST API design, MongoDB data modelling, authentication, file handling and resource relationships.

---

## 📌 Features

### Books

- Create, read, update and delete chess books.
- Search books by title fragment.
- Filter books by language.
- Filter books by author.
- Filter books by a publication-year range.
- Associate one or more authors with a book.
- Store external purchase links.
- Upload and replace book cover images through Cloudinary.
- Populate referenced author documents when retrieving books.

### Authors

- Create, read, update and delete authors.
- Search authors by name fragment.
- Store biographical information and chess titles.

### Users & authentication

- User registration.
- User login with email and password.
- Password hashing with `bcrypt`.
- JWT access tokens with a one-day expiration.
- Role-based authorization using `admin` and `user` roles.
- User profile image uploads through Cloudinary.
- Favourite books stored as MongoDB references.

### Data initialization

- Includes a seed script with sample chess authors and books.
- The seed script resets the existing `books` and `authors` collections before inserting the seed data.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **Node.js** | JavaScript runtime |
| **Express 5** | REST API and routing |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM and schema validation |
| **JSON Web Token (JWT)** | Authentication |
| **bcrypt** | Password hashing |
| **Cloudinary** | Image storage and management |
| **Multer** | Multipart/form-data file uploads |
| **dotenv** | Environment variable management |
| **Nodemon** | Development server reloads |

---

## 🏗️ Architecture

The application follows a simple layered backend structure:

```text
HTTP Request
    │
    ▼
Express Router
    │
    ├── Authentication middleware (protected routes)
    │
    ▼
Controller
    │
    ▼
Mongoose Model
    │
    ▼
MongoDB
```

Image uploads follow a similar flow through Multer and Cloudinary:

```text
Client
  │
  │ multipart/form-data
  ▼
Multer / Cloudinary Storage
  │
  ▼
Cloudinary
  │
  ▼
Image URL + public ID stored in MongoDB
```

---

## 📁 Project Structure

```text
ChessBooksAPI/
│
├── index.js                         # Application entry point
├── package.json                     # Dependencies and npm scripts
├── package-lock.json
├── .gitignore
├── README.md
│
└── src/
    ├── api/
    │   ├── controllers/
    │   │   ├── books.controller.js
    │   │   ├── authors.controller.js
    │   │   └── users.controller.js
    │   │
    │   ├── models/
    │   │   ├── book.model.js
    │   │   ├── author.model.js
    │   │   └── user.model.js
    │   │
    │   └── routes/
    │       ├── books.routes.js
    │       ├── authors.routes.js
    │       └── users.routes.js
    │
    ├── config/
    │   ├── db.js                    # MongoDB connection
    │   └── cloudinary.js             # Cloudinary configuration
    │
    ├── data/
    │   └── books.js                 # Seed data
    │
    ├── middlewares/
    │   ├── auth.middleware.js       # JWT verification + role authorization
    │   └── file.middleware.js       # Multer + Cloudinary storage
    │
    └── utils/
        ├── cloudinary.js            # Cloudinary image deletion helper
        ├── token.js                 # JWT generation and verification
        └── seeds/
            └── books.seed.js        # Database seed/reset script
```

---

## 🗄️ Data Model

### Book

A book contains the following main fields:

| Field | Type | Required | Description |
| --- | --- | ---: | --- |
| `title` | String | ✅ | Book title |
| `synopsis` | String | ❌ | Short description |
| `year` | Number | ✅ | Publication year (`1400`–`2100`) |
| `language` | String | ✅ | Supported book language |
| `authors` | `[ObjectId]` | ❌ | References to `Author` documents |
| `purchase_links` | `[String]` | ❌ | External purchase URLs |
| `image.imgUrl` | String | ❌ | Cloudinary image URL |
| `image.imgId` | String | ❌ | Cloudinary public ID |
| `publisher` | String | ✅ | Publisher |
| `createdAt` | Date | — | Automatically generated timestamp |
| `updatedAt` | Date | — | Automatically generated timestamp |

Supported book languages are currently defined as an enum in the Mongoose schema and include English, Chinese, Spanish, German, French, Japanese, Russian, Italian, Portuguese, Korean, Arabic, Dutch, Polish, Swedish, Czech, Greek, Turkish, Ukrainian, Danish and Norwegian.

### Author

| Field | Type | Required | Description |
| --- | --- | ---: | --- |
| `fullName` | String | ✅ | Author's full name |
| `nationality` | String | ❌ | Nationality |
| `birthYear` | Number | ❌ | Year of birth |
| `passingYear` | Number | ❌ | Year of death, when applicable |
| `title` | String | ❌ | Chess title: `GM`, `IM`, `FM`, `CM` or `NM` |
| `createdAt` | Date | — | Automatically generated timestamp |
| `updatedAt` | Date | — | Automatically generated timestamp |

### User

| Field | Type | Required | Description |
| --- | --- | ---: | --- |
| `username` | String | ✅ | Display/login username |
| `password` | String | ✅ | Stored as a bcrypt hash |
| `email` | String | ✅ | Unique email address |
| `role` | String | ✅ | `user` or `admin` |
| `favorites` | `[ObjectId]` | ❌ | References to favourite `Book` documents |
| `image.imgUrl` | String | ❌ | Cloudinary profile image URL |
| `image.imgId` | String | ❌ | Cloudinary public ID |
| `createdAt` | Date | — | Automatically generated timestamp |
| `updatedAt` | Date | — | Automatically generated timestamp |

### Relationships

```text
Author 1 ────────< Book >──────── 1 Author
                       
User 1 ────────< Favorite >────── Book
```

In MongoDB, books store references to authors and users store references to favourite books. Mongoose `populate()` is used to resolve these references in several read operations.

---

## 🔐 Authentication & Authorization

Authentication is implemented with **JWT**.

### Login flow

```text
1. Client registers a user
2. Client sends email + password to /api/users/login
3. API verifies the password with bcrypt
4. API signs a JWT using JWT_SECRET
5. Client sends the token in future protected requests
```

Protected routes expect the token in the `Authorization` header:

```http
Authorization: Bearer <JWT_TOKEN>
```

The JWT payload currently contains the authenticated user's ID and email and expires after **1 day**.

### Roles

Two application roles are defined:

- `user`
- `admin`

Administrative book operations and administrative user operations are protected with the authentication middleware and require the `admin` role.

---

## 📡 API Reference

Base URL for local development:

```text
http://localhost:3000
```

### Books

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/books` | Public | Get all books |
| `GET` | `/api/books/:id` | Public | Get a book by MongoDB ID |
| `GET` | `/api/books/filterTitle?title=...` | Public | Search books by title fragment |
| `GET` | `/api/books/filterLanguage?language=...` | Public | Filter books by language |
| `GET` | `/api/books/filterAuthor?author=...` | Public | Filter books by author |
| `GET` | `/api/books/yearRange?minYear=...&maxYear=...` | Public | Filter books by publication-year range |
| `POST` | `/api/books` | Admin | Create a book |
| `PUT` | `/api/books/:id` | Admin | Update a book |
| `PATCH` | `/api/books/addAuthor/:id` | Admin | Add an author reference to a book |
| `DELETE` | `/api/books/:id` | Admin | Delete a book |

#### Example: search by title

```http
GET /api/books/filterTitle?title=system
```

The title search is case-insensitive and supports partial matches.

#### Example: filter by language

```http
GET /api/books/filterLanguage?language=english
```

#### Example: filter by year range

```http
GET /api/books/yearRange?minYear=1900&maxYear=2000
```

The API defaults to `1400` and `2100` when the corresponding year values are omitted or empty.

#### Create a book

Book creation accepts `multipart/form-data` because a cover image can be uploaded using the `img` field.

Example textual fields:

```text
title=My Chess Book
synopsis=An example chess book
...
year=2025
language=English
publisher=Example Publisher
```

For the `authors` property, send the corresponding MongoDB `ObjectId` reference(s).

#### Add an author to a book

```http
PATCH /api/books/addAuthor/:id
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

Request body:

```json
{
  "addAuthor": "AUTHOR_OBJECT_ID"
}
```

---

### Authors

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `GET` | `/api/authors` | Public | Get all authors |
| `GET` | `/api/authors/:id` | Public | Get an author by ID |
| `GET` | `/api/authors/name?name=...` | Public | Search authors by name fragment |
| `POST` | `/api/authors` | Admin | Create an author |
| `PUT` | `/api/authors/:id` | Admin | Update an author |
| `DELETE` | `/api/authors/:id` | Admin | Delete an author |

#### Example: search authors

```http
GET /api/authors/name?name=kasparov
```

The search is case-insensitive and matches fragments of `fullName`.

---

### Users

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/users/register` | Public | Register a new user |
| `POST` | `/api/users/login` | Public | Authenticate a user and receive a JWT |
| `PUT` | `/api/users/update/:id` | Public in current implementation | Update user information/profile image |
| `GET` | `/api/users` | Admin | Get all users |
| `GET` | `/api/users/:id` | Admin | Get a user by ID |
| `DELETE` | `/api/users/delete/:id` | Admin | Delete a user |

#### Register

```http
POST /api/users/register
Content-Type: application/json
```

Example request:

```json
{
  "username": "chessplayer",
  "email": "chessplayer@example.com",
  "password": "securepassword",
  "role": "user"
}
```

The API checks whether the email or username is already registered before creating the user.

#### Login

```http
POST /api/users/login
Content-Type: application/json
```

Example request:

```json
{
  "email": "chessplayer@example.com",
  "password": "securepassword"
}
```

The response contains the generated JWT token.

#### Update profile

The update endpoint accepts `multipart/form-data` so that a profile image can be uploaded through the `img` field.

---

## 🖼️ Image Uploads

Images are handled with **Multer** and stored in **Cloudinary**.

Two Cloudinary folders are configured:

```text
ChessBooks/books
ChessBooks/users
```

Supported image formats:

```text
jpg
png
jpeg
gif
webp
```

The database stores both the Cloudinary URL and the Cloudinary public ID so that uploaded images can also be removed when the related resource is deleted.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
DB_URL=mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Variable reference

| Variable | Purpose |
| --- | --- |
| `DB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

> **Important:** `.env` is ignored by Git through `.gitignore`. Never commit real database credentials, JWT secrets or Cloudinary credentials to the repository.

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/PacoCanovaca/ChessBooksAPI.git
cd ChessBooksAPI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env` and add the required values described above.

### 4. Start the API

Development mode with Nodemon:

```bash
npm run dev
```

Production-style start command:

```bash
npm start
```

The application listens on:

```text
http://localhost:3000
```

---

## 🌱 Seed Data

The repository contains sample data for chess authors and books.

Run:

```bash
npm run bookSeed
```

### ⚠️ Seed warning

The current seed script **drops the existing `books` and `authors` collections before inserting the seed data**. Do not execute it against a database containing data you need to preserve.

---

## 🧪 Testing the API

The project can be tested with tools such as **Insomnia**, **Postman** or `curl`.

A typical authentication test flow is:

```text
Register user
    ↓
Login user
    ↓
Copy JWT
    ↓
Send Authorization: Bearer <token>
    ↓
Access protected admin endpoints with an admin account
```

For multipart requests such as book creation or profile updates, use `form-data` instead of a raw JSON body.

---

## 🔒 Security Notes

The project already incorporates several useful backend security mechanisms:

- Passwords are hashed with `bcrypt` before persistence.
- JWTs are signed with a secret stored in the environment.
- Protected routes verify the JWT before checking the user's role.
- User passwords are removed from `req.user` after authentication middleware loads the authenticated user.
- Secrets and local environment configuration are excluded from Git.

For production deployment, additional hardening would be appropriate, especially around input validation, rate limiting, CORS policy, error handling, authorization ownership checks and secret management.

---

## ⚠️ Current Limitations / Technical Debt

This repository is a learning/portfolio project and the current implementation still contains areas that should be addressed before production use.

### Authors router

The current `authors.routes.js` applies `isAuth(["admin"])` to write operations but does not import `isAuth`. This needs to be corrected before the application can reliably load the authors router.

### User update authorization

`PUT /api/users/update/:id` is not protected by the authentication middleware in the current route definition. A production implementation should authenticate the request and restrict users to their own profile unless they have an appropriate administrative role.

### User lookup controller

The current `getUserById` controller does not pass `req.params.id` to `User.findById()` and does not send the successful response. This endpoint needs correction before it can be considered complete.

### Request validation

Validation is currently handled mainly through Mongoose schemas and controller-level checks. A dedicated request-validation layer would make API validation and error responses more consistent.

### Error-handling consistency

Controllers currently implement their own `try/catch` blocks and response messages. A centralized error-handling middleware would reduce duplication and improve consistency.

### Automated tests

No automated test suite is currently included in the repository. Adding unit and integration tests would make refactoring safer and improve confidence in the API.

---

## 🔮 Possible Future Improvements

- Add automated unit and integration tests.
- Add centralized error handling.
- Add request validation with a dedicated validation library.
- Add pagination and sorting to collection endpoints.
- Add stricter ownership-based authorization for user resources.
- Add dedicated endpoints for managing favourites.
- Improve author/book relationship handling and deletion rules.
- Add API documentation with OpenAPI/Swagger.
- Add CORS and security-header configuration for deployment.
- Add environment validation at application startup.
- Add Docker support and a deployment configuration.
- Add a frontend client consuming the REST API.
- Add CI checks for linting, tests and dependency/security checks.

---

## 📚 Example Resource

A book document returned by the API can conceptually look like this:

```json
{
  "_id": "BOOK_OBJECT_ID",
  "title": "My System",
  "synopsis": "A foundational work on chess strategy.",
  "year": 1925,
  "language": "English",
  "authors": [
    {
      "_id": "AUTHOR_OBJECT_ID",
      "fullName": "Aron Nimzowitsch",
      "nationality": "Latvian"
    }
  ],
  "purchase_links": [
    "https://example.com/buy/my-system"
  ],
  "image": {
    "imgUrl": "https://res.cloudinary.com/...",
    "imgId": "ChessBooks/books/..."
  },
  "publisher": "Quality Chess",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

---

## 📄 License

This project declares the **ISC** license in `package.json`.

---

## 👨‍💻 Author

**Paco Canovaca**

GitHub: [@PacoCanovaca](https://github.com/PacoCanovaca)

Repository: [ChessBooksAPI](https://github.com/PacoCanovaca/ChessBooksAPI)

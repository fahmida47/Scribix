# ✦ Scribix

### Capture Ideas. Keep Them Close.

Scribix is a lightweight and modern **Sticky Note Management Application** built with **TypeScript, Express.js, MySQL, HTML, CSS, and JavaScript**.

It allows users to create, view, update, and delete notes through a clean browser-based interface while storing all note data in a MySQL database.

---

## ✨ Features

- 📝 Create new notes
- 📖 View all notes
- 🔎 View individual notes
- ✏️ Edit existing notes
- 🗑️ Delete notes
- 🏷️ Organize notes using categories
- 💾 MySQL database integration
- ❤️ Clean and responsive user interface
- 🔌 RESTful API
- 🩺 Database-connected health check
- ⚡ TypeScript backend
- 🚀 Production-ready build with Node.js and PM2

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- MySQL
- mysql2
- dotenv
- CORS

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Development & Deployment

- Git
- GitHub
- npm
- PM2
- Nginx

---

## 📂 Project Structure

```text
Scribix/
│
├── public/
│   ├── index.html
│   ├── app.css
│   └── app.js
│
├── backend/
│   ├── src/
│   │   ├── db.ts
│   │   └── server.ts
│   │
│   ├── dist/
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 🗄️ Database

Scribix uses **MySQL** as its database.

### Database

```text
scribix_db
```

### Table

```text
notes
```

### Columns

| Column | Type | Description |
|---|---|---|
| id | INT | Unique note ID |
| title | VARCHAR(150) | Note title |
| content | TEXT | Note content |
| category | VARCHAR(50) | Note category |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

---

## 🔌 API Endpoints

### Health Check

```http
GET /api/health
```

Returns the application and database connection status.

Example response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

---

### Get All Notes

```http
GET /api/notes
```

Returns all notes from the database.

---

### Get Single Note

```http
GET /api/notes/:id
```

Returns a specific note by ID.

---

### Create Note

```http
POST /api/notes
```

Example request:

```json
{
  "title": "Project Meeting",
  "content": "Discuss the next phase of the project.",
  "category": "Project"
}
```

---

### Update Note

```http
PUT /api/notes/:id
```

Example request:

```json
{
  "title": "Updated Project Meeting",
  "content": "Discuss the updated project plan.",
  "category": "Project"
}
```

---

### Delete Note

```http
DELETE /api/notes/:id
```

Deletes a note using its ID.

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/fahmida47/scribix.git
```

```bash
cd scribix
```

---

### 2. Install backend dependencies

```bash
cd backend
```

```bash
npm install
```

---

### 3. Create the environment file

Create a `.env` file inside the `backend` folder.

```env
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=scribix_db
```

> Never commit your `.env` file or database password to GitHub.

---

### 4. Create the database

Create the database in MySQL:

```sql
CREATE DATABASE scribix_db;
```

Then create the `notes` table:

```sql
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'General',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
```

---

### 5. Add sample notes

```sql
INSERT INTO notes (title, content, category)
VALUES
(
    'Database Assignment',
    'Complete the database assignment before Sunday.',
    'Study'
),
(
    'Project Meeting',
    'Discuss the next phase of the project with the team.',
    'Project'
),
(
    'Buy Stationery',
    'Buy notebooks, pens, and other stationery items.',
    'Personal'
);
```

---

## ▶️ Run in Development

From the `backend` folder:

```bash
npm run dev
```

The server will start at:

```text
http://localhost:3001
```

Open the application in your browser:

```text
http://localhost:3001/
```

---

## 🏗️ Build for Production

```bash
npm run build
```

The compiled TypeScript files will be generated inside:

```text
backend/dist/
```

Run the production server with:

```bash
npm start
```

---

## 🔐 Environment Variables

Scribix uses environment variables for database configuration.

| Variable | Description |
|---|---|
| PORT | Application port |
| DB_HOST | MySQL host |
| DB_PORT | MySQL port |
| DB_USER | MySQL username |
| DB_PASSWORD | MySQL password |
| DB_NAME | MySQL database name |

For security, `.env` is excluded from Git using `.gitignore`.

---

## 🚀 Deployment

Scribix is designed to be deployed on a Linux VPS using:

```text
GitHub
   ↓
VPS
   ↓
Node.js
   ↓
PM2
   ↓
Nginx
   ↓
Domain
```

Production deployment can include:

- Linux VPS
- Node.js
- MySQL
- PM2 process manager
- Nginx reverse proxy
- Custom domain
- GitHub-based deployment workflow

---

## 🩺 Health Monitoring

Scribix provides a dedicated health endpoint:

```text
/api/health
```

The endpoint performs a database query to verify that the application can successfully communicate with MySQL.

Successful response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## 🎯 Project Goals

Scribix was created as a practical project for learning:

- REST API development
- TypeScript with Express
- MySQL database integration
- CRUD operations
- Frontend and backend integration
- Environment variable management
- Production builds
- VPS deployment
- PM2 process management
- Nginx configuration

---

## 👩‍💻 Author

**Fahmida Afrin Nadia**

CSE Student | Aspiring Frontend Developer

GitHub: [@fahmida47](https://github.com/fahmida47)

---

## 📄 License

This project is created for educational and practice purposes.

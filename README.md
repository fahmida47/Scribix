# 📝 Scribix

> A simple and modern full-stack sticky notes application built for managing quick notes with a clean and responsive interface.

Scribix is a full-stack sticky notes application built with **TypeScript, Express.js, MySQL, and Vanilla JavaScript**.
The project also demonstrates a practical **VPS deployment workflow using GitHub Actions, SSH, SCP, PM2, and Nginx**.

---

## ✨ Features

* 📝 Create and manage sticky notes
* ✏️ Edit existing notes
* 🗑️ Delete notes
* 📌 View saved notes
* 💾 Persistent data storage with MySQL
* 🌐 REST API built with Express.js
* ❤️ Health check endpoint
* 🚀 VPS deployment with GitHub Actions
* 📦 Production build using TypeScript
* 🔄 Automatic application restart with PM2
* 🌍 Nginx reverse proxy for public access

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* Vanilla JavaScript

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* MySQL

### Deployment & DevOps

* GitHub Actions
* SSH
* SCP
* PM2
* Nginx
* Linux VPS

---

## 📂 Project Structure

```text
Scribix/
│
├── backend/
│   ├── src/
│   ├── dist/
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/fahmida47/Scribix.git
cd Scribix
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
PORT=3002

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

> Keep your actual database credentials private. Do not commit `.env` to GitHub.

### 4. Build the backend

```bash
npm run build
```

### 5. Start the backend

```bash
npm start
```

The backend will run on:

```text
http://localhost:3002
```

---

## ❤️ API Health Check

Scribix provides a health-check endpoint:

```text
GET /api/health
```

Example:

```bash
curl http://127.0.0.1:3002/api/health
```

Example response:

```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## 🚀 Deployment

Scribix is deployed to a Linux VPS using a manual GitHub Actions workflow.

The deployment pipeline follows:

```text
GitHub Repository
       ↓
GitHub Actions
       ↓
Install Dependencies
       ↓
Build TypeScript
       ↓
SSH Connection
       ↓
SCP Upload
       ↓
PM2 Restart
       ↓
Health Check
       ↓
Application Running
```

### Deployment Tools

* **GitHub Actions** — automated deployment workflow
* **SSH** — secure VPS connection
* **SCP** — transfers production build files
* **PM2** — process management and automatic restart
* **Nginx** — reverse proxy
* **MySQL** — database server

---

## 🔄 PM2 Process Management

The backend runs with PM2:

```bash
pm2 start dist/server.js --name scribix
```

Check the application:

```bash
pm2 status
```

Restart:

```bash
pm2 restart scribix
```

Save the process list:

```bash
pm2 save
```

PM2 is configured to start automatically after VPS reboot.

---

## 🌐 Nginx

Nginx works as a reverse proxy between the public server and the Node.js backend.

```text
Client
  ↓
Nginx :80
  ↓
Node.js / Express :3002
  ↓
MySQL
```

This allows the application to be accessed through the VPS's public HTTP endpoint while keeping the Node.js application running on its internal port.

---

## 🔐 GitHub Actions Secrets

The deployment workflow uses the following GitHub repository secrets:

```text
VPS_HOST
VPS_USERNAME
VPS_SSH_KEY
```

These secrets are used to securely connect to the VPS and deploy the application.

> Never commit private SSH keys or database passwords to the repository.

---

## 🧪 Deployment Verification

The deployment workflow verifies the backend after restarting the application:

```bash
curl -f http://127.0.0.1:3002/api/health
```

A successful deployment returns HTTP `200 OK`.

---

## 📌 Project Purpose

Scribix was developed as a practical full-stack and DevOps learning project to understand:

* REST API development
* TypeScript backend development
* MySQL database integration
* Linux VPS deployment
* SSH-based deployment
* SCP file transfer
* GitHub Actions workflows
* PM2 process management
* Nginx reverse proxy configuration
* Production health monitoring

---

## 👩‍💻 Author

**Fahmida Afrin Nadia**

CSE Student | Aspiring Frontend Developer | Open Source Contributor

GitHub: [@fahmida47](https://github.com/fahmida47)

---

## 📄 License

This project is created for educational and learning purposes.

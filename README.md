# **Corn Sales System**
### **🛒 A complete solution for purchasing corn using FastAPI as the backend and React as the frontend.**

## 📌 **Project Structure**
This repository contains two main folders:
1. **apiBobCorn/** → Backend developed in **FastAPI**, handles purchases, validations, and database management.
2. **appBobCorn/** → Frontend built with **React & Vite**, allows users to interact with the API.

---

## 🛠 **Technologies Used**
### **Backend (API - FastAPI)**
- Python 3.10+
- FastAPI
- SQLAlchemy
- MySQL
- Python-dotenv (environment variables)

### **Frontend (App - React)**
- React.js
- TypeScript
- Vite.js
- Tailwind CSS

---

## 🔧 **Requirements**
Before running the project, ensure the following are installed:
- **Node.js** (`npm -v` to check)
- **Python 3.10+** (`python --version`)
- **MySQL** (`mysql --version`)
- **Virtual environment for Python** (`pip install virtualenv`)

---

## 🚀 **Local Installation & Execution**
### **Backend (FastAPI)**
1️⃣ **Clone the repository**  
```bash
git clone https://github.com/your-repo/bobCornStore.git
cd corn-sales/apiBobCorn
```

2️⃣ **Set up a virtual environment**
```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
```

3️⃣ **Install dependencies**
```bash
pip install -r requirements.txt
```

4️⃣ **Create a new database in your local environment**
```bash
-- Crear la base de datos
CREATE DATABASE bob_corn_db;

-- Seleccionar la base de datos para trabajar
USE bob_corn_db;

-- Crear la tabla purchases
CREATE TABLE purchases (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- Identificador único, autoincrementable
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación automática
    username VARCHAR(255) NOT NULL -- Nombre de usuario, no puede ser NULL
);

```

5️⃣ **Configure environment variables (`.env` file)**

```ini
DB_USERNAME=yourUsername
DB_PASSWORD=yourPassword
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bob_corn_db
```

6️⃣ **Run the API**
```bash
uvicorn app.main:app --reload
```

Backend should now be running at **http://localhost:8000/** 🚀

---

### **Frontend (React)**
1️⃣ **Go to the frontend folder**
```bash
cd ../appBobCorn
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Run the application**
```bash
npm run dev
```

Frontend should now be running at **http://localhost:3000/** 🚀

---

## 📢 **API Endpoints**
### **Purchases Management**
- `POST /purchases/` → **Creates a new purchase** _(validates time restrictions)_
- `GET /purchases/{username}/count` → **Counts total purchases by user**
- View endpoints in swagger **http://localhost:8000/docs**

---

✅Notes and Improvements
🔹 Authentication is a simulation that works by entering a username to purchase corn at the store, but it can be enhanced with a JWT authentication process to make this challenge more secure and realistic.
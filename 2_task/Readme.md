**ДЗ №2. Основи роботи із сервером**

## Завдання

Побудувати власний folder-based router à la Next .js App Router для простого REST-API (CRUD над ресурсом users) із «БД» database.json.

Щоб запустити проект:

`npm i `

`npm run start`

## 📡 API Endpoints

Base URL: `http://localhost:3000`

### 🔍 GET all users

`curl -X GET http://localhost:3000/users`

---

### 🔍 GET user by ID

`curl -X GET http://localhost:3000/users/42`

> Replace `42` with a valid user ID.

---

### ➕ Create a new user

`curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "username", "hobby": "coding"}'`

---

### ♻️ Update user by ID

`curl -X PUT http://localhost:3000/users/42 \
  -H "Content-Type: application/json" \
  -d '{"name": "newName", "hobby": "newHobby"}'`

---

### ❌ Delete user by ID

`curl -X DELETE http://localhost:3000/users/42`

# 📌 Project Overview

**Sprint Lite** is a lightweight Agile project management system.  
It allows users to:

- 📋 Create and manage **Projects**  
- 🏃‍♂️ Manage **Sprints**  
- ✅ Add **Issues** (Tasks, Bugs, Stories) with priority and status  
- 👥 Assign tasks to team members and track progress  
- 🔐 Authenticate with **JWT (Access + Refresh Tokens)**  
- 📊 Explore API documentation with **Swagger**  

---

## ⚙️ Installation

### 1. Clone & Install
```bash
git clone https://github.com/handomeh03/SprintLite.git
cd sprint-lite
npm install
2. Environment Variables
Copy the .env.example file to .env and adjust the values:

bash
Copy
Edit
cp .env.example .env
📂 .env.example

env
Copy
Edit
PORT=8080
MONGO_URL=mongodb://127.0.0.1:27017/SprintLite
SECRETKEY=yourSecretKeyHere
3. Database Seed
bash
Copy
Edit
npm run seed
🚀 This script will create:

👑 Admin user → admin@sprintlite.com / 12345@abC

👤 Project Manager user → manager@sprintlite.com / 12345@abC

👥 Developer user → member@gmail.com / 12345@abC

🏗 Example project, sprint, and issue

4. Run the App
bash
Copy
Edit
npm run dev
The app will be available at: http://localhost:8080

📚 API Documentation
Swagger is served at:
👉 http://localhost:8080/api/docs

🔐 Security Checklist
✅ Password hashing: bcrypt (12 salt rounds)

✅ RBAC (roles): Admin / Manager / Member

✅ Validation: validator middleware

✅ Helmet: secure HTTP headers

✅ CORS: restricted origins

✅ Errors: centralized error handling

✅ Token Security: JWT (Access + Refresh)

🎥 Demo
📹 Demo Video – Sprint Lite
(Replace with your demo video link, ≤ 8 minutes)

👨‍💻 Scripts
npm run dev → start the server (nodemon)

npm run seed → insert seed data (users + project + sprint + issue)

npm test → run tests

yaml
Copy
Edit

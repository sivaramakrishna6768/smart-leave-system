# Smart Leave Management System

Smart Leave Management System is a full-stack web application built using **React.js**, **Bootstrap 5**, **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. The system enables employees to apply for leaves and managers to review and approve/reject requests through an intuitive and secure interface.

## 🌐 Live Demo

- 🔗 Frontend: [smart-leave-frontend.onrender.com](https://smart-leave-frontend.onrender.com)
- 🔗 Backend: [smart-leave-backend.onrender.com](https://smart-leave-backend.onrender.com)

> ⚠️ **Note:** The app is hosted on **Render's free tier**, which means the service may sleep after inactivity and might not be available permanently.

---

## ⚙️ Tech Stack

### Frontend:
- [React.js](https://reactjs.org/) (with [Vite](https://vitejs.dev/) for fast builds)
- Bootstrap 5 (Responsive UI)
- Axios (for API communication)
- JWT-based session handling
- GitHub Actions (CI/CD integration for auto-deployment to Render)

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose ORM
- JWT Authentication & Role-based access control (Employee/Manager)
- RESTful API
- GitHub Actions CI/CD + Deploy Hooks

---

## 🚀 Key Features

- 🧑‍💼 Employee & Manager roles
- 📝 Leave request form and status tracker
- 📬 Real-time feedback (Toast notifications, status updates)
- 🔒 Secure password hashing and JWT session management
- 📦 Continuous deployment pipeline (GitHub Actions + Render Deploy Hooks)

---

## 🛠️ Deployment

This project uses **GitHub Actions** to deploy both the frontend and backend on every push to the `main` branch.

- `.github/workflows/frontend.yml` triggers frontend deploy via Render hook.
- `.github/workflows/backend.yml` triggers backend deploy via Render hook.
- Auto-deploy logs visible in both **Render dashboard** and **GitHub Actions tab**.

---

## 📁 Project Structure

```
smart-leave-system/
├── backend/               # Node.js + Express API
│   └── server.js, routes, models, middleware
├── frontend/              # React.js + Bootstrap
│   └── src/pages, components, App.jsx, index.html
├── .github/workflows/     # GitHub Actions CI/CD workflows
│   └── frontend.yml, backend.yml
└── README.md
```

---

## 🛠️ Run Locally

Follow these steps to run the **Smart Leave Management System** locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or cloud-based)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-leave-system.git
cd smart-leave-system
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env.local` file inside the `backend/` directory with the following contents:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smartleave
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

> The backend runs at: [http://localhost:5000](http://localhost:5000)

---

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

Create a `.env.local` file inside the `frontend/` directory with the following contents:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend app:

```bash
npm run dev
```

> The frontend runs at: [http://localhost:5173](http://localhost:5173)

---

### ✅ You're All Set!

- Open your browser and go to [http://localhost:5173](http://localhost:5173)
- Register as an employee or manager.
- Explore the leave request, approval, and dashboard features.

---

## 👨‍💻 Author Notes

This project showcases my practical knowledge in:
- Building secure and scalable MERN applications.
- Integrating CI/CD using GitHub Actions.
- Hosting production-ready services on cloud platforms like **Render**.
- Writing modular, maintainable code with environment-specific configurations.

---

## 📬 Feedback

If you'd like to contribute or have suggestions, feel free to raise an issue or fork the repo. Your feedback is appreciated!

---

## 📞 Credits

This project was built by Siva Ramakrishna Palaparthy.

M.S. Computer Science, Syracuse University  
Email: krishpalaparthy6768@gmail.com

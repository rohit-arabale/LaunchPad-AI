# LaunchPad AI — AI Career Engine

<div LaunchPad AI="center">

**Your Personalized Interview Preparation Platform**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation)

</div>

---

## 📋 Overview

**LaunchPad AI** is a full-stack AI-powered interview preparation platform that helps job seekers prepare for technical and behavioral interviews. By analyzing your resume, job description, and background, LaunchPad AI generates personalized interview questions, identifies skill gaps, and creates a structured preparation roadmap.

**Developer:** Rohit

### Why LaunchPad AI?

- **Personalized Reports**: Get custom interview questions tailored to your target role
- **Skill Gap Identification**: Understand what you need to improve with severity ratings
- **Structured Prep Plans**: Day-by-day roadmap to maximize your interview success
- **Track Your Progress**: Save and revisit all your preparation reports

---

## ✨ Features

### 🎯 Core Functionality

- **Resume Analysis**: Upload your resume (PDF) and extract key information automatically
- **Job Matching**: Receive a match score (0-100) comparing your profile with the job requirements
- **Interview Questions**:
  - Technical questions with intentions and sample answers
  - Behavioral questions to assess soft skills
- **Skill Gap Analysis**: Identify missing skills categorized by severity (low, medium, high)
- **Preparation Roadmap**: Get a day-by-day study plan with actionable tasks

### 🔐 Authentication & Security

- Secure user registration and login with JWT-based authentication
- Password hashing with bcryptjs
- Cookie-based session management
- Token blacklisting on logout
- Protected routes on frontend and backend

### 📊 Report Management

- View all historical interview preparation reports
- Access detailed individual reports
- Reports sorted by creation date
- Persistent storage in MongoDB

---

## 🛠️ Tech Stack

### Frontend

| Technology          | Version | Purpose                  |
| ------------------- | ------- | ------------------------ |
| **React**           | 19.2.0  | UI Framework             |
| **Vite**            | 7.3.1   | Build Tool & Dev Server  |
| **Tailwind CSS**    | 4.2.1   | Styling Framework        |
| **React Router**    | 7.13.1  | Client-side Routing      |
| **Motion (Framer)** | 12.36.0 | Animations               |
| **Lucide React**    | 0.577.0 | Icon Library             |
| **Axios**           | 1.13.6  | HTTP Client              |
| **Radix UI**        | —       | Accessible UI Components |
| **shadcn/ui**       | —       | Component Library        |

### Backend

| Technology           | Version | Purpose                 |
| -------------------- | ------- | ----------------------- |
| **Node.js**          | —       | JavaScript Runtime      |
| **Express.js**       | 5.2.1   | Web Framework           |
| **MongoDB**          | —       | NoSQL Database          |
| **Mongoose**         | 9.2.3   | ODM for MongoDB         |
| **Google Gemini AI** | 1.44.0  | AI Interview Generation |
| **JWT**              | 9.0.3   | Authentication Tokens   |
| **Multer**           | 2.1.1   | File Upload Middleware  |
| **pdf-parse**        | 2.4.5   | PDF Text Extraction     |
| **Zod**              | 4.3.6   | Schema Validation       |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Google Gemini API Key** ([Get one here](https://ai.google.dev/))

### Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd "New project"
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/LaunchPad AI
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
```

**Environment Variables Explained:**

- `PORT`: Backend server port (default: 3000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `GEMINI_API_KEY`: Google Gemini AI API key
- `FRONTEND_URL`: Frontend origin for CORS configuration

#### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory (if needed):

```env
VITE_API_URL=http://localhost:3000
```

#### 4. Run the Application

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

The application will be available at:

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

<div LaunchPad AI="center">

**Designed and developed by Rohit**

</div>

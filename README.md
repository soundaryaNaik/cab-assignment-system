🚖 Cab Assignment System

A simple full-stack web application that assigns the nearest available driver to a user based on location (numeric distance logic).

🧩 Project Overview

This system simulates a basic ride-booking service similar to Uber:

Add drivers with locations
Request a ride from user location
Automatically assign the nearest available driver
Store data in MySQL database
Display results in React UI
⚙️ Tech Stack
Frontend: React.js, Axios, CSS
Backend: Node.js, Express.js
Database: MySQL
API: REST APIs
🚀 Features
➕ Add new drivers
📍 Store driver locations
🚕 Request ride from user
🧠 Nearest driver assignment logic
🗄️ MySQL database integration
📊 Real-time result display
🏗️ Project Structure
cab-assignment-system/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
│
└── README.md
🛠️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/soundaryaNaik/cab-assignment-system.git
cd cab-assignment-system
2️⃣ Backend Setup
cd backend
npm install

Create MySQL database:

CREATE DATABASE cab_system;

Run server:

node server.js

Backend runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend runs on:

http://localhost:3000
🔌 API Endpoints
➕ Add Driver
POST /drivers
{
  "name": "Ravi",
  "location": 5
}
🚕 Request Ride
POST /ride
{
  "user_location": 7
}
🧠 Core Logic

The system calculates nearest driver using:

distance = |driver_location - user_location|

Then assigns driver with minimum distance.

🎯 Example
Input:

Drivers:

Ravi → 2
Amit → 8

User location:

7
Output:
Driver assigned: Amit
Distance: 1
📸 UI Preview

(Add screenshot here if needed)

🚀 Future Improvements
Real-time tracking (Socket.io)
Google Maps integration
Authentication system
Driver availability reset
Deployment (Vercel + Render)
👩‍💻 Author

Soundarya Naik
GitHub: https://github.com/soundaryaNaik

📌 Note

This project is built for learning full-stack development and system design basics.

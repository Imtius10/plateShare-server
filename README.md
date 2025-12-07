🍽️ PlateShare Backend
Surplus Food Sharing API built with Node.js + Express + MongoDB
<p align="center"> <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge"/> <img src="https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge"/> <img src="https://img.shields.io/badge/MongoDB-Atlas-brightgreen?style=for-the-badge"/> <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge"/> </p>
✨ Overview

PlateShare is a backend server that powers a food donation and sharing app.
It helps users donate surplus food, request food, and manage contributions — all through easy REST APIs.

🚀 Features

👤 User registration (prevents duplicates)

🍛 Add, update, delete food items

📥 Send food requests

📄 View request status

🔒 Secure API structure

🌐 MongoDB Atlas database

🛠️ Tech Stack
Technology	Purpose
Node.js	Runtime
Express.js	API Framework
MongoDB Atlas	Database
dotenv	Environment Variables
CORS	Cross-Origin Access
📦 Installation
npm install


Create .env file:

DB_USER=yourUser
DB_PASS=yourPassword


Run server:

node index.js

🔗 Base URL
http://localhost:3000

📘 API Documentation
👤 User Endpoints
➤ Create / Register User

Prevents duplicate accounts.

POST /user

Body:
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "photo": "john.png"
}

Response:

If new → "User added successfully"

If existing → "User already exists"

🍛 Food Endpoints
➤ Get All Foods

GET /foods

➤ Get Foods by Donator

GET /foods?donator_email=email@example.com

➤ Get Single Food

GET /foods/:id

➤ Add New Food

POST /foods

➤ Update Food

PATCH /foods/:id

➤ Delete Food

DELETE /foods/:id

🙋 Food Request Endpoints
➤ Request a Food

POST /food-requests

➤ My Requests

GET /my-requests?userEmail=email@example.com

➤ Requests on a Specific Food

GET /requests/food/:foodId

➤ Update Request Status

(approved / rejected / pending)

PATCH /requests/:id





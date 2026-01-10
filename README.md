# 🌍 TripWise – AI-Powered Travel Planner

TripWise is a full-stack travel planning web application that helps users plan trips efficiently by generating **AI-powered recommendations** based on their source, destination, travel preferences, and trip duration.

The application combines **real-world distance calculation** with **AI-generated travel insights** to provide a smooth and practical trip-planning experience.

---

## 🚀 Features

### 🧭 Trip Planning
- Enter **source**, **destination**, and **number of days**
- Select travel **preferences**
- Choose a **travel mode**
- View a complete trip summary

### 📏 Distance & Travel Time
- Calculates **distance** and **estimated travel time**
- Uses **OpenRouteService (ORS) Directions API**
- Locations are considered valid if distance calculation succeeds

### 🤖 AI-Powered Recommendations
Powered by **GROQ**:
- 🍜 Food recommendations
- 🏨 Hotel recommendations
- 📍 Must-visit places
- 🗓️ Day-wise itinerary
- 💰 Budget estimation

### 🛡️ Error Handling
- Graceful handling of API failures
- User-friendly error messages
- Fallback content when AI responses are unavailable

### 🎨 User Interface
- Clean and responsive UI
- Expandable dashboard sections
- Smooth navigation with back buttons

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- OpenRouteService (distance calculation)

### Backend
- Node.js
- Express.js
- GROQ API (AI recommendations)

---

## 🧱 Project Architecture

Frontend (React + Vite)
- User inputs (source, destination, days)
- Distance calculation (ORS Directions API)
- Trip summary dashboard
- Fetches AI-generated recommendations

Backend (Node + Express)
- Generates recommendations using GROQ

---

## 🔐 Environment Variables

### Frontend `.env`
- VITE_API_URL=http://localhost:5000
- VITE_ORS=_openrouteservice_api_key

### Backend `.env`
- PORT=5000
- GROQ_API_KEY=your_groq_api_key

## Cloning the Repository
- git clone https://github.com/priyani-raj/tripwise.git
- cd tripwise

### Setup Frontend
- cd frontend
- npm install
- npm run dev

### Setup Backend
- cd backend
- npm install
- node index.js

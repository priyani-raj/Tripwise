🌍 TripWise – AI-Powered Travel Planner

TripWise is a smart, full-stack travel planning web application that helps users plan trips effortlessly by generating personalized travel recommendations based on source, destination, preferences, and trip duration.

The project combines AI-generated recommendations with real-world distance calculation to provide a practical and user-friendly travel planning experience.
🚀 Features
🧭 Trip Planning

Enter source, destination, and number of days

Choose travel preferences

Select travel mode

View trip summary in a clean dashboard

📏 Distance & Travel Time Calculation

Calculates distance and estimated travel time

Uses OpenRouteService (ORS) Directions API

If distance calculation succeeds, locations are treated as valid

🤖 AI-Powered Recommendations (via GROQ)

🍜 Food recommendations

🏨 Hotel recommendations

📍 Must-visit places

🗓️ Day-wise itinerary

💰 Budget estimation

🛡️ Error Handling

Graceful handling of API failures

User-friendly error messages

Fallback content when AI responses are unavailable

🎨 Modern UI/UX

Clean and responsive design

Expandable dashboard sections

Smooth navigation with back buttons

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

OpenRouteService (distance calculation)

Backend

Node.js

Express.js

GROQ API (AI recommendations)

APIs & Services

GROQ – AI-generated travel content

OpenRouteService (ORS) – distance & travel time calculation

🧱 Project Architecture
Frontend (React + Vite)
 ├─ User inputs (source, destination, days)
 ├─ Distance calculation (ORS Directions API)
 ├─ Displays travel summary
 └─ Fetches AI recommendations

Backend (Node + Express)
 └─ Generates AI recommendations using GROQ

🔐 Environment Variables
Frontend .env
VITE_API_URL=http://localhost:5000
VITE_ORS=your_openrouteservice_api_key

Backend .env
PORT=5000
GROQ_API_KEY=your_groq_api_key


⚠️ Do not commit .env files to GitHub.

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/tripwise.git
cd tripwise

2️⃣ Setup Backend
cd backend
npm install
npm run dev

3️⃣ Setup Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173


Backend runs at:

http://localhost:5000

🧪 How Location Handling Works

TripWise does not perform separate location validation.

Instead:

Locations are considered valid if OpenRouteService successfully calculates distance

This avoids redundant validation calls

Keeps the system efficient and simple

If ORS fails to calculate distance, an error message is shown to the user.

📌 Why This Project Stands Out

Clean frontend–backend separation

Real-world API usage

Secure handling of API keys

Robust error handling

Modular and scalable component structure

Internship-ready full-stack project
🔮 Future Improvements

Location autocomplete

Map visualization

Saved trips & user accounts

Multi-city travel planning

Caching AI responses

👩‍💻 Author

Priyani Rajvanshi
B.Tech CSE Student
Web Development | AI Integration | Problem Solving

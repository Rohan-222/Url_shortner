URL Shortener with QR Code Generation

This project is a simple and efficient URL Shortener built with Node.js, Express.js, and React.js. It allows users to shorten URLs, generate QR codes for them, and redirect to the original URL.

Features

✅ Shorten long URLs easily✅ Generate QR codes for the shortened URLs✅ Provides clean and simple UI with Vite and Tailwind CSS✅ Backend built with Node.js and Express.js for fast performance✅ Persistent URL storage using SQLite✅ RESTful API for URL shortening and redirection✅ Error handling and validation for secure URL entries

Tech Stack

Frontend: React.js, Vite, Tailwind CSS

Backend: Node.js, Express.js

Database: MySQL

QR Code Library: qrcode

Installation

Clone the repository

git clone https://github.com/your-username/url-shortener.git
cd url-shortener

Install dependencies

npm install
cd frontend && npm install

Run the backend

npm start

Run the frontend

cd frontend
npm run dev

Access the appVisit http://localhost:5173 in your browser.

API Endpoints

POST /api/shorten

Request Body: { "originalUrl": "<URL>" }

Response: { "shortUrl": "<short-code>" }

GET /:shortUrl

Redirects to the original URL associated with the given short code.

Usage

Enter a valid URL in the input field.

Click "Shorten" to generate a short URL and a QR code.

Click the short URL to visit the original link.

Future Improvements

Add user authentication for better security.

Implement analytics to track URL click counts.

Enhance UI for better user experience.

License

This project is licensed under the MIT License.

Contributors: Feel free to submit issues or pull requests to improve this project!

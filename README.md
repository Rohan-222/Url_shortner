# URL Shortener

## Description
A simple and efficient URL Shortener application built using Node.js, Express.js, and React.js. This application allows users to shorten long URLs, generate QR codes for them, and easily redirect to the original URLs.

## Features
- Shorten long URLs efficiently
- Generate QR codes for shortened URLs
- User-friendly frontend built with React.js
- Backend powered by Node.js and Express.js
- MongoDB database for storing shortened URLs

## Tech Stack
### Frontend:
- React.js
- Axios
- Bootstrap / TailwindCSS (Optional)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ORM)

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Clone the Repository
```sh
git clone https://github.com/Rohan-222/Url_shortner.git
cd Url_shortner
```

### Backend Setup
```sh
cd backend
npm install
npm start
```

### Frontend Setup
```sh
cd frontend/url_shortner
npm install
npm start
```

## Usage
1. Open the application in your browser at `http://localhost:3000/`
2. Enter a long URL and generate a shortened URL
3. Copy the shortened URL or scan the generated QR code
4. Share and use the shortened URL for easy access

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|------------|
| POST | `/api/url/shorten` | Shortens a given long URL |
| GET | `/:shortCode` | Redirects to the original URL |
| GET | `/api/url/:shortCode` | Fetches details about a shortened URL |

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any queries, feel free to reach out via:
- GitHub Issues
- Email: sumukaraj123@gmail.com


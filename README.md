# URL Shortener

## Overview
The URL Shortener is a web application that allows users to shorten long URLs, generate QR codes for them, and track analytics such as the number of clicks and user locations. The project is built using **Node.js, Express.js, React.js, and MySQL**.

## Features
- Shorten long URLs easily
- Generate QR codes for shortened URLs
- Track clicks and user locations
- View analytics with user details (device type, city, country)
- Delete short URLs when needed

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Libraries Used:** `mysql2`, `valid-url`, `qrcode`, `geoip-lite`, `ua-parser-js`

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+)
- **MySQL**
- **npm** or **yarn**

### Clone the Repository
```sh
git clone https://github.com/Rohan-222/Url_shortner.git
cd Url_shortner
```

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure MySQL database (update `config/db.js` with your credentials).
4. Start the backend server:
   ```sh
   npm start
   ```
   The backend runs on `http://localhost:5000/`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend/url_shortner
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```
   The frontend runs on `http://localhost:3000/`.

## API Endpoints
### 1. Shorten a URL
**Endpoint:** `POST /api/shorten`
- **Request Body:**
  ```json
  {
    "originalUrl": "https://example.com"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "http://localhost:5000/abc123",
    "qrCode": "data:image/png;base64,...",
    "id": 1
  }
  ```

### 2. Redirect to Original URL
**Endpoint:** `GET /:shortUrl`

### 3. Fetch Analytics
**Endpoint:** `GET /api/analytics/all`

### 4. Delete a Shortened URL
**Endpoint:** `DELETE /api/analytics/:id`

## Database Schema
### `urls` Table
| Column        | Type        | Description |
|--------------|------------|-------------|
| id           | INT (PK)    | Unique identifier |
| original_url | TEXT        | Original long URL |
| short_url    | VARCHAR(10) | Generated short URL |
| clicks       | INT         | Number of clicks |
| country      | VARCHAR(50) | Country of access |
| qr_code      | TEXT        | QR code for the short URL |
| created_at   | TIMESTAMP   | Creation date |

### `clicks` Table
| Column      | Type       | Description |
|------------|-----------|-------------|
| id         | INT (PK)  | Unique identifier |
| url_id     | INT (FK)  | Reference to `urls` table |
| city       | VARCHAR(100) | City of access |
| country    | VARCHAR(100) | Country of access |
| device     | VARCHAR(50) | Device type |
| created_at | TIMESTAMP  | Click timestamp |

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to your branch: `git push origin feature-name`
5. Open a Pull Request.

## License
This project is open-source and available under the **MIT License**.

## Author
- **Rohan-222** ([GitHub](https://github.com/Rohan-222))



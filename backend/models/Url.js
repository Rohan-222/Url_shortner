const db = require('../config/db');

// ✅ Create tables if they don't exist
const createTables = async () => {
  const createUrlsTable = `
    CREATE TABLE IF NOT EXISTS urls (
      id INT AUTO_INCREMENT PRIMARY KEY,
      original_url TEXT NOT NULL,
      short_url VARCHAR(10) NOT NULL UNIQUE,
      clicks INT DEFAULT 0,
      country VARCHAR(50),
      qr_code TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createClicksTable = `
    CREATE TABLE IF NOT EXISTS clicks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      url_id INT NOT NULL,
      city VARCHAR(100),
      country VARCHAR(100),
      device VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (url_id) REFERENCES urls(id) ON DELETE CASCADE
    );
  `;

  try {
    await db.execute(createUrlsTable);
    await db.execute(createClicksTable);
    console.log('✅ Tables created');
  } catch (err) {
    console.error('❌ Error creating tables:', err);
  }
};

createTables();

// ✅ Insert URL into DB (with QR code)
const insertUrl = async (originalUrl, shortUrl, qrCode) => {
  const query = `
    INSERT INTO urls (original_url, short_url, clicks, country, qr_code) 
    VALUES (?, ?, 0, NULL, ?)
  `;
  const [result] = await db.execute(query, [originalUrl, shortUrl, qrCode]);
  return result.insertId; // ✅ Return the inserted ID
};

// ✅ Get original URL and update clicks & country
const getUrl = async (shortUrl, country) => {
  const updateQuery = `
    UPDATE urls 
    SET clicks = clicks + 1, country = ?
    WHERE short_url = ?
  `;
  await db.execute(updateQuery, [country, shortUrl]);

  const selectQuery = 'SELECT id, original_url FROM urls WHERE short_url = ?';
  const [rows] = await db.execute(selectQuery, [shortUrl]);
  return rows;
};

// ✅ Track click details (device, country, city, IP)
const trackClick = async (urlId, city, country, device) => {
  const query = `
    INSERT INTO clicks (url_id, city, country, device)
    VALUES (?, ?, ?, ?)
  `;
  await db.execute(query, [urlId, city, country, device]);
};

// ✅ Get analytics data (including QR code)
const getAnalytics = async () => {
  const query = `
    SELECT id, original_url, short_url, clicks, country, qr_code, created_at 
    FROM urls 
    ORDER BY created_at DESC
  `;
  const [rows] = await db.execute(query);
  return rows;
};

// ✅ Delete URL by ID
const deleteUrlById = async (id) => {
  const query = `DELETE FROM urls WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result;
};

module.exports = { insertUrl, getUrl, trackClick, getAnalytics, deleteUrlById };

const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');
const urlController = require('./controllers/urlController');

const app = express();

app.use(express.json());
app.use(cors()); // ✅ Allow cross-origin requests

// ✅ All endpoints under `/api`
app.use('/api', urlRoutes);

// ✅ Directly handle short URL redirection (fix)
app.get('/:shortUrl', urlController.redirectUrl);

// ✅ Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

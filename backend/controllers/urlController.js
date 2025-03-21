const { insertUrl, getUrl, trackClick, getAnalytics, deleteUrlById } = require('../models/Url');
const crypto = require('crypto');
const validUrl = require('valid-url');
const QRCode = require('qrcode');
const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');

// ✅ Create short URL
exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  const shortUrl = crypto.randomBytes(3).toString('hex');
  const fullShortUrl = `${req.protocol}://${req.get('host')}/${shortUrl}`;

  try {
    const qrCode = await QRCode.toDataURL(fullShortUrl);
    const urlId = await insertUrl(originalUrl, shortUrl, qrCode);

    console.log(`✅ Shortened URL created: ${fullShortUrl}`);
    res.status(201).json({ shortUrl: fullShortUrl, qrCode, id: urlId });
  } catch (qrError) {
    console.error('❌ Error generating QR Code:', qrError);
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
};

// ✅ Handle URL redirection and track clicks
exports.redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  // ✅ Get user IP and country using geoip
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const geo = geoip.lookup(ip);
  const country = geo ? geo.country : 'Unknown';
  const city = geo ? geo.city : 'Unknown';

  // ✅ Get user device using UAParser
  const parser = new UAParser();
  const device = parser.getResult().device.type || 'desktop';

  try {
    const rows = await getUrl(shortUrl, country);

    if (rows.length === 0) {
      console.log('❌ URL not found');
      return res.status(404).json({ error: 'URL not found' });
    }

    const urlId = rows[0].id;
    const originalUrl = rows[0].original_url;

    // ✅ Track click details
    await trackClick(urlId, city, country, device);

    console.log(`✅ Redirecting to: ${originalUrl}`);
    res.redirect(originalUrl);
  } catch (err) {
    console.error('❌ Error handling redirect:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get analytics
exports.getAnalytics = async (req, res) => {
  try {
    const results = await getAnalytics();
    console.log('✅ Analytics fetched:', results);
    res.status(200).json(results);
  } catch (err) {
    console.error('❌ Error fetching analytics:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

// ✅ Delete URL by ID
exports.deleteUrl = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteUrlById(id);

    if (result.affectedRows === 0) {
      console.log('❌ URL not found for deletion');
      return res.status(404).json({ error: 'URL not found' });
    }

    console.log(`✅ URL with ID ${id} deleted`);
    res.status(200).json({ message: 'URL deleted successfully' });
  } catch (err) {
    console.error('❌ Error deleting URL:', err);
    res.status(500).json({ error: 'Failed to delete URL' });
  }
};

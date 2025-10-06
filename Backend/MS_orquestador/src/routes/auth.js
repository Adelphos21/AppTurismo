const router = require('express').Router();
const axios = require('axios');

const AUTH_URL = process.env.AUTH_URL;

// Passthrough a /internal/auth/private
router.post('/private', async (req, res, next) => {
  try {
    const r = await axios.post(`${AUTH_URL}/internal/auth/private/`, null, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 5000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'auth';
    next(err);
  }
});

module.exports = router;

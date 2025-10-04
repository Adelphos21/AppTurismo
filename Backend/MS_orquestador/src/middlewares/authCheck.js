const axios = require('axios');

const AUTH_URL = process.env.AUTH_URL;

module.exports = async function authCheck(req, res, next) {
  try {
    const auth = req.headers['authorization'];
    if (!auth) return res.status(401).json({ error: { message: 'Missing Authorization header' } });

    // Delegar validación al MS de auth
    const r = await axios.get(`${AUTH_URL}/internal/auth/private`, {
      headers: { Authorization: auth },
      timeout: 5000
    });

    // Puedes inyectar claims al request si tu auth los regresa
    req.user = r.data?.user || null;
    next();
  } catch (err) {
    const status = err.response?.status || 401;
    return res.status(status).json({
      error: { message: 'Unauthorized', code: status, service: 'auth' }
    });
  }
};

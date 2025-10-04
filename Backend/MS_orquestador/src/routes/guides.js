const router = require('express').Router();
const axios = require('axios');
const authCheck = require('../middlewares/authCheck');
const { GuiaRequest, GuiaPutRequest } = require('../schemas/guides');

const GUIAS_URL = process.env.GUIAS_URL;

// Todas las rutas de guías requieren auth
router.use(authCheck);

// POST /internal/guides  (create)
router.post('/', async (req, res, next) => {
  try {
    const parsed = GuiaRequest.parse(req.body); // valida forma mínima
    const r = await axios.post(`${GUIAS_URL}/internal/guides`, parsed, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 8000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_guias';
    next(err);
  }
});

// GET /internal/guides/:id
router.get('/:id', async (req, res, next) => {
  try {
    const r = await axios.get(`${GUIAS_URL}/internal/guides/${req.params.id}`, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 5000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_guias';
    next(err);
  }
});

// GET /internal/guides/search?city&language&certification&date...
router.get('/', async (req, res, next) => {
  // si decides mapear /internal/guides?search=... cambia este handler
  next();
});
router.get('/search', async (req, res, next) => {
  try {
    const r = await axios.get(`${GUIAS_URL}/internal/guides/search`, {
      headers: { Authorization: req.headers['authorization'] || '' },
      params: req.query,
      timeout: 8000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_guias';
    next(err);
  }
});

// PUT /internal/guides/:id
router.put('/:id', async (req, res, next) => {
  try {
    const parsed = GuiaPutRequest.parse(req.body);
    const r = await axios.put(`${GUIAS_URL}/internal/guides/${req.params.id}`, parsed, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 8000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_guias';
    next(err);
  }
});

module.exports = router;

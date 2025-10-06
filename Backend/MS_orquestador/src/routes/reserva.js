
const router = require('express').Router();
const axios = require('axios');
const authCheck = require('../middlewares/authCheck');
const { ReservaRequest, EstadoRequest } = require('../schemas/reserva');

const RESERVAS_URL = process.env.RESERVAS_URL;

// Todas las rutas requieren autenticación
router.use(authCheck);

/**
 * POST /internal/reservas
 */
router.post('/', async (req, res, next) => {
  try {
    const parsed = ReservaRequest.parse(req.body);
    const r = await axios.post(`${RESERVAS_URL}`, parsed, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 8000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_reservas';
    next(err);
  }
});

/**
 * GET /internal/reservas/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const r = await axios.get(`${RESERVAS_URL}/${req.params.id}`, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 8000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_reservas';
    next(err);
  }
});

/**
 * PUT /internal/reservas/:id/confirmar
 */
router.put('/:id/confirmar', async (req, res, next) => {
  try {
    const parsed = EstadoRequest.parse(req.body);
    const r = await axios.put(`${RESERVAS_URL}/${req.params.id}/confirmar`, parsed, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 8000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_reservas';
    next(err);
  }
});

/**
 * PUT /internal/reservas/:id/cancelar
 */
router.put('/:id/cancelar', async (req, res, next) => {
  try {
    const parsed = EstadoRequest.parse(req.body);
    const r = await axios.put(`${RESERVAS_URL}/${req.params.id}/cancelar`, parsed, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 8000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_reservas';
    next(err);
  }
});

/**
 * GET /internal/reservas/usuario/:user_id
 */
router.get('/usuario/:user_id', async (req, res, next) => {
  try {
    const r = await axios.get(`${RESERVAS_URL}/usuario/${req.params.user_id}`, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 8000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_reservas';
    next(err);
  }
});

/**
 * GET /internal/reservas/guia/:guide_id
 */
router.get('/guia/:guide_id', async (req, res, next) => {
  try {
    const r = await axios.get(`${RESERVAS_URL}/guia/${req.params.guide_id}`, {
      headers: { Authorization: req.headers['authorization'] || '' },
      timeout: 8000
    });
    res.status(r.status).json(r.data);
  } catch (err) {
    err.service = 'ms_reservas';
    next(err);
  }
});

module.exports = router;

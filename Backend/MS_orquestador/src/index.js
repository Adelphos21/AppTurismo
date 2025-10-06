require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const guidesRoutes = require('./routes/guides');
const reservasRoutes = require('./routes/reserva');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');



const app = express();

// Seguridad y utilidades
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
const origins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true, credentials: true }));
app.use(morgan('dev'));

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'orchestrator', time: new Date().toISOString() });
});
//swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.get('/docs.json', (req, res) => res.json(swaggerSpec));
// Rutas
app.use('/auth', authRoutes);
app.use('/guides', guidesRoutes);
app.use('/reservas', reservasRoutes);

// Manejador de errores
app.use((err, req, res, next) => {
  const status = err.status || err.response?.status || 500;
  const message = err.message || err.response?.data || 'Internal error';
  res.status(status).json({
    error: {
      message: typeof message === 'string' ? message : 'Upstream error',
      code: status,
      service: err.service || 'orchestrator'
    }
  });
});

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`Orchestrator listening on :${port}`));
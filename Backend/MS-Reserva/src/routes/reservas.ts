import express from "express";
import { Reserva } from "../models/Reserva.js";

const router = express.Router();

/**
 * POST /internal/reservas
 * Crear una reserva (solo desde el orquestador)
 */
router.post("/internal/reservas", async (req, res) => {
  try {
    const { user_id, guide_id, fecha_servicio, duracion_horas, precio_total, comentario } = req.body;
    if (!user_id || !guide_id || !fecha_servicio || !duracion_horas || !precio_total) {
      return res.status(400).json({ error: "Campos obligatorios faltantes" });
    }

    const reserva = await Reserva.create({
      user_id,
      guide_id,
      fecha_reserva: new Date(),
      fecha_servicio,
      duracion_horas,
      precio_total,
      comentario,
      estado: "pendiente"
    });

    return res.status(201).json(reserva);
  } catch (err) {
    return res.status(500).json({ error: "Error al crear la reserva" });
  }
});

/**
 * GET /internal/reservas/:id
 * Obtener reserva por ID
 */
router.get("/internal/reservas/:id", async (req, res) => {
  const reserva = await Reserva.findById(req.params.id);
  if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
  return res.json(reserva);
});

/**
 * PUT /internal/reservas/:id/confirmar
 * Confirmar reserva (usado por el guía)
 */
router.put("/internal/reservas/:id/confirmar", async (req, res) => {
  const reserva = await Reserva.findById(req.params.id);
  if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
  reserva.estado = "confirmado";
  await reserva.save();
  return res.json(reserva);
});

/**
 * PUT /internal/reservas/:id/cancelar
 * Cancelar reserva
 */
router.put("/internal/reservas/:id/cancelar", async (req, res) => {
  const reserva = await Reserva.findById(req.params.id);
  if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
  reserva.estado = "cancelado";
  await reserva.save();
  return res.json(reserva);
});

/**
 * GET /internal/reservas/usuario/:user_id
 * Listar reservas de un usuario
 */
router.get("/internal/reservas/usuario/:user_id", async (req, res) => {
  const reservas = await Reserva.find({ user_id: req.params.user_id });
  return res.json(reservas);
});

/**
 * GET /internal/reservas/guia/:guide_id
 * Listar reservas de un guía
 */
router.get("/internal/reservas/guia/:guide_id", async (req, res) => {
  const reservas = await Reserva.find({ guide_id: req.params.guide_id });
  return res.json(reservas);
});

export default router;

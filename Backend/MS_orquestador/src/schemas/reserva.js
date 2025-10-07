const { z } = require('zod');

const EstadoReservaEnum = z.enum(["pendiente", "confirmado", "cancelado", "completado"]);

const ReservaRequest = z.object({
  user_id: z.string(),
  guide_id: z.string(),
  fecha_reserva: z.coerce.date(),     // ← convierte string a Date
  fecha_servicio: z.coerce.date(),    // ← convierte string a Date
  duracion_horas: z.number(),
  precio_total: z.number(),
  estado: EstadoReservaEnum.default("pendiente"),
  comentario: z.string().optional(),
  fecha_creacion: z.coerce.date().default(() => new Date())
}).passthrough();

const EstadoRequest = z.object({
  estado: EstadoReservaEnum
}).passthrough();

module.exports = { ReservaRequest, EstadoRequest };

const { z } = require('zod');
const { _enum } = require('zod/v4/core');


const EstadoReservaEnum = z.enum(["pendiente", "confirmado", "cancelado", "completado"]);

const ReservaRequest = z.object({
  user_id: z.string,
  guide_id: z.string,
  fecha_reserva: z.date,
  fecha_servicio: z.date,
  duracion_horas: z.number,
  precio_total: z.number,
  estado: EstadoReservaEnum.default("pendiente"),
  comentario: z.string().optional(),
  fecha_creacion: z.date().default(() => new Date)
}).passthrough(); // Desconocido: permitir objeto

const EstadoRequest = z.object({
  estado: EstadoReservaEnum
}).passthrough();


module.exports = { ReservaRequest, EstadoRequest };

const { z } = require('zod');

const GuiaIdiomaRequest = z.object({
  code: z.string().min(1).max(8),
  name: z.string().min(1).max(50)
}).passthrough(); // Desconocido: permitir objeto
const GuiaRequest = z.object({
  nombres: z.string().min(1),
  apellidos: z.string().min(1),
  dni: z.string().length(8),
  bio: z.string().min(1),
  city: z.string(),
  country: z.string(),
  certification: z.boolean(),
  languages: z.array(GuiaIdiomaRequest),
  correo: z.string().email()
}).passthrough();

const GuiaPutRequest = z.object({
  bio: z.string().optional(),
  languages: z.array(GuiaIdiomaRequest).optional(),
  city: z.string().optional()
}).passthrough();

module.exports = { GuiaRequest, GuiaPutRequest, GuiaIdiomaRequest };

import { Schema, model, Document } from "mongoose";

export interface IReserva extends Document {
  user_id: string;
  guide_id: string;
  fecha_reserva: Date;
  fecha_servicio: Date;
  duracion_horas: number;
  precio_total: number;
  estado: "pendiente" | "confirmado" | "cancelado" | "completado";
  comentario?: string;
  fecha_creacion: Date;
}

const ReservaSchema = new Schema<IReserva>({
  user_id: { type: String, required: true },
  guide_id: { type: String, required: true },
  fecha_reserva: { type: Date, default: Date.now },
  fecha_servicio: { type: Date, required: true },
  duracion_horas: { type: Number, required: true },
  precio_total: { type: Number, required: true },
  estado: { 
    type: String, 
    enum: ["pendiente", "confirmado", "cancelado", "completado"], 
    default: "pendiente" 
  },
  comentario: { type: String },
  fecha_creacion: { type: Date, default: Date.now }
});

export const Reserva = model<IReserva>("Reserva", ReservaSchema);

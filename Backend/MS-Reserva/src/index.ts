import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import reservasRoutes from "./routes/reservas.ts";

dotenv.config();

const app = express();
app.use(express.json());

// rutas internas
app.use(reservasRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

const port = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(port, () => console.log(`🧩 Servicio de Reservas escuchando en puerto ${port}`));
});

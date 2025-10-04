import express from "express";
import { Guide } from "../models/Guide.js";
import { AvailabilityHold } from "../models/AvailabilityHold.js";
import { toUTCDate } from "../utils/datetime.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// POST /api/guides/:id/availability/hold
router.post("/:id/availability/hold", requireAuth, async (req, res) => {
  // body: { date, startTime, endTime, holdMinutes }
  const { date, startTime, endTime, holdMinutes } = req.body;
  if (!date || !startTime || !endTime || !holdMinutes) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const guide = await Guide.findById(req.params.id);
  if (!guide) return res.status(404).json({ error: "Guide not found" });

  const start = toUTCDate(date, startTime);
  const end = toUTCDate(date, endTime);

  // compute heldUntil
  const heldUntil = new Date(Date.now() + Number(holdMinutes) * 60 * 1000);

  // create hold
  const hold = await AvailabilityHold.create({
    guideId: guide._id,
    userId: req.user!.id,
    startDateTime: start,
    endDateTime: end,
    heldUntil
  });

  return res.json({ ok: true, heldUntil: heldUntil.toISOString() });
});

export default router;

import express from "express";
import SkinIssue from "../models/SkinIssue.js";

const router = express.Router();

/* -------------------- GET ALL ISSUES -------------------- */
router.get("/", async (req, res) => {
  const issues = await SkinIssue.find({});
  res.json(issues);
});

/* -------------------- RECOMMEND DOCTOR BY SYMPTOM -------------------- */
router.post("/recommend", async (req, res) => {
  const { symptom } = req.body;

  if (!symptom) return res.status(400).json({ message: "Missing symptom" });

  const term = symptom.toLowerCase();
  const issues = await SkinIssue.find();

  let matchedIssue = null;

  for (let issue of issues) {
    if (issue.keywords.some(k => term.includes(k.toLowerCase()))) {
      matchedIssue = issue;
      break;
    }
  }

  if (!matchedIssue) return res.status(404).json({ message: "No match found" });

  res.json({
    condition: matchedIssue.condition,
    doctors: matchedIssue.doctors
  });
});

/* -------------------- FILTER DOCTORS BY LOCATION -------------------- */
router.post("/filter", async (req, res) => {
  const { symptom, location } = req.body;

  if (!symptom) return res.status(400).json({ message: "Missing symptom" });
  if (!location) return res.status(400).json({ message: "Missing location" });

  const term = symptom.toLowerCase();
  const issues = await SkinIssue.find();

  let matchedIssue = null;

  for (let issue of issues) {
    if (issue.keywords.some(k => term.includes(k.toLowerCase()))) {
      matchedIssue = issue;
      break;
    }
  }

  if (!matchedIssue) {
    return res.status(404).json({ message: "No condition found" });
  }

  // filter doctors by location (case-insensitive)
  const filteredDoctors = matchedIssue.doctors.filter(
    (doc) => doc.location.toLowerCase() === location.toLowerCase()
  );

  res.json({
    condition: matchedIssue.condition,
    doctors: filteredDoctors
  });
});

export default router;


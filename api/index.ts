import type { VercelRequest, VercelResponse } from "@vercel/node";
import express from "express";
import cors from "cors";
import { addUserToSheet } from "../src/googleSheet";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/test", (req, res) => {
  res.send("working");
});

app.post("/submit", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await addUserToSheet(name, email, phone);
    res.json({ message: "Saved to sheet" });
  } catch {
    res.status(500).json({ message: "Error saving data" });
  }
});

// ⭐ Vercel handler
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}
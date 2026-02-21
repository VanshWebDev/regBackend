import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { addUserToSheet } from "./googleSheet";

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

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

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
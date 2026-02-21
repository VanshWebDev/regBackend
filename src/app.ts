import express from "express";
import cors from "cors";
import { addUserToSheet } from "../src/googleSheet";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://glittery-sunflower-090fb9.netlify.app",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.options(/.*/, cors());

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

// app.listen(5000, ()=>{
//     console.log("app is listening on port 5000")
// })

export default app;
import express from "express";
import { addUserToSheet } from "../services/googleSheet";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/test", async (req, res) => {
  res.send("working");
});

app.post("/submit", async (req, res) => {
  try {
    console.log("body", req.body);
    const { name, email, phone } = req.body;

    await addUserToSheet(name, email, phone);

    res.json({ message: "Saved to sheet" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving data" });
  }
});

export default app;
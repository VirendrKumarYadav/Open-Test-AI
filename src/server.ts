import express from "express";
import cors from "cors";
import path from "node:path";

import { env } from "./config/env.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/health", (req, res) => {

  res.json({
    status: "UP",
    service: "OpenTestAI"
  });

});

app.use("/api/ai", aiRoutes);

app.listen(env.port, () => {

  console.log(
    `OpenTestAI running on http://localhost:${env.port}`
  );

});
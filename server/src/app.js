import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";

import routes from "./routes";

const app = express();

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  process.env.SERVER_URL,
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) >= 0 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../client/build")));

app.use("/api", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

app.use((error, req, res, next) => {
  const errorStatus = error.statusCode || 500;
  console.log(error);

  res.status(errorStatus).json({
    message: "Server Error",
    error,
  });
});

export default app;

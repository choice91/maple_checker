import "dotenv/config";
import "./db";
import app from "./app";
import { monthlyResetScheduler, weeklyResetScheduler } from "./scheduler";

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  weeklyResetScheduler.start();
  monthlyResetScheduler.start();
});

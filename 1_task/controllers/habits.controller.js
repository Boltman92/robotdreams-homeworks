import { offset, STATS_PERIOD } from "../constants/index.js";
import { showResponseAndExit } from "../helpers/index.js";
import {
  addHabit,
  showHabits,
  registerHabit,
  getStats,
  deleteHabit,
  updateHabit,
} from "../services/habits.service.js";

export async function handle(req) {
  if (req.method === "POST") {
    try {
      if (req.body?.id) {
        const response = await updateHabit(req.body);
        showResponseAndExit(response);
        return;
      }
      const response = await addHabit(req.body);
      showResponseAndExit(response);
    } catch (e) {
      console.log(e.message);
    }
  }

  if (req.method === "GET" && req.body?.stats) {
    try {
      const response = await getStats();
      const currentDate = Date.now() + offset;
      console.log(
        `stats for last ${STATS_PERIOD} days. current date is ${new Date(
          currentDate
        )} \n`
      );
      console.table(response);
      process.exit();
      return;
    } catch (e) {
      console.log(e.message);
    }
  }

  if (req.method === "GET") {
    try {
      const response = await showHabits();
      console.table(response);
      process.exit();
    } catch (e) {
      console.log(e.message);
    }
  }

  if (req.method === "PATCH") {
    try {
      const response = await registerHabit(req.body);
      showResponseAndExit(response);
    } catch (e) {
      console.log(e.message);
    }
  }

  if (req.method === "DELETE") {
    try {
      const response = await deleteHabit(req.body);
      showResponseAndExit(response);
    } catch (e) {
      console.log(e.message);
    }
  }
}

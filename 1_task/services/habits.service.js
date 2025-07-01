import { isSameMonth, isSameWeek } from "../helpers/index.js";
import * as repo from "../models/habit.model.js";
import {
  day,
  STATS_PERIOD,
  offset,
  supportedFrequencies,
} from "../constants/index.js";

export async function addHabit(body) {
  const nameIdentifier = body.indexOf("--name");
  const frequencyIdentifier = body.indexOf("--freq");
  if (nameIdentifier === -1 || frequencyIdentifier === -1) {
    return "wrong request, please use --name and --freq to add habit correctly";
  }
  const name = body[nameIdentifier + 1];
  const frequency = body[frequencyIdentifier + 1];
  if (!supportedFrequencies.includes(frequency)) {
    return "this frequency is not supported. Please, try again";
  }
  const existedHabits = await repo.getAll();
  const isHabitExist = existedHabits.find((hab) => hab.name === name);
  if (isHabitExist) {
    return "habit is already added";
  }
  if (name && frequency) {
    await repo.create({ name, frequency });
    return `${name} is successfully added`;
  } else {
    return "can not add habit";
  }
}

export async function updateHabit(body) {
  try {
    const nameIdentifier = body.args.indexOf("--name");
    const frequencyIdentifier = body.args.indexOf("--freq");
    const name = body.args[nameIdentifier + 1];
    const frequency = body.args[frequencyIdentifier + 1];
    await repo.update(body.id, {
      name: name,
      frequency: frequency,
    });
    return "habit is successfully updated";
  } catch (e) {
    console.log(e.message);
  }
}

export async function showHabits() {
  return repo.getAll();
}

export async function registerHabit(body) {
  try {
    const idIdentifier = body.indexOf("--id");
    const id = body[idIdentifier + 1];
    const allHabits = await repo.getAll();
    const selectedHabit = allHabits.find((habit) => habit.id === id);

    if (!selectedHabit) {
      return "wrong ID";
    }

    if (selectedHabit.hits) {
      await repo.update(id, {
        hits: [
          ...selectedHabit.hits,
          Date.now() + Number(process.env.OFFSET) * day,
        ],
      });
    } else {
      await repo.update(id, {
        hits: [Date.now() + Number(process.env.OFFSET) * day],
      });
    }
    return "habit marked as done";
  } catch (e) {
    return e.message;
  }
}

export async function getStats() {
  try {
    const allHabits = await repo.getAll();
    const today = new Date().setUTCHours(0, 0, 0, 0);
    const result = allHabits.map((habit) => {
      if (!Array.isArray(habit.hits) || habit.hits?.length === 0) {
        return {
          name: habit.name,
          completed: "0 %",
          frequency: habit.frequency,
        };
      }

      if (habit.frequency === "daily") {
        const uniqueHabits = new Set(
          habit.hits.map((hit) => new Date(hit).setUTCHours(0, 0, 0, 0))
        );
        let completedDays = 0;
        for (let i = 0; i <= STATS_PERIOD; i++) {
          const currentDay = today + offset - i * day;
          if (uniqueHabits.has(currentDay)) {
            completedDays += 1;
          }
        }
        return {
          name: habit.name,
          completed: `${(completedDays / STATS_PERIOD) * 100} %`,
          frequency: habit.frequency,
        };
      }

      if (habit.frequency === "weekly") {
        let completedWeeks = 0;
        for (let i = 0; i <= STATS_PERIOD; i = i + 7 * day) {
          const currentWeek = today + offset - i;
          if (isSameWeek(habit.hits, currentWeek)) {
            completedWeeks += 1;
          }
        }

        return {
          name: habit.name,
          completed: `${
            (completedWeeks / Math.floor(STATS_PERIOD / 7)) * 100
          } %`,
          frequency: habit.frequency,
        };
      }
      if (habit.frequency === "monthly") {
        let completedWeeks = 0;
        for (let i = 0; i <= STATS_PERIOD; i = i + 30 * day) {
          const currentWeek = today + offset - i;
          if (isSameMonth(habit.hits, currentWeek)) {
            completedWeeks += 1;
          }
        }

        return {
          name: habit.name,
          completed: `${
            (completedWeeks / Math.floor(STATS_PERIOD / 7)) * 100
          } %`,
          frequency: habit.frequency,
        };
      }
    });

    return result;
  } catch (e) {
    return e.message;
  }
}

export async function deleteHabit(body) {
  const idIdentifier = body.indexOf("--id");
  const id = body[idIdentifier + 1];

  const response = await repo.remove(id);

  return response
    ? "habit successfully deleted"
    : "cannot find habit with this ID";
}

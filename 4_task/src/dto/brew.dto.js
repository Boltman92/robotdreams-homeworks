import { z } from "zod";
import { registry } from "../openapi/registry.js";

export const BrewDTO = z.object({
  beans: z.string().min(3).max(40),
  method: z.literal(["v60", "aeropress", "chemex", "espresso"]),
  rating: z.number().gt(0).lt(6),
  notes: z.string().max(200),
  brewedAt: z.iso.date(),
});

/* реєструємо схему */
registry.register("Brew", BrewDTO);

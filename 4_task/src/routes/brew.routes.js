import { Router } from "express";
import { z } from "zod";
import { makeClassInvoker } from "awilix-express";

import { BrewController } from "../controllers/brew.controller.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { registry } from "../openapi/registry.js";
import { BrewDTO } from "../dto/brew.dto.js";
import { validateParams } from "../middlewares/validateParams.js";

const router = Router();
const ctl = makeClassInvoker(BrewController);

const paramsSchema = z.object({
  id: z.string().describe("Brew ID"),
});

router.get("/brew", ctl("index"));
registry.registerPath({
  method: "get",
  path: "/api/brew",
  tags: ["Brews"],
  responses: {
    200: {
      description: "Array of brews",
      content: { "application/json": { schema: z.array(BrewDTO) } },
    },
  },
});

router.get("/brew/:id", validateParams(paramsSchema), ctl("show"));
registry.registerPath({
  method: "get",
  path: "/api/brew/{id}",
  tags: ["Brews"],
  request: { params: paramsSchema }, // опис path-param
  responses: {
    200: {
      description: "Brew",
      content: { "application/json": { schema: BrewDTO } },
    },
    404: { description: "Brew not found" },
  },
});

router.post("/brew", validate(BrewDTO), asyncHandler(ctl("create")));
registry.registerPath({
  method: "post",
  path: "/api/brew",
  tags: ["Brews"],
  request: {
    body: {
      required: true,
      content: { "application/json": { schema: BrewDTO } },
    },
  },
  responses: {
    201: {
      description: "Created",
      content: { "application/json": { schema: BrewDTO } },
    },
    400: { description: "Validation error" },
  },
});

router.put(
  "/brew/:id",
  validateParams(paramsSchema),
  validate(BrewDTO),
  asyncHandler(ctl("update"))
);
registry.registerPath({
  method: "put",
  path: "/api/brew/{id}",
  tags: ["Brews"],
  request: {
    params: paramsSchema,
    body: {
      required: true,
      content: { "application/json": { schema: BrewDTO } },
    },
  },
  responses: {
    200: {
      description: "Updated brew",
      content: { "application/json": { schema: BrewDTO } },
    },
    400: { description: "Validation error" },
    404: { description: "Brew not found" },
  },
});

router.delete("/brew/:id", asyncHandler(ctl("remove")));
registry.registerPath({
  method: "delete",
  path: "/api/brew/{id}",
  tags: ["Brews"],
  request: { params: paramsSchema },
  responses: {
    204: { description: "Deleted" },
    404: { description: "Brew not found" },
  },
});

export { router };

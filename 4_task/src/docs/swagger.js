import swaggerJSDoc from "swagger-jsdoc";
import { config } from "../config/index.js";

export const jsdocSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: { title: config.appName, version: "1.0.0" },
  },
  apis: ["./routes/**/*.js"],
});

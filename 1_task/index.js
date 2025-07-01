import { argv } from "process";

import { Router } from "./router/index.js";

const command = argv[2];
const other = argv.slice(3);

const router = new Router(command, other);

router.handleRoute();


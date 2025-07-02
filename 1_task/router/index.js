import { handle } from "../controllers/habits.controller.js";


export class Router {
  constructor(command, instructions) {
    this.command = command;
    this.instructions = instructions;
  }

  handleRoute() {
    if (this.command === "add") {
      return this.add();
    }
    if (this.command === "list") {
      return this.showAll();
    }
    if (this.command === "done") {
      return this.done();
    }
    if (this.command === "stats") {
      return this.stats();
    }
    if (this.command === "delete") {
      return this.delete();
    }
    if (this.command === "update") {
      return this.update();
    }

    return "command does not supported";
  }

  add() {
    const req = { method: "POST", body: this.instructions };
    return handle(req);
  }

  showAll() {
    const req = { method: "GET" };
    return handle(req);
  }

  done() {
    const req = { method: "PATCH", body: this.instructions };
    return handle(req);
  }

  stats() {
    const req = { method: "GET", body: { stats: true } };
    return handle(req);
  }

  delete() {
    const req = { method: "DELETE", body: this.instructions };
    return handle(req);
  }

  update() {
    const req = {
      method: "POST",
      body: { id: this.instructions[1], args: this.instructions },
    };
    return handle(req);
  }
}

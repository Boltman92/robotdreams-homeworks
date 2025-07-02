import { createUser, getAllUsers } from "../../controllers/users.controller.js";

export function GET(req, res) {
  return getAllUsers(req, res);
}

export function POST(req, res) {
  return createUser(req, res);
}

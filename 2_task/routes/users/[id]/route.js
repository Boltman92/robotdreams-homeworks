import {
  getUserById,
  updateUser,
  deleteUser,
} from "../../../controllers/users.controller.js";

export function GET(req, res, id) {
  return getUserById(req, res, id);
}

export function PUT(req, res, id) {
  return updateUser(req, res, id);
}

export function DELETE(req, res, id) {
  return deleteUser(req, res, id);
}

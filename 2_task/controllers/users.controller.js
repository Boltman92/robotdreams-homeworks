import {
  showUsers,
  showUserById,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
} from "../services/users.service.js";
import { json, bodyJSON } from "../helpers/index.js";

export async function getAllUsers(req, res) {
  try {
    const response = await showUsers();
    json(res, 200, response);
  } catch {
    json(res, 500, "something went wrong..");
  }
}

export async function createUser(req, res) {
  try {
    const body = await bodyJSON(req);
    const response = await createUserService(body);
    json(res, 200, response);
  } catch (e) {
    json(res, 500, `error while creating user: ${e.message}`);
  }
}

export async function getUserById(req, res, id) {
  try {
    const response = await showUserById(id);
    json(res, 200, response);
  } catch {
    json(res, 404, "user not found");
  }
}

export async function updateUser(req, res, id) {
  try {
    const response = await updateUserService(id);
    json(res, 200, response);
  } catch (e) {
    json(res, 400, `can not update user, ${e.message}`);
  }
}

export async function deleteUser(req, res, id) {
  try {
    const response = await deleteUserService(id);
    if (response) {
      json(res, 200, "user successfully deleted");
    }
  } catch (e) {
    json(res, 400, `can not delete user, ${e.message}`);
  }
}

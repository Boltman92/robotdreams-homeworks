import { httpMethods, USERS_ROUTE } from "../constants/index.js";
import { json } from "../helpers/index.js";
import { GET as getUsers, POST as createUser } from "../routes/users/route.js";
import {
  GET as getUserById,
  PUT as updateUser,
  DELETE as deleteUser,
} from "../routes/users/[id]/route.js";

export function router(req, res) {
  const [, resource, id] = req.url.split("/");
  if (!httpMethods.includes(req.method)) {
    json(res, 405, "this method is not supported");
  }

  if (req.method === "GET") {
    if (resource === USERS_ROUTE && id) {
      return getUserById(req, res, id);
    }
    if (resource === USERS_ROUTE) {
      return getUsers(req, res);
    }

    json(res, 400, "not supported url, try /users");
  }

  if (req.method === "POST") {
    if (resource === USERS_ROUTE && id) {
      json(res, 400, "wrong url");
    }

    return createUser(req, res);
  }

  if (req.method === "PUT") {
    if (resource === USERS_ROUTE && id) {
      return updateUser(req, res, id);
    }

    json(res, 400, "wrong url");
  }

  if (req.method === "DELETE") {
    if (resource === USERS_ROUTE && id) {
      return deleteUser(req, res, id);
    }

    json(res, 400, "wrong url");
  }
}

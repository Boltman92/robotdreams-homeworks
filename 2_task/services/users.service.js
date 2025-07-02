import * as repo from "../models/users.model.js";

export async function showUsers() {
  return repo.getAll();
}

export async function showUserById(id) {
  const response = await repo.getById(id);
  if (!response) {
    throw new Error("user not found");
  }

  return response;
}

export async function createUser(data) {
  await repo.create(data);
  return "user created";
}

export async function updateUser(id) {
  const response = await repo.update(Number(id));
  if (!response) {
    throw new Error("user not found");
  }

  return response;
}

export async function deleteUser(id) {
  const response = await repo.remove(Number(id));
  if (!response) {
    throw new Error("user not found");
  }

  return response;
}

import { ApplicationError } from "../../libs/error.js";
import * as Types from "../../libs/types/common.js";
import * as userService from "../services/user.js";

/**
 * Get all users
 *
 * @type {Types.AuthorizedController}
 * @returns {void}
 */
export async function getAllUsers(req, res) {
  try {
    const data = await userService.getAllUsers();
    res.status(200).json({ data });
    return;
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Get all users where the role is instructor
 * @type {Types.Controller}
 * @returns {void}
 */
export async function getAllInstructor(req, res) {
  try {
    const data = await userService.getAllInstructor();
    res.status(200).json({ data });
    return;
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * @type {Types.AuthorizedController}
 * @returns {void}
 */
export async function getAllStudentsAndInstructor(req, res) {
  try {
    const users = await userService.getAllStudentsAndInstructor();
    res.status(200).json(users);
    return;
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Deactivate user's account
 *
 * @type {Types.Controller}
 * @returns {void}
 */
export async function deactiveUser(req, res) {
  try {
    const { id } = req.params;
    await userService.deactiveUser(id);
    res.status(204).json({ message: "User deactivated successfully" });
    return;
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Delete user's account
 * @type {Types.Controller}
 * @returns {void}
 */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.status(204).json({ message: "User deleted successfully" });
    return;
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

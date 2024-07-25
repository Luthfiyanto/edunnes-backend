import { ApplicationError } from "../../libs/error.js";
import { isAuthorized } from "../middlewares/auth.js";
import * as classService from "../services/classes.js";
import * as Types from "../../libs/types/common.js";

/**
 * Register the class by user which need verification by admin then
 *
 * @type {Types.Controller<typeof isAuthorized>}
 * @returns {void}
 */
export async function register(req, res) {
  try {
    const user_id = /** @type {string} */ (res.locals.user?.id);
    const { class_id } = req.body;

    const data = await classService.registerClass(user_id, class_id);
    res.status(201).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}

/**
 * Get all class register data which the status is non-active
 *
 * @type {Types.Controller}
 * @returns {void}
 */
export async function getAllUnActiveClassesStatus(req, res) {
  try {
    const data = await classService.getAllUnActiveClassesStatus();
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Activate the registered class
 *
 * @type {Types.Controller}
 * @returns {void}
 */
export async function activateClassStatus(req, res) {
  try {
    const { id } = req.body;
    await classService.activateClassStatus(id);
    res.status(200).json({ message: "Class status has been activated" });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Get all classes
 *
 * @type {Types.Controller}
 * @returns {void}
 */
export async function getClasses(req, res) {
  try {
    const data = await classService.getClasses();
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}

/**
 * Get a class by id
 *
 * @type {Types.Controller}
 * @returns {void}
 */
export async function getClassById(req, res) {
  try {
    const { id } = req.params;
    const data = await classService.getClassById(id);
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}

/**
 * Get all classes which were registered for user
 *
 * @type {Types.AuthorizedController}
 * @returns {void}
 */
export async function getUserClasses(req, res) {
  try {
    const { id } = res.locals.user;
    const data = await classService.getUserClasses(id);
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
}

/**
 * Create new class
 *
 * @type {Types.Controller<typeof isAuthorized>}
 * @returns {void}
 */
export async function createClass(req, res) {
  try {
    const payload = req.body;
    const data = await classService.createClass(payload);
    res.status(201).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Update data class
 * @type {Types.Controller}
 * @return {void}
 */
export async function updateClass(req, res) {
  try {
    const payload = req.body;
    const { id } = req.params;
    const data = await classService.updateClass(id, payload);
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Delete a class
 * @type {Types.Controller}
 * @return {void}
 */
export async function deleteClass(req, res) {
  try {
    const { id } = req.params;
    const data = await classService.deleteClass(id);
    res.status(200).json({ message: "Class has been deleted" });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
}

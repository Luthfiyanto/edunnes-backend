import * as courseService from "../services/course.js";
import * as Types from "../../libs/types/common.js";
import { isLoggedIn } from "../middlewares/auth.js";
import { uploadCloudinary } from "../middlewares/upload.js";
import { ApplicationError } from "../../libs/error.js";

/**
 * Get course in general
 * (differentiated based on access rights to detailed data course)
 *
 * @type {Types.Controller<typeof isLoggedIn>}
 * @returns {Promise<void>}
 */
export async function getCourses(req, res) {
  try {
    const params = req.query;
    const user = res.locals.user;
    const role = user?.role;

    const isAdmin = role === "ADMIN" || role === "INSTRUCTOR";
    const data = await courseService.getCourses(params, isAdmin);

    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Get course by id which will return the detail data course include chapter, material, and quiz
 *
 * @type {Types.Controller<typeof isLoggedIn>}
 * @returns {Promise<void>}
 */
export async function getCourseById(req, res) {
  try {
    const { id } = req.params;
    const userId = res.locals.user ? res.locals.user.id : null;
    const data = await courseService.getCourseById(id, userId);
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Get all course which has been enrolled by user
 *
 * @type {Types.AuthorizedController}
 * @returns {Promise<void>}
 */
export async function getUserCourses(req, res) {
  try {
    const { id } = res.locals.user;
    const params = req.query;
    const data = await courseService.getUserCourses(id, params);
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Create new course
 *
 * @type {Types.AuthorizedController<typeof uploadCloudinary>}
 * @returns {Promise<void>}
 */
export async function createCourse(req, res) {
  const { body } = req;

  const { id: userId } = res.locals.user;

  const image = res.locals.image;
  try {
    const bodyWithImage = { ...body, image: image };

    const course = await courseService.createCourse(bodyWithImage, userId);

    res.status(201).json({ message: "Course created successfully", data: course });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Update existing course
 *
 * @type {Types.AuthorizedController<typeof uploadCloudinary>}
 * @returns {Promise<void>}
 */
export async function updateCourse(req, res) {
  const { body } = req;
  const { id } = req.params;

  const image = res.locals.image;

  const bodyWithImage = { ...body, image: image };

  try {
    const course = await courseService.updateCourse(bodyWithImage, id);

    res.status(200).json({ message: "Course updated successfully", data: course });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Delete a course
 * @type {Types.AuthorizedController}
 * @returns {Promise<void>}
 */
export async function destroyCourse(req, res) {
  const { id } = req.params;

  try {
    await courseService.destroyCourse(id);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
  }
}

/**
 * Get a course with detailed data include chapter, material, content, quiz, and question
 * It used to help admin during change the existing data to update course
 *
 * @type {Types.AuthorizedController}
 * @returns {Promise<void>}
 */
export async function getCoursePreviewData(req, res) {
  try {
    const { id } = req.params;
    const data = await courseService.getCourseByIdToPreview(id);
    res.status(200).json({ data });
  } catch (err) {
    if (err instanceof ApplicationError) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

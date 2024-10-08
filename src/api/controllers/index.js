import { PUBLIC_URL } from "../../libs/env.js";
import * as Types from "../../libs/types/common.js";

/**
 * Checking API connection
 *
 * @type {Types.Controller}
 * @returns {void}
 */

export function ping(_req, res) {
  res.status(200).json({
    message: "pong",
  });
}

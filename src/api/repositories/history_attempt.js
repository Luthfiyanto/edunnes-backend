import { HistoryAttempt, Quiz, QuizQuestion, QuizSubmission } from "../models/index.js";
import * as Models from "../models/historyattempt.js";

/** @param {Partial<Models.HistoryAttemptAttributes>} payload */
export function createHistoryAttempt(payload) {
  return HistoryAttempt.create(payload);
}

/**
 * @param {Partial<Models.HistoryAttemptAttributes>} payload
 * @param {string} attemptId
 */
export function updateHistoryAttempt(payload, attemptId) {
  return HistoryAttempt.update(payload, {
    where: { id: attemptId },
  });
}

/**
 * @param {string} quizId
 * @param {string} user_id
 */
export function getHistoryAttemptsByQuizId(quizId, user_id) {
  return HistoryAttempt.findAll({
    where: { quiz_id: quizId, user_id },
    order: [["attempted_at", "DESC"]],
  });
}

/** @param {string} id */
export function getHistoryAttemptsById(id) {
  return HistoryAttempt.findByPk(id, {
    include: {
      model: Quiz,
      as: "quiz",
    },
  });
}

/** @param {string} attempt_id*/
export function getSummaryQuiz(attempt_id) {
  return HistoryAttempt.findByPk(attempt_id, {
    include: [
      {
        model: Quiz,
        as: "quiz",
        include: [
          {
            model: QuizQuestion,
            as: "quiz_question",
            include: [
              {
                model: QuizSubmission,
                as: "my_answer",
              },
            ],
          },
        ],
      },
    ],
    order: [["quiz", "order_index", "ASC"]],
  });
}

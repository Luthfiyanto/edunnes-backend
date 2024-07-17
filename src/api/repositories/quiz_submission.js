import { QuizQuestion, QuizSubmission } from "../models/index.js";
import * as Models from "../models/quiz-submission.js";

/** @param {Models.QuizSubmissionAttributes} payload */
export function createQuizSubmission(payload) {
  return QuizSubmission.create(payload);
}

/** @param {string} attempt_id */
export function getMyAnswerWithoutSummary(attempt_id) {
  return QuizSubmission.findAll({
    where: { attempt_id },
    include: [
      {
        model: QuizQuestion,
        as: "question",
      },
    ],
  });
}

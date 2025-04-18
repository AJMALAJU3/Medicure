import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { isUser } from "../middleware/isUser";
import { FeedbackRepository } from "../repositories/implementations/feedbackRepository";
import { FeedbackService } from "../services/implementations/feedbackServices";
import { FeedbackController } from "../controllers/feedbackController";
import { DoctorRepository } from "../repositories/implementations/doctorRepository";
import { isDoctor } from "../middleware/isDoctor";

const router = Router();

const feedbackRepository = new FeedbackRepository();
const doctorRepository = new DoctorRepository();
const feedbackService = new FeedbackService(
  feedbackRepository,
  doctorRepository
);
const feedbackController = new FeedbackController(feedbackService);

router.post(
  "/submit-feedback",
  tokenMiddleware,
  isUser,
  feedbackController.handleFeedbackSubmission
);
router.get(
  "/fetch-feedback/user",
  tokenMiddleware,
  isUser,
  feedbackController.getFeedbackByUser
);
router.get(
  "/fetch-feedback/doctor",
  tokenMiddleware,
  isDoctor,
  feedbackController.getFeedbackForDoctor
);

export default router;

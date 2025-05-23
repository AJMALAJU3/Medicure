import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { env } from "../config/env";

const router = Router();
const authController = new AuthController();

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: false,
    secure:  env.NODE_ENV === "production",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure:  env.NODE_ENV === "production",
  });
  res.send("Cookie deleted");
});

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp-register", authController.verifyOTPAndRegister);
router.post("/verify-otp", authController.verifyOTP);
router.post("/change-password", authController.changePassword);
router.post("/google-auth", authController.googleAuth);

router.get("/user-info", tokenMiddleware, authController.userInfo);
export default router;

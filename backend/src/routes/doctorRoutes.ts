import { Router } from 'express';
import { tokenMiddleware } from '../middleware/tokenMiddleware';
import { DoctorController } from '../controllers/doctorController';
import { SlotController } from '../controllers/slotController';

const router = Router();
const doctorController = new DoctorController()
const slotController = new SlotController()

//profile verification
router.get('/profile-details', tokenMiddleware, doctorController.getProfileVerificationDetails)
router.get('/verification-proofs', tokenMiddleware, doctorController.getProofVerificationDetails)
router.patch('/profile-details', tokenMiddleware, doctorController.profileVerification)
router.patch('/verification-proofs', tokenMiddleware, doctorController.verificationProofs)
router.post('/submit-verification', tokenMiddleware, doctorController.submitDoctorVerification)

//slots
router.get('/slots', tokenMiddleware, slotController.getSlots)
router.put('/slots', tokenMiddleware, slotController.manageSlots);



export default router;
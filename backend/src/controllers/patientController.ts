import { NextFunction, Request, Response } from "express";
import { IPatientServices } from "../services/interfaces/IPatientServices";

export class PatientController {
  private patientServices: IPatientServices;

  constructor(patientServices: IPatientServices) {
    this.patientServices = patientServices;
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.updateProfileImg = this.updateProfileImg.bind(this);
    this.getTopDoctors = this.getTopDoctors.bind(this);
  }

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { _id: patientId } = req.client;
    try {
      const patientData = await this.patientServices.getProfile(patientId);
      res.status(200).json({ patientData });
    } catch (error: unknown) {
      next(error);
    }
  }

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { _id: patientId } = req.client;
    const {
      dob,
      gender,
      bloodGroup,
      houseName,
      street,
      city,
      state,
      country,
      pincode,
    } = req.body;
    try {
      await this.patientServices.updateProfile({
        patientId,
        dob,
        gender,
        bloodGroup,
        houseName,
        street,
        city,
        state,
        country,
        pincode,
      });
      res.status(200).json({ message: "Profile updated successfully" });
    } catch (error: unknown) {
      next(error);
    }
  }

  async updateProfileImg(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { _id: patientId } = req.client;
    const { profileImage } = req.body;

    try {
      if (!profileImage) {
        res.status(400).json({ message: "Profile image is required." });
        return;
      }
      await this.patientServices.updateProfileImg(patientId, profileImage);
      res.status(200).json({ message: "Profile image updated successfully." });
    } catch (error) {
      next(error);
    }
  }

  async getTopDoctors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 5;
      const specialization = (req.query.specialization as string) || null;
      const search = (req.query.search as string) || null;
      const sort = (req.query.sort as string) || "rating";
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
      const languageSpoken = (req.query.languageSpoken as string) || null;
      const yearsOfExperience = req.query.yearsOfExperience
        ? parseInt(req.query.yearsOfExperience as string)
        : null;

      const { data, total } = await this.patientServices.getTopDoctors(
        skip,
        limit,
        specialization,
        search,
        sort,
        sortOrder,
        languageSpoken,
        yearsOfExperience
      );

      res.status(200).json({
        success: true,
        data,
        total,
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}

import { Request, Response } from 'express';
import { AuthService } from "../services/authServices";

const authService = new AuthService();

export class AuthController {
    async checkRequest (req: Request, res: Response) {
        try {
            console.log('success', req.body)
            res.status(201)
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    async signUp(req: Request, res: Response) {
        const { name, email, mobile, password, role } = req.body;
        try {
            const message = await authService.signUp(name, email, mobile, password, role);
            console.log('success', message)
            res.status(201).json({ message })
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async signIn(req: Request, res: Response) {
        const { email, password, role } = req.body
        try {
            const { accessToken, refreshToken } = await authService.signIn(email, password, role)
            if (accessToken) {
                res.cookie('accessToken', accessToken, {
                    httpOnly: false,
                    maxAge: 15 * 60 * 1000,
                    secure: process.env.NODE_ENV === 'production',
                });
            }
            if (refreshToken) {
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === 'production',
                });
            }
            res.status(200).json({
                message: 'User sign in successfully.',
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    async changePassword(req: Request, res: Response) {
        try {
            const { email, password, role } = req.body
            if (!email || !password ) {
                res.status(400).json({ error: 'Email and password are required.' });
            }
            const status = await authService.changePassword(email, password, role)
            if (status) {
                res.status(200).json({ message: 'Password changed successfully.' });
            } else {
                res.status(404).json({ error: 'User not found or unable to change password.' });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    async userInfo(req: Request, res: Response) {
        try {
            const { email, role, isApproved } = req.client
            console.log({ email, role,isApproved }, 'cli')
            res.status(200).json({ email, role, isApproved })
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }


    async sendOTP(req: Request, res: Response) {
        const { email } = req.body;
        try {
            console.log(email, 'email')
            await authService.sendOTP(email);
            res.status(200).json({ message: 'OTP sended successfully' });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async verifyOTPAndRegister(req: Request, res: Response) {
        try {
            console.log('Received OTP request:', req.body);
            const { email, otp } = req.body;
            const { accessToken, refreshToken } = await authService.verifyOTPAndRegister(email, otp);
            if (accessToken) {
                res.cookie('accessToken', accessToken, {
                    httpOnly: false,
                    maxAge: 15 * 60 * 1000,
                    secure: process.env.NODE_ENV === 'production',
                });
            }
            if (refreshToken) {
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    secure: process.env.NODE_ENV === 'production',
                });
            }
            res.status(200).json({
                message: 'OTP verified successfully. Tokens issued.',
            });
        } catch (error: any) {
            console.error('Error verifying OTP:', error.message);
            res.status(400).json({
                error: error.message || 'An unexpected error occurred. Please try again later.',
            });
        }
    }

    async verifyOTP(req: Request, res: Response) {
        try {
            console.log('Received OTP request:', req.body);
            const { email, otp } = req.body;
            const message = await authService.verifyOTP(email, otp)
            if (message) {
                res.status(200).json({
                    message: 'OTP verified successfully. Change password',
                });
            }

        } catch (error: any) {
            console.error('Error verifying OTP:', error.message);
            res.status(400).json({
                error: error.message || 'An unexpected error occurred. Please try again later.',
            });
        }
    }

}

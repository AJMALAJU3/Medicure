import { Request, Response, NextFunction  } from "express";
import { producer } from "../utils/kafkaUtil";
import { IMessageServices } from "../services/interfaces/IMessageServices";
import mongoose from "mongoose";

export class MessageController {
    private messageServices: IMessageServices;

    constructor(messageServices: IMessageServices) {
        this.messageServices = messageServices;

        this.createMessage = this.createMessage.bind(this)
        this.getMessagesByChatId = this.getMessagesByChatId.bind(this)
        this.updateMessage = this.updateMessage.bind(this)
        this.deleteMessage = this.deleteMessage.bind(this)
        this.markMessageAsSeen = this.markMessageAsSeen.bind(this)
    }

    async createMessage(req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const {_id: userId} = req.client
            await this.messageServices.createMessage(req.body, userId)
            res.status(200).json({message: "Message sent!"});
        } catch (error: unknown) {
            next(error)
        }
    }

    async getMessagesByChatId(req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const { chatId } = req.params;
            const messages = await this.messageServices.getMessagesByChatId({ chatId: new mongoose.Types.ObjectId(chatId) });
            res.status(200).json(messages);
        } catch (error) {
            next(error)
        }
    }

    async updateMessage(req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const { messageId } = req.params;
            const updatedMessage = await this.messageServices.updateMessage({messageId, data: req.body});
            if (!updatedMessage) {
                res.status(404).json({ error: "Message not found" });
                return;
            }
            res.status(200).json(updatedMessage);
        } catch (error: unknown) {
            next(error)
        }
    }

    async deleteMessage(req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const { messageId } = req.params;
            await this.messageServices.deleteMessage({ messageId });
            res.status(200).json({ message: "Message deleted successfully" });
        } catch (error: unknown) {
            next(error)
        }
    }

    async markMessageAsSeen(req: Request, res: Response, next: NextFunction ): Promise<void> {
        try {
            const { messageId } = req.params;
            const { userId } = req.body;
            const updatedMessage = await this.messageServices.markMessageAsSeen({messageId, userId});
            if (!updatedMessage) {
                res.status(404).json({ error: "Message not found" });
                return;
            }
            res.status(200).json(updatedMessage);
        } catch (error: unknown) {
            next(error)
        }
    }
}




export interface Message {
    id?: string;
    text: string;
    sender: 'me' | 'other';
    timestamp?: Date;
}

export interface IChat {
    participants: { _id: string, profileImage: string, fullName: string }[],
    _id: string,
    groupName: string;
    lastMessage: { content: string };
    unreadMessages: Record<string, number>;
    messages: Message[]
    isGroup: boolean;
}

export interface ChatContextType {
    chats: IChat[];
    addMessage: (message: IMessage) => void;
    selectedChat: { chatId: string, messages: IMessage[] } | null;
    selectChat: (chatId: string) => void;
}

export type IMessage = {
    _id: string;
    chatId: string;
    senderId: string;
    content: string;
    messageType: "text" | "image" | "video" | "audio" | "file";
    mediaUrl: string;
    seenBy: string[];
    timestamp: Date;
    edited: boolean;
    deleted: boolean;
}
import io from "socket.io-client";
import store from '../store/store';
import { setCanditates, setRoomId } from '../store/slices/commonSlices/videoConsultSlice';
import { ICandidate } from '../store/slices/commonSlices/videoConsultSlice'
import { handleSignalData, prepareNewPeerConnection } from './webrtc';
import { ConsultingData, setConsultRinging, setError } from '../store/slices/commonSlices/notificationSlice';
import { Socket } from "socket.io-client";
import { addMessage, trigger } from "../store/slices/commonSlices/chatSlice";
import { IMessage } from "../types/chat/ChatType";
import { ENV } from "../constants/env";

const SERVER: string = ENV.API_URL;
export let socket: any = null;


export const connectWithSocketIOServer = (candidateId: string) => {
    socket = io(SERVER);

    socket.on('connect', () => {
        console.log('User connected with socket, ID:', socket.id)
        socket.emit('register-user', { candidateId });
    })

    socket.on('room-id', ({ roomId }: { roomId: string }) => {
        store.dispatch(setRoomId(roomId))
    })

    socket.on('update-room', (canditates: { candidates: ICandidate[] }) => {
        store.dispatch(setCanditates(canditates))
    })

    socket.on('conn-prepare', ({ socketId }: { socketId: string }) => {
        prepareNewPeerConnection(socketId, false)
        socket.emit('conn-init', { socketId })
    })

    socket.on('conn-init', ({ socketId }: { socketId: string }) => {
        prepareNewPeerConnection(socketId, true)
    })

    socket.on('conn-signal', (data: { socketId: string, signal: any }) => {
        handleSignalData(data)
    })
    

    socket.on('notification', ({ slotId, _id, roomId }: ConsultingData) => {
        console.log({ slotId, _id, roomId })
        store.dispatch(setConsultRinging({ slotId, _id, roomId }))
    })

    socket.on("newMessage", (message: IMessage) => {
        const userId = store.getState().auth._id;
        console.log("📩 New message received:", message);
        userId !== message.senderId && store.dispatch(addMessage(message))
    });

    socket.on('inc-count', (()  => {
        store.dispatch(trigger())
    }))
}

export const createNewRoom = (candidateId: string, roomId: string) => {
    if (!socket) {
        store.dispatch(setError(`Socket not initialized. Cannot create room.`))
        return;
    }
    socket.emit('create-new-room', { candidateId, roomId });
};

export const joinRoom = (candidateId: string, roomId: string) => {
    if (!socket) {
        store.dispatch(setError(`Socket not initialized. Cannot create room.`))
        return
    }
    socket.emit('join-room', { candidateId, roomId })
}

export const signalPeerData = (data: { signal: any, socketId: string }) => {
    if (!socket) {
        store.dispatch(setError(`Socket not initialized. Cannot create room.`))
        return
    }
    console.log('problem ficese')
    socket.emit('conn-signal', data)
}

export const sendNotification = async (patientId: string, { slotId, _id, roomId }: ConsultingData) => {
    if (socket) {
        socket.emit('send-notification', { patientId, consultingData: { slotId, _id, roomId } });
    } else {
        console.log(`User ${patientId} is offline, store the message`);
    }
};

export const getSocket = (): typeof Socket => {
    if (!socket) throw new Error("Socket is not initialized!");
    return socket;
};

export const joinChat = (chatId: string) => {
    getSocket().emit("joinChat", chatId);
};

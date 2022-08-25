import {WebSocket} from 'ws'

export interface IUser {
    uuid: string
    name: string
    connectedRooms: string[]
}

export interface IRoom {
    title: string
    roomId: string
    creator: IUser['uuid']
    userCount: number
    connectedUsers: IUser['uuid'][]
}

export interface IRooms extends Array<IRoom> {}

export interface IChat {
    senderUuid: IUser['uuid']
    senderName: IUser['name']
    sendTime: number
    sendRoom: IRoom['title']
    sendRoomId: IRoom['roomId']
}

export interface WebSocket_uuid extends WebSocket {
    _uuid: string;
}

export const enum ServerMessageType {
    connected = 'connected',
    enterRoom = 'enterRoom',
    leaveRoom = 'leaveRoom',
    userSendMessage = 'userSendMessage',
    botSendMessage = 'botSendMessage'
}

export const enum ClientMessageType {
    connected = 'connected',
    enterRoom = 'enterRoom',
    leaveRoom = 'leaveRoom',
    sendMessage = 'sendMessage'
}
export interface IPacket {
    type: ServerMessageType | ClientMessageType 
    senderId: IUser['uuid'] | WebSocket_uuid
    userName?: IUser['name']
    data?: any
}


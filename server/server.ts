import {WebSocketServer} from 'ws'
import Caver, { TransactionForRPC } from 'caver-js';
import { v4 as uuidv4 } from 'uuid';
import {Server} from 'http'
import {
  IUser,IRoom,IChat,IRooms, WebSocket_uuid, IPacket, ClientMessageType, ServerMessageType
} from './src/interfaces'


const cypressWSEN = 'wss://public-node-api.klaytnapi.com/v1/cypress/ws';
const baobabWSEN = 'wss://api.baobab.klaytn.net:8652';


class WebSocketServerModel {
  private readonly wss :WebSocketServer;
  // public rooms: IRooms;

    constructor(option: {server:Server}) {
      this.wss = new WebSocketServer({server: option.server});

      this.initServerEventHandler();
    }


    private initServerEventHandler = () =>{
      this.wss.on('connection', (ws:WebSocket_uuid) => {
        ws['_uuid'] = uuidv4();
        

        const user:IUser = {
          uuid: ws['_uuid'],
          name: '무제',
          connectedRooms: []

        }
        
        const _packet: IPacket = {
          type : ClientMessageType['connected'],
          senderId: user['uuid'],
          userName: user['name']
        }

        ws.send(JSON.stringify(_packet));
      })   
    }
}

export default WebSocketServerModel;


   
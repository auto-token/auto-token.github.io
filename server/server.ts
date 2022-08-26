import {WebSocketServer} from 'ws'
import Caver, { TransactionForRPC } from 'caver-js';
import { v4 as uuidv4 } from 'uuid';
import {Server} from 'http'
import {
  IUser,IRoom,IChat,IRooms, WebSocket_uuid, IPacket, ClientMessageType, ServerMessageType,CLIENT_PACKET_LAYER,SERVER_PACKET_LAYER
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
          name: '',
          connectedRooms: []
          
        }
        ws['_user'] = user;
        this.initClientEventHandlers(ws).message()


        
        const _packet: IPacket = {
          type : ClientMessageType['connected'],
          senderId: user['uuid'],

        }

        ws.send(JSON.stringify(_packet));
      })   
    }

  private initClientEventHandlers = (ws:WebSocket_uuid) => {
    return {
      message: () =>
      ws.on('message', async (data: any) => {

        // 이부분 확인해볼것,
        // const _data: CLIENT_PACKET_LAYER = data;
        switch(String(data)){
          case '명령어':
            this.sendMessage(ws);
            break;
          // case '명령어':
          //   this.sendMessage(ws);
          //   break;
          // case '명령어':
          //   this.sendMessage(ws);
          //   break;


          default:
            break;
        }
        // ws.send('okay')

      }),

      open: () =>
      ws.on('open', () => {
          console.log(`client open`);
      }),

      close: () =>
      ws.on('close', (code: number, reason: Buffer)=> {
        console.log(`disconnect client (${code}) ${reason.toString()}`)
      }),

      error: () => 
      ws.on ('error', (err:Error) => {
        console.log(`client error`)
      })

    }
  }

  private sendMessage = (ws:WebSocket_uuid) => {
    ws.send('okay')
  }
}

export default WebSocketServerModel;


   
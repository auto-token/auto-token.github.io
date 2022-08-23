import {WebSocketServer} from 'ws'
import Caver, { TransactionForRPC } from 'caver-js';
import { v4 as uuidv4 } from 'uuid';
import {Server} from 'http'


const cypressWSEN = 'wss://public-node-api.klaytnapi.com/v1/cypress/ws';
const baobabWSEN = 'wss://api.baobab.klaytn.net:8652';
const caver = new Caver(cypressWSEN)

class WebSocketServerModel {
  private readonly wss :WebSocketServer;
  // private readonly blockNumber : any;

    constructor(option: {server:Server}) {
      this.wss = new WebSocketServer({server: option.server});

      this.initServerEventHandler();
    }

    private initServerEventHandler =  () =>{
      this.wss.on('connection', async (ws:any) => {
        ws['_uuid'] = uuidv4();
        
        
        const _packet = {
          type: 'connected',
          data: ws._uuid,
        };

        ws.send(JSON.stringify(_packet));

        ws.on ("message", async(message: string) => {
          console.log(String(message))
          if(message == '블록넘버'){
            const blockNumber = await caver.rpc.klay.getBlockNumber()
            ws.send(JSON.stringify(caver.utils.hexToNumberString(blockNumber)))
          }
        });
      })
      
    }
}

export default WebSocketServerModel;